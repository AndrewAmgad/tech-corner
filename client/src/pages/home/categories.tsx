import React from "react";
import {Grid, Typography} from '@material-ui/core';
import Styles from './styles/categories';
import { withRouter, RouteComponentProps } from "react-router";

import Laptop from '@material-ui/icons/LaptopChromebookRounded';
import Computer from '@material-ui/icons/Computer';
import Keyboard from '@material-ui/icons/Keyboard';
import SportsEsports from '@material-ui/icons/SportsEsports';
import Watch from '@material-ui/icons/Watch';
import Tv from '@material-ui/icons/Tv';
import Speaker from '@material-ui/icons/Speaker';
import Category from "../../types/Category";
import AppsIcon from '@material-ui/icons/Apps';

interface Props extends RouteComponentProps{
    categories: Array<Category>
};

function Component({categories}: Props) {
    const classes = Styles();
    
    return (
        <div className={classes.container}>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}>


                {categories.length > 0 && categories.map((category: Category, index: number) => {
                    let Icon = AppsIcon;

                    if(category.name === 'Laptops & Computers') Icon = Computer
                    if(category.name === "TV's & Monitors") Icon = Tv
                    if(category.name === 'Gaming Consoles') Icon = SportsEsports
                    if(category.name === 'Speakers & Headsets') Icon = Speaker
                    if(category.name === 'Accessories') Icon = Keyboard
                    if(category.name === 'Smart Watches') Icon = Watch

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

export {Categories}
