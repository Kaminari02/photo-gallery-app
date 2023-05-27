import {Link} from 'react-router-dom';
import {makeStyles} from "@mui/styles";
import {Typography, Toolbar, AppBar, Grid, Button} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useAppSelector } from '@/hooks/reduxHooks';
import UserMenu from './Menus/UserMenu';
import AnonymousMenu from './Menus/AnonymousMenu';
import { useLogoutMutation } from '@/store/services/auth';

const useStyles = makeStyles<Theme>(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const AppToolbar = () => {
  const classes = useStyles();
  const { user } = useAppSelector(state => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async() => {
    await logout();
  }
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#4caf50' }}>
        <Toolbar>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant="h6">
              <Link to="/" className={classes.mainLink}>Spotify</Link>
            </Typography>
            {
              user ? (
                <Grid item>
                  <UserMenu logout={handleLogout} user={user} />
                </Grid>
              ) : (
                <Grid item>
                  <AnonymousMenu />
                </Grid>
              )
            }
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;