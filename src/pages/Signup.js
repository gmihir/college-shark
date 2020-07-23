import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Spinner } from 'react-bootstrap';
import { States } from '../components/State';

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
  }
}));

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const [usernameError, setUsernameError] = useState({ usernameError: false });
  const [nameError, setNameError] = useState({ nameError: false });
  const [stateError, setStateError] = useState({ stateError: false });
  const [name, setName] = useState({ name: '' });
  const [state, setState] = useState({ state: '' });
  const [username, setUsername] = useState({ username: '' });
  const [password, setPassword] = useState({ password: '' });
  const [cpassword, setcPassword] = useState({ cpassword: '' });
  const [spinner, setSpinner] = useState(
    {
      Spinner: false,
      Check: false
    });

  if (sessionStorage.getItem("userData")) {
    return (<Redirect to='/mycolleges' />)
  }

  const textDisplay = () => {
    if (spinner.Check) {
      return (
        <div>
          <CloseIcon />
          Sign up Failed
        </div>
      )
    } else if (spinner.Spinner) {
      return (
        <Spinner animation="border" variant="light" />
      )
    } else {
      return "Sign up";
    }
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
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={e => {
                setSpinner({ Spinner: false, Check: false });
                const newName = { name: e.target.value };
                setName(newName);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  setSpinner({ Spinner: true, Check: false });
                  if(state.state === ''){
                    setSpinner({ Spinner: false, Check: true });
                  } else if (name.name === ''){
                    setSpinner({ Spinner: false, Check: true });
                    setNameError(true);
                  }else if(cpassword.cpassword !== password.password) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (password.password.length < 6) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (username.username === ''){
                    setUsernameError(true);
                    setSpinner({ Spinner: false, Check: true });  
                  } else {
                    fetch("/signup", {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                      body: JSON.stringify({
                        Username: username.username,
                        Password: password.password,
                        Name: name.name,
                        State: state.state
                      })
                    }).then(response => {
                      return response.json();
                    }).then(data => {
                      setSpinner({ Spinner: false, Check: true });
                      console.log(data);
                      if (data["True"] === 1) {
                        setUsernameError(true);
                        setSpinner({ Spinner: false, Check: true });
                      } else {
                        sessionStorage.setItem("userData", username.username);
                        history.push("/mycolleges");
                      }
                    });
                  }
                }
              }
              }
              autoComplete="name"
              autoFocus
              error={nameError.usernameError}
              helperText={nameError.usernameError ? "Please Enter a Name!" : ' '}
            />
            <Select
            options={States}
            onChange={(e)=>{
              const newState = e.value;
              setState(newState);
            }}
            className="basic-multi-select"
            classNamePrefix="select"
            closeMenuOnSelect={true}
            defaultValue={{label: "State", value: 0}}
          />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e => {
                setSpinner({ Spinner: false, Check: false });
                const newUsername = { username: e.target.value };
                setUsername(newUsername);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  setSpinner({ Spinner: true, Check: false });
                  console.log(state.state);
                  if(state.state === ''){
                    setSpinner({ Spinner: false, Check: true });
                  } else if (name.name === ''){
                    setSpinner({ Spinner: false, Check: true });
                    setNameError(true);
                  }else if(cpassword.cpassword !== password.password) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (password.password.length < 6) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (username.username === ''){
                    setUsernameError(true);
                    setSpinner({ Spinner: false, Check: true });  
                  } else {
                    fetch("/signup", {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                      body: JSON.stringify({
                        Username: username.username,
                        Password: password.password,
                        Name: name.name,
                        State: state.state
                      })
                    }).then(response => {
                      return response.json();
                    }).then(data => {
                      setSpinner({ Spinner: false, Check: true });
                      if (data["True"] === 1) {
                        setUsernameError(true);
                        setSpinner({ Spinner: false, Check: true });
                      } else {
                        sessionStorage.setItem("userData", username.username);
                        history.push("/mycolleges");
                      }
                    });
                  }
                }
              }
              }
              autoComplete="email"
              autoFocus
              error={usernameError.usernameError}
              helperText={usernameError.usernameError ? "Email not valid!" : ' '}
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
              onChange={e => {
                const newPassword = { password: e.target.value };
                setPassword(newPassword);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  setSpinner({ Spinner: true, Check: false });
                  if(state.state === ''){
                    setSpinner({ Spinner: false, Check: true });
                  } else if (name.name === ''){
                    setSpinner({ Spinner: false, Check: true });
                    setNameError(true);
                  }else if(cpassword.cpassword !== password.password) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (password.password.length < 6) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (username.username === ''){
                    setUsernameError(true);
                    setSpinner({ Spinner: false, Check: true });  
                  } else {
                    fetch("/signup", {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      // body: JSON.stringify(["national_ranking", "+15", "national_ranking", "-30"])
                      body: JSON.stringify({
                        Username: username.username,
                        Password: password.password,
                        Name: name.name,
                        State: state.state
                      })
                    }).then(response => {
                      return response.json();
                    }).then(data => {
                      setSpinner({ Spinner: false, Check: true });
                      console.log(data);
                      if (data["True"] === 1) {
                        setUsernameError(true);
                        setSpinner({ Spinner: false, Check: true });
                      } else {
                        sessionStorage.setItem("userData", username.username);
                        history.push("/mycolleges");
                      }
                    });
                  }
                }
              }
              }
              error={(password.password.length < 6 && password.password.length > 0)}
              helperText={(password.password.length < 6 && password.password.length > 0) ? "Password not 6 characters!" : ' '}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                setSpinner({ Spinner: false, Check: false });
                const newPassword = { cpassword: e.target.value };
                setcPassword(newPassword);
                console.log(newPassword.cpassword);
              }}
              onKeyPress={e => {
                setSpinner({ Spinner: true, Check: false });
                if (e.key === 'Enter') {
                  if(state.state === ''){
                    setSpinner({ Spinner: false, Check: true });
                  } else if (name.name === ''){
                    setSpinner({ Spinner: false, Check: true });
                    setNameError(true);
                  }else if(cpassword.cpassword !== password.password) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (password.password.length < 6) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (username.username === ''){
                    setUsernameError(true);
                    setSpinner({ Spinner: false, Check: true });  
                  } else {
                    fetch("/signup", {
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
                      setSpinner({ Spinner: false, Check: true });
                      console.log(data);
                      if (data["True"] === 1) {
                        setUsernameError(true);
                        setSpinner({ Spinner: false, Check: true });
                      } else {
                        sessionStorage.setItem("userData", username.username);
                        history.push("/mycolleges");
                      }
                    });
                  }
                }
              }
              }
              error={password.password !== cpassword.cpassword}
              helperText={password.password !== cpassword.cpassword ? "Passwords don't match!" : ' '}
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
              size='large'
              onClick={e => {
                setSpinner({ Spinner: true, Check: false });
                //e.preventDefault();
                  if(state.state === ''){
                    setSpinner({ Spinner: false, Check: true });
                  } else if (name.name === ''){
                    setSpinner({ Spinner: false, Check: true });
                    setNameError(true);
                  }else if(cpassword.cpassword !== password.password) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (password.password.length < 6) {
                    setSpinner({ Spinner: false, Check: true });
                  } else if (username.username === ''){
                    setUsernameError(true);
                    setSpinner({ Spinner: false, Check: true });  
                  } else {
                  fetch("/signup", {
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
                    console.log(state.state);
                    setSpinner({ Spinner: false, Check: true });
                    if (data["True"] === 1) {
                      setUsernameError(true);
                      setSpinner({ Spinner: false, Check: true });
                    } else {
                      sessionStorage.setItem("userData", username.username);
                      history.push("/mycolleges");
                    }
                  });

                }
              }
              }
            >
              {textDisplay()}
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}