import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {

    return (
        {
            root: {
                paddingTop: 1,
            },

            inputField: {
                background: theme.palette.background.default
            },

            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },

            logo: {
                height: 60,
                marginBottom: 36
            },

            form: {
                width: '100%',
                marginTop: theme.spacing(4),
            },

            errorMessage: {
                marginTop: 8
            },
            
            link: {
                color: theme.palette.primary.main,
                cursor: "pointer"
            },
      
            submit: {
                margin: theme.spacing(3, 0, 2),
                
            },
        })
});