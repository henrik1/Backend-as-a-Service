import React from "react";
import { useCommentAPI } from './useCommentAPI';

export function useComment () {
  const { loading, saving, saveComment, deleteComment, fetchComment, updateComment } = useCommentAPI();

  return {
    loading,
    saving,
    saveComment,
    deleteComment,
    fetchComment,
    updateComment,
  };
}
