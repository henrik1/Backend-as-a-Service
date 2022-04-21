import React from "react";
import { useLikeAPI } from './useLikeAPI';

export function useLike () {
  const { loading, saving, likeArticle } = useLikeAPI();

  return {
    loading,
    saving,
    likeArticle
  };
}
