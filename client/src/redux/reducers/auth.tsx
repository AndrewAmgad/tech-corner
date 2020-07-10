const initialState = {
    authResponse: null,
    signOutResponse: null,
    checkAuthResponse: null,

    authError: null,
    checkAuthError: null,

    authLoading: false,
    checkAuthLoading: false 
}

export default function authReducer(state = initialState, action: any) {
    switch (action.type) {

        /**
         * Actions for the sign in, sign up and check auth functions
         */

        case "SIGN_IN_BEGIN":
        case "SIGN_UP_BEGIN":
            return { ...state, authLoading: true, authError: null }

        case "CHECK_AUTH_BEGIN":
            return{ ...state, checkAuthLoading: true, checkAuthError: null}

        case "SIGN_IN_SUCCESS":
        case "SIGN_UP_SUCCESS":
            return { ...state, authLoading: false, authResponse: action.payload.data, authError: null}

        case "CHECK_AUTH_SUCCESS":
            return { ...state, checkAuthLoading: false, checkAuthResponse: action.payload.data, checkAuthError: null, authError: null }

        case "SIGN_OUT_SUCCESS":
            return { ...state, authLoading: false, authResponse: null, signOutResponse: action.payload.data, authError: null }

        case "SIGN_IN_FAILURE":
        case "SIGN_UP_FAILURE":
            return { ...state, authLoading: false, authResponse: null, authError: action.payload.error }

        case "CHECK_AUTH_FAILURE":
            return { ...state, checkAuthLoading: false, checkAuthResponse: null, checkAuthError: action.payload.error }

        case "SIGN_OUT_FAILURE":
            return {...state, authLoading: false, signOutError: action.payload.data, authError: null}

        default:
            return state;
    }
}