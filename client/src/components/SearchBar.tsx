import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import searchBarStyles from './styles/search-bar-styles';
import Typography from '@material-ui/core/Typography';


export default function SearchBar() {
    const classes = searchBarStyles();

    return (
        <>

            <Grid
                className={classes.grid}
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}>

                <TextField
                    id="outlined-full-width"
                    label="Search"
                    className={classes.inputBar}
                    placeholder="Looking for something specific?"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.inputLabel,
                            focused: classes.inputFocusedLabel
                        }

                    }}

                    InputProps={{
                        classes: {
                            notchedOutline: classes.inputNotchedOutline
                        }
                    }}

                    variant="outlined"

                />

            </Grid>
        </>
    )
};