import React, { useState, useEffect } from 'react';
import SignInComponent from './SignInForm';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions/auth';
import { withRouter } from 'react-router';
import MetaTags from 'react-meta-tags';
import { displaySnackBar } from '../../redux/actions/notifications';

const PageMetaTags = () => (
    <MetaTags>
        <title>Tech Corner - Sign In</title>
        <meta name="description" content="Log into Tech Corner" />
        <meta property="og:title" content="Tech Corner - Sign In" />
    </MetaTags>
)

function SignIn(props: any) {
    const [inputs, setInputs] = useState<any>({});
    const [error, setError] = useState<string|null>(null);
    const [button, enableButton] = useState<boolean>(false)

    // Get input data and assign them to the component state
    const getInputData = (inputData: object) => {
        setInputs(inputData);
    };

    const onSubmit = () => {
        if (!inputs.email || !inputs.password) return setError("Email and password are required");
        props.signIn(inputs.email, inputs.password)
    }

    // Redirect to the home page if user is already authenticated
    useEffect(() => {
        if(props.checkAuthResponse) props.history.push('/')
    }, [props.checkAuthResponse])

    // Handle the response that gets returned from the server
    useEffect(() => {
        // Create an error message if one is found
        if (props.error) {
            if(typeof props.error.reason === "string") return setError(props.error.reason)
            else return setError("")
        };

        if(!props.authResponse) return;

        // Redirect to the home page if no error is found and sign in is successful
        if (props.authResponse.email) {
            setError(null);
            props.displaySnackBar(true, `Welcome back, ${props.authResponse.firstName}!`, 'success');
            props.history.push('/');
        }

    }, [props.authResponse, props.error]);

    // Disable button if no input is entered
    useEffect(() => {
        if(inputs.email && inputs.password) enableButton(true)
        else enableButton(false);
    }, [inputs]);

    return (
        <>
            <PageMetaTags />
            <SignInComponent
                sendDataToParent={getInputData}
                onSubmit={onSubmit}
                errorMessage={error}
                button={button}
                authLoading={props.authLoading}
                checkAuthLoading={props.checkAuthLoading}
            />
        </>
    )
}

// map the redux reducer's state to the component's props
const mapStateToProps = (state: any) => {
    const {authResponse, checkAuthResponse, checkAuthLoading, authLoading, authError} = state.authReducer
    return {
        authResponse: authResponse,
        checkAuthResponse: checkAuthResponse,
        checkAuthLoading: checkAuthLoading,
        authLoading: authLoading,
        error: authError
    };
};

// map the redux sign in action to the component's props
const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (email: string, password: string) => {
            dispatch(signIn(email, password));
        },

        displaySnackBar: (open: boolean, content: string, severity: string) => {
            dispatch(displaySnackBar(open, content, severity))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn))