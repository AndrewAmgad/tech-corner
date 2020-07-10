import React, { useRef, SyntheticEvent } from 'react';
import {
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    LinearProgress,
    CircularProgress
} from '@material-ui/core';
import signInStyles from './styles/styles';
import { withRouter } from 'react-router';

import Logo from '../../components/Logo';
import Copyright from '../../setup/Copyright';

import Input from '../../components/InputComponent';

function SignIn(props: any) {
    const classes = signInStyles();

    // input references
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    /**
     * Send the email & password input values to the parent component
     */
    const onInputChange = () => {
        // Input value
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;

        // Add both input values to one object then send it to the parent using props
        var inputData = {
            email: email,
            password: password
        }

        props.sendDataToParent(inputData);
    };

    /**
     * Perform the onSubmit props function once the submit button is clicked
     */
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    };

    if(props.checkAuthLoading) {
        return (
            <LinearProgress />
        )
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />

            <div className={classes.paper}>
                <Logo className={classes.logo} />

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>

                    <Grid item xs={12}>
                        <Input name="Email" inputRef={emailInput} onChange={onInputChange} />
                    </Grid>

                    <br />

                    <Grid item xs={12}>
                        <Input name="Password" type='password' inputRef={passwordInput} onChange={onInputChange} />
                    </Grid>

                    {/* Remember me checkbox */}
                    <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />

                    {props.errorMessage &&
                        <Typography className={classes.errorMessage} color='error'>{props.errorMessage}</Typography>}

                    {/* Sign In button */}
                    <Button type="submit" fullWidth variant="contained" color="primary"
                        className={classes.submit} disabled={!props.button}>
                        {props.authLoading ? <CircularProgress size={26} /> : "Sign In"}
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>

                        <Grid item>

                            <Link onClick={() => props.history.push('/signup')} variant="body2" className={classes.link}>
                                Don't have an account? Sign Up
                            </Link>

                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(SignIn);