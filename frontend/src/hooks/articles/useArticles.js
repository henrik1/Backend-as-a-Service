import React from "react";
import { useCollection } from "../useCollection";
import { dataSourceName } from "../../realm.json";
import {
  remove, add, update, replace,
} from "../../lib/utils";
import useApolloClient from '../useApolloClient';
import { useWatch } from '../useWatch';
import { useArticleAPI } from './useArticleAPI';

export function useArticles () {
  const graphql = useApolloClient();
  const { fetchAllArticles, fetchArticleSlim } = useArticleAPI();
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAllArticles().then(articles => {
      setArticles(articles);
      setLoading(false);
    });
  }, [graphql]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  const articleCollection = useCollection({
    cluster: dataSourceName,
    db: "blog",
    collection: "Article",
  });

  useWatch(articleCollection, {},{
    onInsert: async (change) => {
      const article = await fetchArticleSlim(change.documentKey._id);
      setArticles((arr) => {
        if (loading) {
          return arr;
        }
        return add(arr, article);
      });
    },
    onUpdate: async (change) => {
      const article = await fetchArticleSlim(change.documentKey._id);
      setArticles((arr) => {
        if (loading) {
          return arr;
        }
        return update(arr, article);
      });
    },
    onReplace: async (change) => {
      const article = await fetchArticleSlim(change.documentKey._id);
      setArticles((arr) => {
        if (loading) {
          return arr;
        }
        return replace(arr, article);
      });
    },
    onDelete: (change) => {
      setArticles((arr) => {
        if (loading) {
          return arr;
        }
        return remove(arr, change.documentKey._id)
      });
    },
  });

  return {
    loading,
    articles,
  };
}
