import NavBar from './navbar';
import Drawer from './drawer';
import React, { useEffect, Dispatch } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth, signOut } from '../redux/actions/auth';
import {displaySnackBar} from '../redux/actions/notifications';

/**
 * Component responsible for controlling the navigation bar and drawer
 */
function Navigation({checkAuth, response, signOut, history, loading, displaySnackBar, signOutResponse}: any) {
    const [drawer, setDrawer] = React.useState(false);
    const [auth, setAuth] = React.useState(false);

    
    // Check user authentication once the component gets loaded 
    useEffect(() => {
        checkAuth();
    }, [history.location]);

    /**
     * Update the content of the navigation bar and drawer depending on authentication state
     */
    useEffect(() => {
        if(response) setAuth(true);
        else setAuth(false)
    }, [response, loading])

    const toggleDrawer = () => {
        if(drawer){
            setDrawer(false);
        } else {
            setDrawer(true);
        }
    };

    const onSignOut = () => {
        signOut(() => {
            displaySnackBar(true, 'Signed out successfully', 'success');
            history.push('/')
        });
        
    }

    const username = response ? `${response.firstName} ${response.lastName}` : "";

    return (
        <>
            <NavBar auth={auth} toggleDrawer={toggleDrawer} loading={loading} />
            <Drawer auth={auth} open={drawer} loading={loading} toggleDrawer={toggleDrawer} username={username} signOut={onSignOut} />
        </>
    )
};

const mapStateToProps = (state: any) => {
    const {checkAuthResponse, signOutResponse, checkAuthLoading, checkAuthError} = state.authReducer
    return {
        response: checkAuthResponse,
        signOutResponse: signOutResponse,
        loading: checkAuthLoading,
        error: checkAuthError
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        signOut: (cb: Function) => dispatch(signOut(cb)),

        checkAuth: () => dispatch(checkAuth()),

        displaySnackBar: (open: boolean, content: string, severity: string) => {
            dispatch(displaySnackBar(open, content, severity));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));