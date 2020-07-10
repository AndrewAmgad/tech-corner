import React from "react";
import {Grid, Typography} from '@material-ui/core';
import Styles from './styles/categories';
import { withRouter } from "react-router";

import Laptop from '@material-ui/icons/LaptopChromebookRounded';
import Computer from '@material-ui/icons/Computer';
import Keyboard from '@material-ui/icons/Keyboard';
import SportsEsports from '@material-ui/icons/SportsEsports';
import Tv from '@material-ui/icons/Tv';
import Speaker from '@material-ui/icons/Speaker';


const categoriesList = [
    { name: 'Laptops', icon: Laptop },
    { name: 'Computers', icon: Computer },
    { name: "TV's & Monitors", icon: Tv },
    { name: "Gaming Consoles", icon: SportsEsports },
    { name: "Speakers & Headsets", icon: Speaker },
    { name: "Accessories", icon: Keyboard}
]

function Component() {
    const classes = Styles();

    return (
        <div className={classes.container}>
            {/* <Typography variant="h5" gutterBottom className={classes.title}>
                Categories
            </Typography> */}

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>


                {categoriesList.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <Grid item className={classes.item} key={index}>
                            <Icon className={classes.icon} />
                            <Typography variant="subtitle1" className={classes.iconTitle} align="center">
                                {category.name}
                            </Typography>
                        </Grid>
                    )
                })}



            </Grid>
        </div>
    )
}

const Categories = withRouter(Component)

export {Categories, categoriesList}
