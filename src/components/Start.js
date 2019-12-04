import React, { useState } from 'react';
import useForm from 'react-hook-form';

import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Admin } from './Admin';
import { User } from './User';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  },
}));

let goAdmin = false;
let goUser = false;
let wait = true;

export const Start = props => {
  const localStore = props.store;
  // INIT STYLES
  const classes = useStyles();
  const [userId, setUserId] = useState('');

  // HANDLE LOGIN
  // eslint-disable-next-line
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = data => {
    // CHECK CREDENTIALS
    if (localStore.checkUserCredentials(data)) {
      localStore.currentUser = localStore.setCurrentUser(data);
      wait = false;
      // SHOW ADMIN VIEW TO ADMIN
      if (localStore.isAdmin(localStore.currentUser)) {
        goAdmin = true;
        goUser = false;
      } else {
        // SHOW USER VIEW IF NOT ADMIN
        setUserId(data.user_id);
        goUser = true;
        goAdmin = false;
      }
      // console.dir(localStore);
    } else {
      reset();
      alert('BAD USER ID OR PASSWORD');
    }
  };
  // eslint-disable-line no-unused-vars
  // console.log(errors);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center">
          {goAdmin && <Admin store={localStore} />}
          {goUser && <User store={localStore} userId={userId} />}
        </Grid>
        {wait && (
          <React.Fragment>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                input="true"
                name="user_id"
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="user_id"
                label="User ID"
                autoFocus
              />
              <TextField
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container alignItems="center" justify="center">
                <Grid item xs={8}>
                  <Link to="/registerUser" className={classes.link}>
                    Don't have an account? Register
                  </Link>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
};
