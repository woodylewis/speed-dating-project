import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    minHeight: '100vh',
  },
  event: {
    border: '1px solid blue',
    margin: '2rem',
    textAlign: 'center',
  },
  eventHeader: {
    textAlign: 'center',
    margin: '2rem',
  },
  table: {
    border: '1px solid blue',
    borderRadius: '10px',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  bar: {
    border: '1px solid blue',
    borderRadius: '10px',
    padding: theme.spacing(1),
  },
  barStool: {
    marginBottom: theme.spacing(2),
  },
  male: {
    color: '#fff',
    backgroundColor: 'blue',
  },
  female: {
    color: '#fff',
    backgroundColor: 'pink',
  },
}));

export const Event = props => {
  const classes = useStyles();
  const localStore = props.store;
  const isAdmin = localStore.isAdmin(localStore.currentUser);
  const e = props.location.state.e;
  const eventName = e.eventName;
  const event = localStore.getEvent(eventName);
  let tables = event.tables;
  let bar = [];
  let barStool = {
    a: 'b',
  };

  for (let i = 0; i < 60; i++) {
    bar.push(barStool);
  }

  // console.dir(event);
  // console.dir(localStore.currentUser);

  const [maleSeat, setSeatStatus] = useState(false);
  // eslint-disable-next-line
  const maleTakeOrLeaveSeat = index => {
    setSeatStatus(!tables[index].male);
    tables[index].male = maleSeat;
    // tables[index].male = !tables[index].male;
    // setSeatStatus(tables[index]);
  };
  // eslint-disable-next-line
  const femaleTakeOrLeaveSeat = table => {
    table.female = !table.female;
    setSeatStatus(table.female);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={8} align="center">
            {isAdmin && <Link to="/admin">Home</Link>}
            {!isAdmin && <Link to="/user">Home</Link>}
          </Grid>
          <Grid item xs={12}>
            <div className={classes.eventHeader}>{event.name}</div>
            {/* EVENT */}
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="stretch"
            >
              {/* BAR */}
              <Grid item xs={2} className={classes.bar}>
                {bar.map(b => (
                  <AccountCircleIcon
                    color="secondary"
                    className={classes.barStool}
                  />
                ))}
              </Grid>
              {/* TABLES */}
              <Grid item xs={4}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  {tables.map((t, index) => (
                    <Grid item key={index} xs={5} className={classes.table}>
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                      >
                        <Grid item xs={2} align="center">
                          {index + 1}
                        </Grid>
                        <Grid item xs={5} align="center">
                          <Chip
                            // color={t.male ? 'secondary' : 'default'}
                            avatar={<Avatar>M</Avatar>}
                            // clickable
                            // onClick={() => maleTakeOrLeaveSeat(index)}
                          />
                          {/*
                          {t.male && 
                          <Chip
                            avatar={<Avatar className={classes.male}>M</Avatar>}
                            clickable
                            onClick={() => maleTakeOrLeaveSeat(index)}
                          />}
                          {!t.male && 
                          <Chip
                            avatar={<Avatar>M</Avatar>}
                            clickable
                            onClick={() => maleTakeOrLeaveSeat(index)}
                          />
                          }*/}
                        </Grid>
                        <Grid item xs={5} align="center">
                          <Chip
                            avatar={<Avatar>F</Avatar>}
                            // clickable
                            // onClick={() => femaleTakeOrLeaveSeat(t, index)}
                          />
                          {/*
                          {t.female && 
                          <Chip
                            avatar={<Avatar className={classes.female}>F</Avatar>}
                            clickable
                            onClick={() => femaleTakeOrLeaveSeat(t, index)}
                          />}
                          {!t.female && 
                          <Chip
                            avatar={<Avatar>F</Avatar>}
                            clickable
                            onClick={() => femaleTakeOrLeaveSeat(t, index)}
                          >
                          </Chip>
                          }
                        */}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* TABLES */}
            </Grid>
            {/* EVENT */}
          </Grid>
          {isAdmin && (
            <Grid item xs={8} className={classes.event}>
              WAIT LIST (ADMIN)
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
