const initialState = {
    favorites: {},
    response: null,
    loading: false,
    error: null
}

export default function favoritesReducer(state = initialState, action: any) {
    switch (action.type) {
        case "GET_FAVORITES_BEGIN":
            return {...state, loading: true, error: null}
        
        case "GET_FAVORITES_SUCCESS":
            return {...state, loading: false, response: action.payload.data}
        
        case "GET_FAVORITES_FAILURE":
            return {...state, loading: false, error: action.payload.error, response: {}}

        case "ADD_FAVORITE_SUCCESS":
            return {...state, error: null, response: action.payload.data}

        case "ADD_FAVORITE_FAILURE":
            return {...state, error: action.payload.error, response: null}

        case "CLEAR_FAVORITES":
            return {...state, error: null, response: null, favorites: null}

        default: return state;
        }
}