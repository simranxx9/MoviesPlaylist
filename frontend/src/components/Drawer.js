import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { GlobalContext } from '../contexts/GlobalContext.js';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import DialogLogout from './users/DialogLogout.js';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import KeyIcon from '@mui/icons-material/Key';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [dialog, setDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const { drawer, name, changeName, deleteName, loggedIn } = useContext(GlobalContext);
  const [items, setItems] = React.useState([
    {
      text: "Home",
      link: "/",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    },
    {
      text: "Update Profile",
      link: "/update-profile",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    },
    {
      text: "Create Playlist",
      link: "/create-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    },
    {
      text: "My Playlist",
      link: "/my-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    }
    ,{
      text: "All Playlist",
      link: "/all-playlist",
      _disabled: (localStorage.getItem("access_token") ? false : true)
    }
  ])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    //
    setDialog(true);
    console.log(dialog);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">
            {drawer}
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%"
            }}
          >

            {!loggedIn ? (
              <div>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<AddToHomeScreenIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => history.push('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<AddToPhotosIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => history.push('/register')}
                >
                  Register
                </Button>
              </div>
            ) :
              (
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<ExitToAppIcon />}
                  style={{
                    marginLeft: "10px"
                  }}
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              )
            }

          </div>

          <DialogLogout dialog={dialog} setDialog={setDialog} />


        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map(({ text, link, _disabled }, index) => (
            <ListItem button key={text}
              onClick={() => history.push(link)}
              disabled={_disabled == true}
            >
              <ListItemIcon>

                {index == 0 && <HomeIcon /> }
                {index == 1 && <SettingsIcon /> }
                {index == 2 && <PlaylistAddIcon /> }
                {index == 3 && <KeyIcon /> }
                {index == 4 && <PlaylistPlayIcon /> }
                
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {
          /*
              <Divider />
              <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                  </ListItem>
              ))}
              </List>
          */
        }
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
