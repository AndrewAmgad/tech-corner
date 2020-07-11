import { makeStyles } from '@material-ui/core/styles';


/**
 * Styles for the Item component
 */
const itemStyles = makeStyles(theme => ({
    root: {
        width: 355,
        borderRadius: 12,
        height: 380,
        flexGrow: 1,
        marginTop: 16,
        marginRight: 'auto',
        marginLeft: 'auto',
        boxShadow: "0px 0px 0px -1px rgba(0,0,0,0.2), 0px 0px 0px 1px rgba(0,0,0,0.05), 0px 0px 1px 0px rgba(0,0,0,0.12)",
        backgroundColor: theme.palette.background.default
    },
    media: {
        height: 200,
    },
    
    divider: {
        marginTop: 8,
        marginBottom: 12
    },

    price: {
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginBottom: 0
    },

    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        color: theme.palette.primary.main
    },

    date: {
        marginTop: 2
    }
}));

export default itemStyles;