import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import { Modal, Form } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.huffingtonpost.com/2016-02-03-1454538177-6729202-1156952a9865492c403b26f277_008_SMU_MainQuadAerial.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState({error: false});
  const [username, setUsername] = useState({ username: '' });
  const [password, setPassword] = useState({ password: '' });
  const [show, setShow] = useState({ Show: false});
  const [email, setEmail] = useState({ Email: ''});
  const [header, setHeader] = useState({ Header: 'Password Reset Request'});

  if (sessionStorage.getItem("userData")) {
    return (<Redirect to='/loginhome/dashboard' />)
  }

  function showModal(e) {
    e.preventDefault();
    setShow({ Show: true });
  }

  function resetSubmit() {
    fetch("/reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email.Email 
    })
    }).then(response => {
      return response.json();
    }).then(data => {
      const isSuccess = data["True"];
      if (isSuccess === 2) {
        setEmail({ Email: '' });
        setHeader({Header: 'Email Sent!'})
      } else {
        setHeader({Header: 'Email does not exist!'}) 
      }
    })
  }

  function handleDisplay() {
    return (
      <Modal show={show.Show} onHide={() => setShow({ Show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>{header.Header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will receive an email; follow the directions specified to reset your password.
          <br />
          <br />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                setEmail({Email: e.target.value});
                setHeader({Header: 'Password Reset Request'})
              }} value={email.Email}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={resetSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e => {
                const newError = {error: false};
                setError(newError);
                const newUsername = { username: e.target.value };
                setUsername(newUsername);
              }}
              onKeyPress={e => {
                setShow({ Show: false });
                if (e.key === 'Enter') {
                  fetch("/login", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                    body: JSON.stringify({
                      Username: username.username,
                      Password: password.password
                    })
                  }).then(response => {
                    return response.json();
                  }).then(data => {
                    console.log(data);
                    if (data["True"] === 1) {
                      const newError = {error: true};
                      setError(newError);
                    } else {
                      sessionStorage.setItem("userData", username.username);
<<<<<<< HEAD
                      window.location.href = "https://application-hub.herokuapp.com/loginhome/dashboard";
=======
                      history.push("/loginhome/dashboard");
>>>>>>> master
                    }
                  })
                }
              }}
              error={error.error}
              helperText={error.error ? "Log In Unsuccessful!" : ' '}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onKeyPress={e => {
                setShow({ Show: false });
                if (e.key === 'Enter') {
                  fetch("/login", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                    body: JSON.stringify({
                      Username: username.username,
                      Password: password.password
                    })
                  }).then(response => {
                    return response.json();
                  }).then(data => {
                    console.log(data);
                    if (data["True"] === 1) {
                      const newError = {error: true};
                      setError(newError);
                      console.log(show.Show);
                    } else {
                      sessionStorage.setItem("userData", username.username);
<<<<<<< HEAD
                      window.location.href = "https://application-hub.herokuapp.com/loginhome/dashboard";
=======
                      history.push("/loginhome/dashboard");
>>>>>>> master
                    }
                  })
                }
              }}
              onChange={e => {
                const newError = {error: false};
                setError(newError);
                const newPassword = { password: e.target.value };
                setPassword(newPassword);
              }}
              error={error.error}
              helperText={error.error ? "Log In Unsuccessful!" : ' '}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                setShow({ Show: false });
                fetch("/login", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                  body: JSON.stringify({
                    Username: username.username,
                    Password: password.password
                  })
                }).then(response => {
                  return response.json();
                }).then(data => {
                  if (data["True"] === 1) {
                    const newError = {error: true};
                    setError(newError);
                  } else {
                    sessionStorage.setItem("userData", username.username);
                    history.push("/loginhome/dashboard");
                  }
                })
              }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={showModal} component="button" type="button" variant="body2">
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/loginhome/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
      {show.Show ? handleDisplay() : null}
    </Grid>
  );
}