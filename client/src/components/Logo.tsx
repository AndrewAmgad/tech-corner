import useMediaQuery from '@material-ui/core/useMediaQuery';
import logoLight from '../images/logo-light-blue.png';
import logoDark from '../images/logo-dark-blue.png';
import React from 'react'

/**
 * Returns the app logo depending on the current theme (dark or light);
 */

function Logo(props: any) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <img src={prefersDarkMode ? logoLight : logoDark} className={props.className} alt="App Logo" />
    );
};


export default Logo;