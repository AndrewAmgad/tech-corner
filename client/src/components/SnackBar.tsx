import React, { Dispatch } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { displaySnackBar } from '../redux/actions/notifications'
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackBar({ open, content, severity, displaySnackBar }: any) {

    const handleClose = () => {
        displaySnackBar(false, null);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert
                    severity={severity}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }>
                    {content}
                </Alert>

            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    const { open, content, severity } = state.notificationReducer;
    return {
        open,
        content,
        severity
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        displaySnackBar: (open: boolean, content: string, severity: string) => {
            dispatch(displaySnackBar(open, content, severity));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);