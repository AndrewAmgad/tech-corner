import { makeStyles } from '@material-ui/core/styles';

// Styles for the home page
const useStyles = makeStyles(theme => {

    return (
        {
            container: {
                background: theme.palette.background.paper
            },

            gridContainer: {
                maxWidth: 1300,
                [theme.breakpoints.up('lg')]: {
                    paddingLeft: 55,
                    paddingRight: 55,
                }
            },

            grid: {
                gridGap: '1rem'
            },

            i: {
                width: 383,
                padding: 12
            },

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
            }
        }
    )
})

export default useStyles;