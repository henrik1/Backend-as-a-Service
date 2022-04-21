import React from "react";
import { gql } from "@apollo/client";
import useApolloClient from '../useApolloClient';
import { useRealmApp } from '../useRealmApp';

export function useCommentAPI () {
  const realmApp = useRealmApp();
  const graphql = useApolloClient();
  const [loading, setLoading] = React.useState(null);
  const [saving, setSaving] = React.useState(null);

  const fetchComment = async (commentId) => {
    setLoading(commentId);
    const query = gql`
        query FetchComment($commentId: ObjectId!) {
            comment(query: { _id: $commentId }) {
                _id
                _partition
                comment
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;
    const { data: { comment } } = await graphql.query({ query, variables: { commentId }});
    setLoading(null);
    return comment;
  }

  const saveComment = async (comment, articleId) => {
    setSaving(comment._id);
    const mutation = gql`
        mutation SaveComment($comment: CommentInsertInput!) {
            insertOneComment(data: $comment) {
                _id
                _partition
                comment
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;

    if (comment.comment && articleId) {
      try {
        const res = await graphql.mutate({
          mutation,
          variables: {
            comment: {
              ...comment,
              article: {
                link: articleId
              },
              author: {
                link: realmApp.currentUser.id
              },
              _partition: realmApp.currentUser.id
            }},
        });
        setSaving(null);
        return res;
      } catch (err) {
        if (err.message.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that we tried to insert a draft multiple times (i.e. an existing draft has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
    setSaving(null);
    return null;
  };

  const updateComment = async ({ comment, _id }) => {
    setSaving(_id);
    const mutation = gql`
        mutation UpdateArticle($commentId: ObjectId!, $updates: CommentUpdateInput!) {
            updateOneComment(query: { _id: $commentId }, set: $updates) {
                _id
                _partition
                comment
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;
    try {
      const res = await graphql.mutate({
        mutation,
        variables: { commentId: _id, updates: { comment }},
      });
      setSaving(null);
      return res;
    } catch (err) {
      console.error(err);
    }
    setSaving(null);
    return null;
  };

  const deleteComment = async (comment) => {
    setSaving(comment._id);
    try {
      const res = await graphql.mutate({
        mutation: gql`
            mutation DeleteComment($commentId: ObjectId!) {
                deleteOneComment(query: { _id: $commentId }) {
                    _id
                }
            }
        `,
        variables: { commentId: comment._id },
      });
      setSaving(null);
      return res;
    } catch (err) {
      console.error(err);
    }
    setSaving(null);
    return null;
  };

  return {
    loading,
    saving,
    deleteComment,
    updateComment,
    saveComment,
    fetchComment,
  };
}
