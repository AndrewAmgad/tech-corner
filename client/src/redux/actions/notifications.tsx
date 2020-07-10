import { Dispatch } from "react";

/**
 * Display a notification snackbar at the top right corner
 * Snackbar Component is placed in the root app file.
 */
export const displaySnackBar = (open: boolean, content: string, severity: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            type: 'SNACK_BAR',
            open: open,
            content: content,
            severity: severity
        });
    };
};