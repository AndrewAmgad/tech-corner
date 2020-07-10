import { makeStyles } from '@material-ui/core/styles';

/**
 * Styling Elements for the Navigation Bar
 * Imported in navbar.js
 */

const navBarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

  },

  bar: {
    boxShadow: "0px 2px 2px -1px rgba(0,0,0,0.1), 0px 2px 5px 0px rgba(0,0,0,0.05), 0px 1px 5px 0px rgba(0,0,0,0.05)",

  },

  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  title: {
    flexGrow: 1,
    color: 'default'
  },

  logo: {
    height: 35,
    marginLeft: 0,
    marginTop: 5,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 46,
    },
  },

  menuItem: {
    paddingRight: window.innerWidth < 600 ? "6px" : "16px",
    paddingLeft: window.innerWidth < 600 ? "6px" : "16px",
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}));

/**
 * Styling Elements for the Navigation Drawer
 * Imported in drawer.js
 */

const drawerWidth = 240;

const drawerStyles = makeStyles(theme => ({
  title: {
    textAlign: "center",
    paddingBottom: 16
  },

  list: {
    width: 250,
    marginTop: 8
  },

  fullList: {
    width: 'auto',
  },

  divider: {
    marginBottom: 12
  },

  logo: {
    height: 35,
    marginLeft: 0,
    marginTop: 5
  },

  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },

  permanentDrawer: {
    marginTop: 64
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));

export { navBarStyles, drawerStyles }