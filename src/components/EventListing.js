import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  },
  registered: {
    color: 'white',
    backgroundColor: 'green',
  },
}));

export const EventListing = props => {
  // eslint-disable-next-line
  const classes = useStyles();
  const eventRef = props.eventData;
  const eventName = eventRef.name;
  // eslint-disable-next-line
  const localStore = props.store;
  const [open, setOpen] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const isAdmin = localStore.isAdmin(localStore.currentUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    localStore.subscribeEvent(localStore.currentUser, eventRef);
    setUserRegistered(true);
    setOpen(false);
    console.dir(localStore.currentUser);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs>
          {userRegistered && !isAdmin && (
            <Link
              to={{
                pathname: '/event',
                state: { e: { eventName } },
              }}
              className={classes.link}
            >
              Attend Event
            </Link>
          )}
          {!userRegistered && !isAdmin && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Register
            </Button>
          )}
        </Grid>
        <Grid item xs>
          {isAdmin && (
            <Link
              to={{
                pathname: '/event',
                state: { e: { eventName } },
              }}
              className={classes.link}
            >
              Name: {eventRef.name}
            </Link>
          )}
          {!isAdmin && <div>Name: {eventRef.name}</div>}
        </Grid>
        <Grid item xs>
          Location: {eventRef.location}
        </Grid>
        {isAdmin && (
          <React.Fragment>
            <Grid item xs>
              Bar Area: {eventRef.barArea}
            </Grid>
            <Grid item xs>
              Table Count: {eventRef.tableCount}
            </Grid>
            <Grid item xs>
              Current Registered Users: {eventRef.currentRegisteredUsers}
            </Grid>
            <Grid item>Wait List: {eventRef.waitList}</Grid>
          </React.Fragment>
        )}
        <Grid item xs>
          Registration Deadline: {eventRef.registrationDeadline}
        </Grid>
        <Grid item xs>
          Ranking Preference Deadline: {eventRef.rankingPreferenceDeadline}
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will register {localStore.currentUser.firstName}{' '}
            {localStore.currentUser.lastName} for {eventRef.name}, or add you to
            the Wait List and send a notification to{' '}
            {localStore.currentUser.email} if a place becomes available.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
