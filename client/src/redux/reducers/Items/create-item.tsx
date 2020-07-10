const initialState = {
    response: {},
    loadings: false,
    error: null
};

export default function createItemReducer(state = initialState, action: any) {
    switch (action.type) {
        case "CREATE_ITEM_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }

        case "CREATE_ITEM_SUCCESS":
            return {
                ...state,
                loading: false,
                error: null,
                response: action.payload.data
            }

        case "CREATE_ITEM_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                response: {}
            }

        default:
            return state;
    }
}

