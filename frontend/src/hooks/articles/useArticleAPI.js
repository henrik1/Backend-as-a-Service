import React from "react";
import { gql } from "@apollo/client";
import useApolloClient from '../useApolloClient';
import { useRealmApp } from '../useRealmApp';
import * as Realm from 'realm-web';

export function useArticleAPI () {
  const realmApp = useRealmApp();
  const graphql = useApolloClient();

  const fetchAllArticles = async () => {
    const query = gql`
        query FetchAllArticles {
            articles {
                _id
                _partition
                title
                body
                likes {
                    _id
                }
                comments {
                    _id
                }
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;
    const { data: { articles } } = await graphql.query({ query });
    return articles;
  }

  const fetchArticleSlim = async (articleId) => {
    const query = gql`
        query FetchArticle($articleId: ObjectId!) {
            article(query: { _id: $articleId }) {
                _id
                _partition
                title
                body
                likes {
                    _id
                }
                comments {
                    _id
                }
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;
    const { data: { article } } = await graphql.query({ query, variables: { articleId }})
    return article;
  }

  const fetchArticleDetailed = async (articleId) => {
    const query = gql`
        query FetchArticle($articleId: ObjectId!) {
            article(query: { _id: $articleId }) {
                _id
                _partition
                title
                body
                likes {
                    _id
                }
                comments {
                    _id
                    comment
                    author {
                        name
                        email
                    }
                }
                author {
                    _id
                    name
                    email
                }
            }
        }
    `;
    const { data: { article } } = await graphql.query({ query, variables: { articleId }})
    return article;
  }

  const saveArticle = async (draft) => {
    if (draft.title && draft.body) {
      const authorId = new Realm.BSON.ObjectID(realmApp.currentUser.id);
      try {
        await graphql.mutate({
          mutation: gql`
              mutation SaveArticle($draft: ArticleInsertInput!) {
                  insertOneArticle(data: $draft) {
                      _id
                      _partition
                      title
                      body
                      author {
                          _id
                      }
                  }
              }
          `,
          variables: {
            draft: {
              ...draft,
              author: {
                link: authorId
              },
              _partition: realmApp.currentUser.id
            }
          },
        });
      } catch (err) {
        if (err.message.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that we tried to insert a draft multiple times (i.e. an existing draft has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  const updateArticle = async ({ title, body, _id }) => {
    const mutation = gql`
        mutation UpdateArticle($articleId: ObjectId!, $updates: ArticleUpdateInput!) {
            updateOneArticle(query: { _id: $articleId }, set: $updates) {
                _id
                _partition
                title
                body
            }
        }
    `;
    try {
      await graphql.mutate({
        mutation,
        variables: { articleId: _id, updates: { title, body }},
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticle = async (article) => {
    try {
      await graphql.mutate({
        mutation: gql`
            mutation DeleteArticle($articleId: ObjectId!) {
                deleteOneArticle(query: { _id: $articleId }) {
                    _id
                }
            }
        `,
        variables: { articleId: article._id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchAllArticles,
    fetchArticleDetailed,
    fetchArticleSlim,
    saveArticle,
    updateArticle,
    deleteArticle,
  };
}
