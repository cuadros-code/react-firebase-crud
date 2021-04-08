import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.primary
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Manage Products
          </Typography>
          {
            user
              ?
              <Button onClick={() => auth.signOut()} color="inherit">Log Out</Button>
              :
              <>
                <LinkNavBar to="/auth/login">
                  <Button color="inherit">Log in</Button>
                </LinkNavBar>
                <LinkNavBar to="/auth/register">
                  <Button color="inherit">Sign Up</Button>
                </LinkNavBar>
              </>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar

const LinkNavBar = styled(Link)`
text-decoration: none;
color: #fff;
`