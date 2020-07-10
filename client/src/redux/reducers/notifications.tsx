const initialState = {
    open: false,
    content: null,
    severity: null
};

export default function notificationReducer(state = initialState, action: any) {

    if(action.type === 'SNACK_BAR') {
        const { open, content, severity } = action;

        return {
            ...state,
            open: open,
            content: content,
            severity: severity
        };

    };

    return state;
}
