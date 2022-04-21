import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import md5 from 'md5';

const ArticlePreview = function ({ article }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Typography variant="h2" color="text.primary" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1">
        {article.body.slice(0, 200)}...
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/${article._id}`}>
          [ Read more ]
        </Link>
        <Box sx={{ display: 'flex', marginLeft: '1rem' }}>
          <Avatar
            sx={{ width: 24, height: 24, marginRight: '0.5rem' }}
            alt={article.author.name[0]}
            src={`https://www.gravatar.com/avatar/${md5(article.author.email.toLowerCase())}`}
          />
          <Typography variant="subtitle2">
            {article.author.email}
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}

export default ArticlePreview;

