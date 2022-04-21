import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Author from '../../../components/Author';
import { Divider } from '@mui/material';

const Article = function ({ comment }) {
  return (
    <Box sx={{ minWidth: 275, paddingBottom: 2, paddingTop: 2 }}>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {comment.comment}
      </Typography>
      <Author author={comment.author} />
      <Divider sx={{ marginTop: 2 }}/>
    </Box>
  );
}

export default Article;

