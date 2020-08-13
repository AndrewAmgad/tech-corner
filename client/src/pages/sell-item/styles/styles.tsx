import { makeStyles } from '@material-ui/core/styles';

// Styles for the home page
const useStyles = makeStyles(theme => {

    return (
        {
            title: {
                color: theme.palette.primary.main,
                marginTop: 32,
                marginBottom: 32,

                [theme.breakpoints.down('sm')]: {
                    fontSize: 27,
                    marginTop: 26,
                    marginBottom: 26
                },

                [theme.breakpoints.up('sm')]: {
                    textAlign: 'left',
                }
            },

            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: 16
            },

            inputField: {
                background: theme.palette.background.default
            },

            form: {
                width: '100%',
                marginTop: theme.spacing(4),
            },

            errorMessage: {
                marginTop: 8
            },


            submit: {
                margin: theme.spacing(3, 0, 2),
                height: 52,
                fontSize: 16
            },

        }
    )
})

export default useStyles;