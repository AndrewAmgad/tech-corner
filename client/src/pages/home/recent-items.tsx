import React, { useState, SyntheticEvent, useEffect } from 'react';
import ItemCard from '../../components/Item/ItemCard';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import Typography from '@material-ui/core/Typography';

// Styling
import HomeStyles from './styles/home';
import ItemModal from '../../components/Item/ItemModal';
import Item from '../../types/Item';

/**
 * Component responsible for displaying all recent items and handles automatic pagination
 * Takes the fetchItems action & fetchItems reducer state as props
 */

function RecentItems(props: any) {
    const [modal, setModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const classes = HomeStyles();


    if (!props.items) return <></>

    return (
        <>
            <div className={classes.gridContainer}>
                {/* Grid title in a different grid to align with the grid items */}
                <Grid
                    className={classes.grid} container direction="row"
                    justify="center" alignItems="flex-start" spacing={3}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Most Recent
                    </Typography>
                    <i className={classes.i} aria-hidden='true'></i>
                    <i className={classes.i} aria-hidden='true'></i>
                    <i className={classes.i} aria-hidden='true'></i>
                </Grid>

                    <Grid
                        className={classes.grid}
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={3}>

                        {props.items.map((item: Item, index: number) => (
                            <Grid item key={index}>
                                <ItemCard item={item} 
                                onClick={() => { setModal(true); setSelectedItem(item) }} />
                            </Grid>
                        ))}

                        {/* hidden items to align last row */}
                        <i className={classes.i} aria-hidden='true'></i>
                        <i className={classes.i} aria-hidden='true'></i>
                        <i className={classes.i} aria-hidden='true'></i>
                    </Grid>
   

            </div>

            {modal && <ItemModal 
            item={selectedItem} open={modal} handleClose={() => setModal(false)} />}
        </>
    )
}

export default withRouter(RecentItems);