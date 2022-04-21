import React from "react";
import * as Realm from "realm-web";
import { useCollection } from "../useCollection";
import { dataSourceName } from "../../realm.json";
import {
  remove, add
} from "../../lib/utils";
import useApolloClient from '../useApolloClient';
import { useWatch } from '../useWatch';
import { useArticleAPI } from './useArticleAPI';
import { useCommentAPI } from '../comments/useCommentAPI';

export function useArticle (articleId) {
  const graphql = useApolloClient();
  const { fetchArticleDetailed, saveArticle, updateArticle, deleteArticle } = useArticleAPI();
  const { fetchComment } = useCommentAPI();
  const [article, setArticle] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchArticleDetailed(articleId).then(article => {
      setArticle(article);
      setLoading(false);
    });
  }, [articleId, graphql]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  const commentsCollection = useCollection({
    cluster: dataSourceName,
    db: "blog",
    collection: "Comment",
  });

  useWatch(
    commentsCollection,
    { "fullDocument.article": new Realm.BSON.ObjectId(articleId) },
    {
      onInsert: async (change) => {
        const comment = await fetchComment(change.fullDocument._id);
        setArticle((article) => {
          if (loading) return article;
          return { ...article, comments: add(article.comments, comment) };
        });
      },
      onDelete: (change) => {
        setArticle((article) => {
          if (loading) return article;
          return { ...article, comments: remove(article, change.documentKey._id) };
        });
      },
    }
  );

  // Use a MongoDB change stream to reactively update state when operations succeed
  const likesCollection = useCollection({
    cluster: dataSourceName,
    db: "blog",
    collection: "Like",
  });

  useWatch(
    likesCollection,
    { "fullDocument.article": new Realm.BSON.ObjectId(articleId) },
    {
      onInsert: async (change) => {
        setArticle((article) => {
          if (loading) return article;
          return { ...article, likes: add(article.likes, change.fullDocument) };
        });
      },
      onDelete: (change) => {
        setArticle((article) => {
          if (loading) return article;
          return { ...article, likes: remove(article, change.documentKey._id) };
        });
      },
    }
  );

  return {
    loading,
    article,
    fetchArticleDetailed,
    saveArticle,
    updateArticle,
    deleteArticle,
  };
}
