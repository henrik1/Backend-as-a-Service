import React from "react";
import * as Realm from "realm-web";

export function useDraftArticle() {
  const [draft, setDraft] = React.useState(null);

  const createDraftArticle = () => {
    const draftArticle = {
      _id: new Realm.BSON.ObjectID(),
      title: "",
      body: "",
    };
    setDraft(draftArticle);
  };

  const updateDraftArticle = (updates) => {
    setDraft(d => ({ ...d, ...updates }));
  };

  const deleteDraftArticle = () => {
    setDraft(null);
  };

  return {
    draftArticle: draft,
    createDraftArticle,
    updateDraftArticle,
    deleteDraftArticle,
  };
}
