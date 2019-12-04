import React, { useState } from 'react';
import { format, addMonths } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useForm from 'react-hook-form';
import Grid from '@material-ui/core/Grid';

import { Admin } from './Admin';

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

export const AddEvent = props => {
  // eslint-disable-next-line
  const localStore = props.store;
  // INIT STYLES
  const classes = useStyles();

  // eslint-disable-next-line
  const { register, handleSubmit, errors, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState(false);

  const onSubmit = data => {
    let tables = [];
    let t = {
      male: false,
      female: false,
    };
    for (let i = 0; i < 20; i++) {
      tables.push(t);
    }

    const anEvent = {
      name: data.event_name,
      location: data.event_location,
      tables: tables,
      barCount: 0,
      currentRegisteredUsers: 0,
      waitList: 0,
      registrationDeadline: format(addMonths(Date.now(), 1), 'MM/dd/yyyy'),
      rankingPreferenceDeadline: format(addMonths(Date.now(), 1), 'MM/dd/yyyy'),
    };
    localStore.addEvent(anEvent);
    setSubmitStatus(true);
  };

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {!submitStatus && (
          <React.Fragment>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} align="center">
                <Typography component="h1" variant="h5">
                  Add Event
                </Typography>
              </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                input="true"
                name="event_name"
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                id="event_name"
                label="Event Name"
                autoFocus
              />
              <TextField
                required
                inputRef={register}
                variant="outlined"
                margin="normal"
                fullWidth
                name="event_location"
                label="Event Location"
                id="event_location"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  type="datetime"
                  inputRef={register}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="event-registration-deadline"
                  label="Registration Deadline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="event-ranking-preference-deadline"
                  label="Ranking Preference Deadline"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Event
              </Button>
            </form>
            </Grid>
          </React.Fragment>
        )}
        {submitStatus && (
          <React.Fragment>
            <Admin store={localStore} />
          </React.Fragment>
        )}
      </div>
    </Container>
  );
};
