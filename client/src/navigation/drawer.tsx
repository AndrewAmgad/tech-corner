import React from 'react';
import clsx from 'clsx';
import { withRouter, RouteComponentProps } from "react-router";
import { drawerStyles } from './styles';

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  Badge,
  Typography,
} from '@material-ui/core'

// List Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/HomeOutlined'
import ProductIcon from '@material-ui/icons/AllInboxOutlined';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import MessageIcon from '@material-ui/icons/MessageOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined'
import SigninIcon from '@material-ui/icons/MeetingRoomOutlined'
import AddIcon from '@material-ui/icons/Add'
import RegisterIcon from '@material-ui/icons/ExitToApp';
import { useTheme } from '@material-ui/core/styles';

// App Logo
import Logo from '../components/Logo';
import { CssBaseline, Hidden } from '@material-ui/core';

/**
 * Drawer List Item Component
 */

const DrawerItem = (props: any) => {
  const Icon = props.icon;

  const onItemClick = () => {
    if (props.onClick) props.onClick();
    return;
  }

  return (
    <ListItem button key={props.name} onClick={() => onItemClick()} selected={props.selected}>
      <ListItemIcon><Badge badgeContent={props.badgeCount} color="secondary"><Icon /></Badge></ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  )
};


/**
 * Side expandable navigation drawer
 */

interface NavDrawerProps extends RouteComponentProps{
  toggleDrawer: () => void,
  signOut: () => void,
  auth: boolean,
  open: boolean,
  loading: boolean,
  username: string,
  history: any
}

function NavDrawer(props: NavDrawerProps) {
  const classes = drawerStyles();
  const theme = useTheme();

  // Destructure props
  const { open, toggleDrawer, auth, username, signOut, history, loading } = props;

  // Items visible at the top of the drawer at all times
  const mainItems = [
    { name: "Home", icon: HomeIcon, onClick: () => history.push('/'), path: '/' },
    { name: "Products", icon: ProductIcon, path: '/products' },
    { name: "Sell an Item", icon: AddIcon, onClick: () => history.push('/sell'), path: '/sell' },
    { name: "Info", icon: InfoIcon, path: '/info' }
  ];

  // User related items, different items are rendered depending on the auth state
  const userItems = auth ? [
    { name: username, icon: AccountIcon, path: '' },
    { name: "Messages", icon: MessageIcon, badgeCount: 4, path: '' },
    { name: "Sign Out", icon: LogoutIcon, onClick: () => signOut(), path: '' },
  ] : !loading ? [
      { name: "Sign In", icon: SigninIcon, onClick: () => props.history.push('/signin'), path: '/signin' },
      { name: "Register", icon: RegisterIcon, onClick: () => props.history.push('/signup'), path: '/signup' }
    ] : [];

  // Drawer items list
  const list = (mobile: boolean) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={() => mobile && toggleDrawer()}
      onKeyDown={() => mobile && toggleDrawer()}>
      <List>

        {/* App Logo */}
        {mobile && (
        <Typography variant="h6" className={classes.title}>
          <Logo className={classes.logo} />
        </Typography>
        )}

        {/* Main Drawer Items */}
        {mainItems.map((item, index) => (
          <DrawerItem key={index} name={item.name} icon={item.icon} onClick={item.onClick} selected={props.location.pathname === item.path}  />
        ))}
      </List>

      <Divider className={classes.divider} />

      {/* Drawer Items that appear only when the user is authenticated */}
      {userItems.map((item, index) => (
        <DrawerItem key={index} name={item.name} icon={item.icon} badgeCount={item.badgeCount} onClick={item.onClick} selected={props.location.pathname === item.path}  />
      ))}
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {list(true)}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.permanentDrawer }}
            variant="permanent"
            open>
            {list(false)}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default withRouter(NavDrawer);
