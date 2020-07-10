import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    container: {
        paddingBottom: 20
    },

    title: {
        color: theme.palette.primary.main,
        marginTop: 32,
        marginBottom: 32,
        marginLeft: 55,

        [theme.breakpoints.down('sm')]: {
            fontSize: 27,
            marginTop: 26,
            marginBottom: 26
        },

        [theme.breakpoints.up('sm')]: {
            textAlign: 'left',
        }
    },

    item: {
        maxWidth: 180,
        height: 88,
        cursor: 'pointer',
        borderRadius: 20,
        transition: 'all 0.2s ease-out',
        '&:hover $icon': {
            fontSize: 40
        },

        '&:hover': {
            background: 'rgba(10, 10, 10, 0.085)',
        }
    },

    icon: {
        transition: 'all 0.2s ease-out',
        fontSize: 34,
        marginBottom: 8,
        color: theme.palette.primary.main,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%"
    },

    iconTitle: {
        fontSize: 14,
        width: "100% !important",
        color: theme.palette.primary.main
    }
}));

export default useStyles;