import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useArticleAPI } from '../../../hooks/articles/useArticleAPI';

export default function DraftArticle({ draftArticle, draftArticleActions }) {

  const { saveArticle } = useArticleAPI();

  const handleClose = async () => {
    await draftArticleActions.deleteDraftArticle();
  };

  const handleChange = (prop) => (e) => {
    draftArticleActions.updateDraftArticle({ [prop]: e.target.value })
  }

  const handleSave = async () => {
    await saveArticle(draftArticle);
    await draftArticleActions.deleteDraftArticle();
  }

  return (
    <Dialog open={!!draftArticle} onClose={handleClose}>
      <DialogTitle>Create article</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pick a meaningful title and write your article below.
        </DialogContentText>
        <br />
        <br />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="filled"
          onChange={handleChange('title')}
        />
        <br />
        <br />
        <TextField
          autoFocus
          margin="dense"
          id="body"
          label="Body"
          type="text"
          multiline
          rows={8}
          fullWidth
          variant="filled"
          onChange={handleChange('body')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

