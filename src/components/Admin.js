import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { EventListing } from './EventListing';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
  spacer: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export const Admin = props => {
  const localStore = props.store;
  // INIT STYLES
  const classes = useStyles();

  let adminDisplayedEvents = [];
  props.store.events.forEach(e => {
    adminDisplayedEvents.push(e);
  });
  // eslint-disable-next-line
  const [theEvents, setEvents] = useState(adminDisplayedEvents);

  return (
    <Container maxWidth="md">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography variant="h6" align="center" color="primary">
            Administrator
          </Typography>
        </Grid>
        <Grid item xs={12} align="center" className={classes.link}>
          <Link to="/addEvent">Add Event</Link>
        </Grid>
        {theEvents.map((e, index) => (
          <Grid item key={index} xs={6} className={classes.spacer}>
            <EventListing eventData={e} store={localStore} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
