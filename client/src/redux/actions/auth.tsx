import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
    httpRequest
} from '../helpers';
import { Dispatch } from 'react';



/**
 * POST /v1/users/signin
 * Purpsoe: Sign in a user using its email and password
 */
export function signIn(email: string, password: string) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('SIGN_IN'));
        httpRequest('POST', '/v1/users/signin', false, false, { email, password })
            .then((response) => {
                dispatch(fetchDataSuccess('SIGN_IN', response));
            })
            .catch(err => {
                dispatch(fetchDataFailure('SIGN_IN', err))
            })
    };
};


/**
 * POST /v1/users/register
 * Purpose: Create a new user and send all required input data to the API
 */
export function signUp(body: any) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('SIGN_UP'));
        httpRequest('POST', '/v1/users/register', false, false, body)
            .then((response) => {
                dispatch(fetchDataSuccess('SIGN_UP', response));
            })
            .catch(err => (dispatch(fetchDataFailure('SIGN_UP', err))));
    };
};

/**
 * POST /v1/users/signout
 * Purpose: Sign out the current user & clear existing auth cookies
 */
export function signOut(cb: Function) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('AUTH'));
        httpRequest('GET', '/v1/users/signout')
            .then(response => {
                sessionStorage.clear();
                dispatch(fetchDataSuccess('SIGN_OUT', response));

                // Action callback
                if(cb) cb();
            })
            .catch(err => {
                dispatch(fetchDataFailure('SIGN_OUT', err))

                // Action callback
                if(cb) cb();
            });
    }
}

/**
 * GET /v1/users/check-auth
 * Purpose: Checks if the current access token is valid 
 */

export function checkAuth() {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('CHECK_AUTH'));
        httpRequest('GET', '/v1/users/check-auth')
            .then((response) => {
                dispatch(fetchDataSuccess('CHECK_AUTH', response));
            })
            .catch(err => (dispatch(fetchDataFailure('CHECK_AUTH', err))))
    }
}


