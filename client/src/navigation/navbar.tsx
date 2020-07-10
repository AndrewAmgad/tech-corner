import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/MessageOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import logoLight from '../images/logo-light-blue.png';
import logoDark from '../images/logo-dark-blue.png';

import { Link } from 'react-router-dom'
import { navBarStyles } from './styles';

/**
 * Top Navigation Bar
 */

export default function NavBar({ toggleDrawer, auth, loading }: any) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const classes = navBarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const profileMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} color='default' position="fixed">
                <Toolbar>
                    {/* Drawer Button */}
                    <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/"><img src={prefersDarkMode ? logoLight : logoDark} className={classes.logo} alt='app-log' /></Link>
                    </Typography>
                    {/* Render only if not authentiacted */}
                    {!auth && !loading ? (<Link to="/signin" className={classes.link}><Button color="inherit">Sign In</Button></Link>) : ""}

                    {/* Render only if authenticated */}
                    {auth && !loading ? (
                        <>
                            {/* Messages Icon */}
                            <MenuItem className={classes.menuItem}>
                                <IconButton aria-label="show 4 new mails">
                                    <Badge badgeContent={4} color="secondary">
                                        <MessageIcon />
                                    </Badge>
                                </IconButton>
                            </MenuItem>

                            {/* Notifications Icon */}
                            <MenuItem className={classes.menuItem}>
                                <IconButton aria-label="show 11 new notifications" color="inherit">
                                    <Badge badgeContent={11} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </MenuItem>

                            {/* Profile Icon */}
                            <div>
                                {window.innerWidth > 500 && (
                                    <>
                                        <MenuItem className={classes.menuItem}>
                                            <IconButton
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={profileMenu}
                                                color="inherit"
                                            >
                                                <AccountCircle />
                                            </IconButton>
                                        </MenuItem>

                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                        </Menu>
                                    </>

                                )}
                            </div>
                        </>
                    ) : ""}
                </Toolbar>
            </AppBar>
        </div>
    );
}
