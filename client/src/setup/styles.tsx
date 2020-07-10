import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    router: {
        marginTop: 64,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 250
          },
    }
}))

export default styles;