import React from "react";
import * as Realm from "realm-web";
import { gql } from "@apollo/client";
import useApolloClient from '../useApolloClient';
import { useRealmApp } from '../useRealmApp';

export function useLikeAPI () {
  const realmApp = useRealmApp();
  const graphql = useApolloClient();
  const [saving, setSaving] = React.useState(false);

  const likeArticle = async (articleId) => {
    setSaving(articleId);
    const mutation = gql`
        mutation SaveLike($like: LikeInsertInput!) {
            insertOneLike(data: $like) {
                _id
            }
        }
    `;

    try {
      const res = await graphql.mutate({
        mutation,
        variables: {
          like: {
            _partition: realmApp.currentUser.id,
            _id: new Realm.BSON.ObjectID(),
            article: {
              link: articleId
            },
            author: {
              link: realmApp.currentUser.id
            },
          }},
      });
      setSaving(false);
      return res;
    } catch (err) {
      if (err.message.match(/^Duplicate key error/)) {
        console.warn(
          `The following error means that we tried to insert a draft multiple times (i.e. an existing draft has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
        );
      }
      console.error(err);
    }
    setSaving(null);
    return null;
  };


  return {
    saving,
    likeArticle,
  };
}
