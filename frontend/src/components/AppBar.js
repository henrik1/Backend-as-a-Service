import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { AppName } from './AppName';
import { useRealmApp } from '../hooks/useRealmApp';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useRealmApp();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <AppName />
        {currentUser ? (
          <Button
            color="inherit"
            onClick={async () => {
              await logOut();
            }}
          >
            <Typography variant="button">Sign Out</Typography>
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={() => {
              navigate('/signin');
            }}
          >
            <Typography variant="button">Sign In</Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
