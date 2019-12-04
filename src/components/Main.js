import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LocalBarIcon from '@material-ui/icons/LocalBar';

import { makeStyles } from '@material-ui/core/styles';

import Store from './Store';
import mockEvents from '../mocks/mockEvents';

import { Start } from './Start';
import { Admin } from './Admin';
import { User } from './User';
import { RegisterUser } from './RegisterUser';
import { Event } from './Event';
import { AddEvent } from './AddEvent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  header: {
    margin: theme.spacing(1, 0, 2, 0),
    textAlign: 'center',
  },
  barIcon: {
    height: '4rem',
    width: '4rem',
    textAlign: 'center',
  },
}));

const numberOfMockUsers = 100;

export const Main = () => {
  // INIT STORE
  const store = Store();
  // LOAD ADMIN USER
  store.setAdminUser();
  // LOAD MOCK USERS
  store.setMockUsers(numberOfMockUsers);
  // console.dir(store.users);
  // LOAD MOCK EVENTS
  mockEvents.forEach(e => {
    store.addEvent(e);
  });
  // INIT STYLES
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} className={classes.header}>
                <LocalBarIcon color="primary" className={classes.barIcon}/>
            </Grid>

            <Grid item xs={6} className={classes.header}>
              <Paper>
              <Typography variant="h5" align="center" color="primary">
                Speed Dating Project
              </Typography>
              </Paper>

            </Grid>
          </Grid>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Start {...props} store={store} />}
            />
            <Route
              path="/start"
              render={props => <Start {...props} store={store} />}
            />
            <Route
              path="/admin"
              render={props => <Admin {...props} store={store} />}
            />
            <Route
              path="/user"
              render={props => <User {...props} store={store} />}
            />
            <Route
              path="/registerUser"
              render={props => <RegisterUser {...props} store={store} />}
            />
            <Route
              path="/event"
              render={props => <Event {...props} store={store} />}
            />
            <Route
              path="/addEvent"
              render={props => <AddEvent {...props} store={store} />}
            />
          </Switch>
        </div>
      </BrowserRouter></Container>
  );
};
