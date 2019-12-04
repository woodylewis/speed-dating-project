import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useForm from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { User } from './User';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
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

let needToRegister = true;

export const RegisterUser = props => {
  const localStore = props.store;
  // INIT STYLES
  const classes = useStyles();

  const { register, handleSubmit, errors, reset } = useForm();

  const [userId, setUserId] = useState('');

  const [value, setValue] = useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const onSubmit = data => {
    if (localStore.checkAddUser(data)) {
      needToRegister = false;
      localStore.currentUser = localStore.setCurrentUser(data);
      setUserId(data.user_id);
    } else {
      reset();
      alert('USER EXISTS');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {needToRegister && (
          <React.Fragment>
            <Typography component="h1" variant="h5">
              Register User
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
              <TextField
                input="true"
                name="first_name"
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="first_name"
                label="First Name"
              />
              <TextField
                input="true"
                name="last_name"
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="last_name"
                label="Last Name"
              />
              <TextField
                input="true"
                name="email"
                required
                inputRef={register({
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
              />
              {errors.email && errors.email.message}
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </React.Fragment>
        )}

        {!needToRegister && <React.Fragment>
          <User store={localStore} userId={userId} />
          </React.Fragment>}
      </div>
    </Container>
  );
};
