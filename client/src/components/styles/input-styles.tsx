import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {

    return (
        {
            inputField: {
                background: theme.palette.background.default,
            },

            form: {
                width: '100%',
                marginTop: theme.spacing(4),
            },

            errorMessage: {
                marginTop: 8
            },

            inputNotchedOutline: {
                borderColor: `${theme.palette.primary.main} !important`
            },

            inputNotchedOutlineError: {
                borderColor: `#CB0B0B !important`
            },

            inputFocusedLabel: {
                color: `${theme.palette.primary.main} !important`
            },
        })
});