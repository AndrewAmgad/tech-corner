import React, { useEffect } from 'react';
import Navigation from '../navigation/nav-controller';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Router from './router';
import SnackBar from '../components/SnackBar';
import Styles from './styles';

function App() {
  const classes = Styles()

  // dark mode boolean
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Set the default theme options (colors, backgorunds and font styling)
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {main: prefersDarkMode ? '#BEC9E7' : '#264AA5'},
          background: {
            paper: prefersDarkMode ? "#303030" : "#EBEBEF ",
            default: prefersDarkMode ?"#383838" : "#fff", 
          }
        },
        typography: {
          fontFamily: "\"Montserrat\", sans-serif",
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500
        },

      }),
    [prefersDarkMode],
  );

  // Set the body's background color depending on the current theme (dark or light)
  useEffect(() => {
    if(prefersDarkMode) document.body.style.backgroundColor = '#303030'
    else document.body.style.backgroundColor = '#EBEBEF'
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SnackBar />
        <Navigation />
        <div className={classes.router}>
          <Router />
        </div>
      </div>
    </ThemeProvider>


  );
}

export default App;
