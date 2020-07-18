import { makeStyles } from '@material-ui/core/styles';

// Styles for the home page
const useStyles = makeStyles(theme => {

    return (
        {
            container: {
                background: theme.palette.background.paper,
            },

            gridContainer: {
                maxWidth: 1300,
            },

            grid: {
                gridGap: '1rem'
            },

            i: {
                width: 383,
                paddingLeft: 12,
                paddinRight: 12,
            },

            title: {
                color: theme.palette.primary.main,
                marginTop: 62,
                paddingLeft: 16,
                width: 383,

                [theme.breakpoints.down('xs')] :{
                    textAlign: 'center',
                    paddingLeft: 0
                },
             

                [theme.breakpoints.down('md')]: {
                    fontSize: 27,
                    marginBottom: 0,
                    
                },
            }
        }
    )
})

export default useStyles;