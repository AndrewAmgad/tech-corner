import { makeStyles } from '@material-ui/core/styles';

const searchBarStyles = makeStyles(theme => {

    return (
        {
            grid: {
                paddingTop: 42,
                paddingBottom: 32,
                width: "100%",
                maxWidth: 1100,
                marginRight: "auto",
                marginLeft: "auto",

                [theme.breakpoints.down('sm')]:{
                    paddingTop: 20
                }

            },

            inputBar: {
                    background: theme.palette.background.default,
                },

                inputNotchedOutline: {
                    borderColor: `${theme.palette.primary.main} !important`
                },

                inputLabel: {
                    fontWeight: 600
                },

                inputFocusedLabel: {
                    color: `${theme.palette.primary.main} !important`
                }
            }
    )
});

export default searchBarStyles;