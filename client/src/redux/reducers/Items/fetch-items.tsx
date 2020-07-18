const initialState = {
    response: {},
    loadings: false,
    error: null
};

export default function fetchItemsReducer(state = initialState, action: any) {
    switch (action.type) {
        case "GET_ITEMS_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }

        case "GET_ITEMS_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                response: action.payload.data
            }

        case "GET_ITEMS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                response: {}
            }

        case "CLEAR_ITEMS":
            return {
                ...state,
                loading: false,
                response: {}
            }

        default:
            return state;
    }
}

