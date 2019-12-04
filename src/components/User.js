import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';

import { EventListing } from './EventListing';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    marginBottom: theme.spacing(2),
  },
}));

export const User = props => {
  const localStore = props.store;
  // INIT STYLES
  // eslint-disable-next-line
  const classes = useStyles();
  //console.dir(localStore);

  let userDisplayedEvents = [];
  localStore.events.forEach(e => {
    userDisplayedEvents.push(e);
  });
  // eslint-disable-next-line
  const [theEvents, setEvents] = useState(userDisplayedEvents);

  return (
      <Container maxWidth="md">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} align="center">
            <Typography variant="h5" align="center" color="primary">
              Event Schedule
            </Typography>
          </Grid>
          <Grid item xs={12} align="center" className={classes.link}>
            &nbsp;
          </Grid>
          {theEvents.map((e, index) => (
            <Grid item key={index} xs={6}>
              <EventListing
                eventData={e}
                eventIndex={index}
                store={localStore}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
  );
};
