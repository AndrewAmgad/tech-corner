const initialState = {
    response: null,
    loading: false,
    error: null
};

export default function locationReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'GET_CITIES_BEGIN':
            return { ...state, loading: true, response: null, error: null }

        case 'GET_CITIES_SUCCESS':
            return { ...state, loading: false, response: action.payload.data, error: null }

        case 'GET_CITIES_FAILURE':
            return { ...state, loading: false, response: null, error: action.payload.error }

        default:
            return state;
    }
}