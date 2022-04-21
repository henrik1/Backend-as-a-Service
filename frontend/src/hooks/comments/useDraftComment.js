import React from "react";
import * as Realm from "realm-web";

export function useDraftComment(articleId) {
  const [draft, setDraft] = React.useState(null);

  const createDraftComment = () => {
    const draftComment = {
      _id: new Realm.BSON.ObjectID(),
      comment: "",
    };
    setDraft(draftComment);
  };

  const updateDraftComment = (updates) => {
    setDraft(d => ({ ...d, ...updates }));
  };

  const deleteDraftComment = () => {
    setDraft(null);
  };

  return {
    draftComment: draft,
    createDraftComment,
    updateDraftComment,
    deleteDraftComment,
  };
}
