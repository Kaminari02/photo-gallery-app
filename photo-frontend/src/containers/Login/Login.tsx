import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import { Theme } from '@mui/material/styles';
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
  Link,
  Box,
  Snackbar,
} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { LockOpen } from '@mui/icons-material';
import {UserForm} from '@/interfaces/UserForm';
import {useSignInMutation} from '@/store/services/auth';
import FormElement from '@/components/UI/Form/FormElement';
import {CustomError} from '@/interfaces/errors/CustomError';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  }
}));

const Login = () => {
  const classes = useStyles();

  const [form, setForm] = useState<UserForm>({
    username: '',
    password: ''
  })

  const [signIn, { isError, error }] = useSignInMutation();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(isError);
  }, [isError]);

  const handleClose = () => {
    setOpen(false);
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState =>  ({
      ...prevState,
      [name]: value
    }));
  }

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signIn(form);
    if(!(data as {error: object}).error) {
      setForm({
        username: '',
        password: ''
      })
      navigate('/');
    }
  }
  return (
    <Container component='section' maxWidth='xs'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {(error as CustomError)?.data?.error}
        </Alert>
      </Snackbar>
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpen/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box className={classes.form}>
          <form onSubmit={submitFormHandler}>
            <Grid container spacing={2}>
              <FormElement
                required
                value={form.username}
                onChange={inputChangeHandler}
                name='username'
                label='Username'
              />
              <FormElement
                required
                value={form.password}
                onChange={inputChangeHandler}
                type='password'
                name='password'
                label='Password'
              />
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{marginTop: 3, marginBottom: 2, bgcolor: '#4caf50', color: '#fff', "&:hover": { bgcolor: '#81c784' }}}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to='/register'>
                  Don't have an account? Sign up.
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;