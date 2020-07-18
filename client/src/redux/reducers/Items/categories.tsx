const initialState = {
    response: {},
    loading: false,
    error: null
}

export default function categoriesReducer(state = initialState, action: any) {
    switch (action.type) {
        case "GET_CATEGORIES_BEGIN":
            return {...state, loading: true, error: null}
        
        case "GET_CATEGORIES_SUCCESS":
            return {...state, loading: false, response: action.payload.data}
        
        case "GET_CATEGORIES_FAILURE":
            return {...state, loading: false, error: action.payload.error, response: {}}

        default: return state;
        }
}