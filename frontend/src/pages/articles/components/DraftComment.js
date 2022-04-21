import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {Dialog, DialogContent} from '@mui/material';

export default function DraftComment({ draftComment, draftCommentActions, commentActions, articleId }) {

  const handleClose = async () => {
    await draftCommentActions.deleteDraftComment();
  };

  const handleChange = (prop) => (e) => {
    draftCommentActions.updateDraftComment({ [prop]: e.target.value })
  }

  const handleSave = async () => {
    await commentActions.saveComment(draftComment, articleId);
    await draftCommentActions.deleteDraftComment();
  }

  return (
    <Dialog open={!!draftComment} onClose={handleClose}>
      <DialogTitle>Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Share your thoughts on the subject, but be polite and show respect.
        </DialogContentText>
        <br />
        <TextField
          autoFocus
          id="comment"
          label="Share your thoughts"
          type="text"
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          onChange={handleChange('comment')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

