import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return (
        {
            root: {
                maxWidth: 500,
                maxHeight: window.screen.height - 100,
                overflowY: 'scroll',
                overflowX: 'hidden',
                display: 'block',
                marginTop: -15,

                [theme.breakpoints.down('xs')]: {
                    maxHeight: window.screen.height - 200,
                }
            },

            closeButton: {
                background: theme.palette.background.paper,
                zIndex: 999,
                borderRadius: '0px 0px 0px 0px',
                width: '30px !important',
                visibility: 'hidden',
                top: -5,

                [theme.breakpoints.down('xs')]: {
                    visibility: 'visible'
                }
            },

            body: {
            
                marginBottom: 32
            },

            image: {
                width: '100%',
                maxHeight: 322,
                marginTop: -42,
                borderRadius: '5px 5px 0px 0px',
                marginRight: 'auto',
                marginLeft: 'auto',

                [theme.breakpoints.down('sm')]: {
                    maxWidth: '100%'
                }
            },

            price: {
                fontWeight: 600,
                color: theme.palette.primary.main,
                marginBottom: 8,
                marginTop: 8
            },

            content: {
                padding: theme.spacing(2, 4, 4),
            },

            button: {
                marginLeft: 'auto',
                marginRight: 'auto',
                color: theme.palette.primary.main,
                // width: "33.3%"
                // width: "50%"
            },

            buttonIcon: {
                height: 22,
                marginRight: 12
            },

            menuItem: {
                padding: 12
            }
        }
    )
});

export default useStyles;
