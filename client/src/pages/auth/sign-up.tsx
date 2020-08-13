import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MetaTags from 'react-meta-tags';
import { displaySnackBar } from '../../redux/actions/notifications';

// Sign Up Redux Action
import { signUp } from '../../redux/actions/auth';

// Sign Up component
import SignUpComponent from './SignUpForm';
import { fetchCities } from '../../redux/actions/location';
import { LinearProgress } from '@material-ui/core';

const PageMetaTags = () => (
    <MetaTags>
        <title>Tech Corner - Sign Up</title>
        <meta name="description" content="Create a new Tech Corner account" />
        <meta property="og:title" content="Tech Corner - Sign Up" />
    </MetaTags>
);

/**
 * Check if the provided input matches a proper email format
 * Returns a boolean
 */
const validateEmail = (email: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/**
 * Ensure that the password includes at least a single character and a digit
 * Returns a boolean
 */
const validatePassword = (password: string) => {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!re.test(password)) return false
    else if (password.length < 8) return false
    else return true
}

function SignUp(props: any) {
    const [inputs, setInputs] = useState<any>();
    const [errors, setErrors] = useState<any>({});
    const [submitButton, enableSubmitButton] = useState<boolean>(false);

    const getInputData = (inputData: any) => {
        console.log(inputData)
        if (!inputData) return;
        setInputs(inputData);
        let inputErrors = {}

        // Input Validation

        const { firstName, lastName, email, password, city, phone } = inputData;

        if (firstName && firstName.length < 4) inputErrors = ({ ...inputErrors, firstName: "First name must contain at least 4 characters" })
        else inputErrors = ({ ...inputErrors, firstName: null });

        if (lastName && lastName.length < 4) inputErrors = ({ ...inputErrors, lastName: "Last name must contain at least 4 characters" })
        else inputErrors = ({ ...inputErrors, lastName: null });

        // // // COUNTRY WILL BE EDITED ONCE A DROP DOWN LIST IS ADDED
        if (city && city === "none" || city && city.length < 3) inputErrors = ({ ...inputErrors, city: "Please select a city" })
        else inputErrors = ({ ...inputErrors, city: null })

        if (password && !validatePassword(password)) inputErrors = ({ ...inputErrors, password: "Password must be a mixture of characters & numbers and contain minimum 8 characters" })
        else inputErrors = ({ ...inputErrors, password: null });

        if (email && !validateEmail(email)) inputErrors = ({ ...inputErrors, email: "Invalid email format" })
        else inputErrors = ({ ...inputErrors, email: null })

        if (phone && (phone.length > 15 || phone.length < 8)) inputErrors = ({ ...inputErrors, phone: "Phone number is too short or too long" })
        else inputErrors = ({ ...inputErrors, phone: null });

        setErrors(inputErrors)
    };

    // Fetch all cities from the API once the component mounts
    useEffect(() => {
        props.fetchCities()
    }, [])

    // Redirect to the home page if the user is already authenticated
    useEffect(() => {
        if (props.checkAuthResponse) props.history.push('/');
    }, [props.checkAuthResponse]);

    // Disable the Submit button if any of the inputs are empty or if there's an error
    useEffect(() => {
        // if (!inputs) return;
        // const { firstName, lastName, email, password, city, phone } = inputs;

        // let error = false;

        // // Check each property of the errors object for errors
        // for (let key in errors) {
        //     if (errors.hasOwnProperty(key)) {
        //         if (errors[key]) error = true
        //     }
        // }

        // // Check if all inputs are filled before enabling the button
        // if (firstName && lastName && email && password && city !== 'none' && phone && !error) return enableSubmitButton(true);
        // else return enableSubmitButton(false);

        enableSubmitButton(true);

    }, [errors, inputs])

    // Handle API resposne and errors
    useEffect(() => {
        if (!props.responseError && !props.authResponse) return;
        if (props.responseError) setErrors(props.responseError.reason);
        else {
            setErrors(null);
            props.displaySnackBar(true, `Welcome, ${props.authResponse.firstName}!`, 'success');
            props.history.push('/')
        }

    }, [props.authResponse, props.responseError]);

    const onSubmit = () => {
        if(!inputs) return;
        console.log(inputs)
        const { firstName, lastName, email, password, city, phone } = inputs;
        props.signUp({ firstName, lastName, email, password, city, phone });
    };

    if(props.citiesLoading) return <LinearProgress />

    return (
        <>
            <PageMetaTags />
            <SignUpComponent sendDataToParent={getInputData}
                errors={errors}
                onSubmit={onSubmit}
                submitButton={submitButton}
                authResponse={props.authResponse}
                authLoading={props.authLoading}
                citiesLoading={props.citiesLoading}
                checkAuthLoading={props.checkAuthLoading}
                cities={props.citiesResponse}
            />
        </>
    )
}

// Map the redux reducer's state to the component's props
const mapStateToProps = (state: any) => {
    const { authResponse, checkAuthResponse, authLoading, checkAuthLoading, authError } = state.authReducer;
    const {response: citiesResponse, loading: citiesLoading} = state.locationReducer;


    return {
        authResponse: authResponse,
        checkAuthResponse: checkAuthResponse,
        citiesResponse: citiesResponse,
        checkAuthLoading: checkAuthLoading,
        citiesLoading: citiesLoading,
        authLoading: authLoading,
        responseError: authError,

    };
};

// Map the redux sign in action to the component's props
const mapDispatchToProps = (dispatch: any) => {
    return {
        signUp: (body: any) => {
            dispatch(signUp(body));
        },
        displaySnackBar: (open: boolean, content: string, severity: string) => {
            dispatch(displaySnackBar(open, content, severity))
        },
        fetchCities: () => {
            dispatch(fetchCities())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));