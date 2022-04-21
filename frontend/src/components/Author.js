import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import md5 from 'md5';
import Typography from '@mui/material/Typography';
import React from 'react';

export default ({ author, ...rest }) => {

  if (!author || !author.name || !author.email) return null;

  return (
    <Box sx={{ display: 'flex' }} {...rest}>
      <Avatar
        sx={{ width: 24, height: 24, marginRight: '0.5rem' }}
        alt={author?.name && author.name[0]}
        src={`https://www.gravatar.com/avatar/${md5(author?.email?.toLowerCase())}`}
      />
      <Typography variant="subtitle2">
        {author?.email}
      </Typography>
    </Box>
  )
}
