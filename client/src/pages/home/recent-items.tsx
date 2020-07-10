import React from 'react';
import ItemCard from '../../components/ItemCard';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';

// Styling
import HomeStyles from './styles/home';

/**
 * Component responsible for displaying all recent items and handles automatic pagination
 * Takes the fetchItems action & fetchItems reducer state as props
 */

function RecentItems(props: any) {
    const classes = HomeStyles();
    const items = props.response ? props.response.items : undefined;

    return (
        <div className={classes.gridContainer}>
            <Typography variant="h5" gutterBottom className={classes.title}>
                Most Recent
            </Typography>

            <Grid
                className={classes.grid}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>


                {items ? items.map((item: object, index: number) => (
                    <Grid item key={index}>
                        <ItemCard item={item} />
                    </Grid>
                )) : ""}


                {/* hidden items to align last row */}
                <i className={classes.i} aria-hidden='true'></i>
                <i className={classes.i} aria-hidden='true'></i>
                <i className={classes.i} aria-hidden='true'></i>


            </Grid>
        </div>
    )
}

export default withRouter(RecentItems);