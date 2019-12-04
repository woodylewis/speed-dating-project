import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

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
}));

export const Nav = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color="primary">
            Speed-dating Project
          </Typography>
        </Grid>
        <Grid item xs={6} align="center">
          <Link to="/start" className={classes.link}>
            Home
          </Link>
        </Grid>
        <Grid item xs={6} align="center">
          <Link to="/admin" className={classes.link}>
            Admin
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
