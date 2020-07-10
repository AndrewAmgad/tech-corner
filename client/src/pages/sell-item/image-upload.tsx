import React, { useEffect, useState, SyntheticEvent } from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {
    Typography, IconButton, makeStyles, Grid
} from '@material-ui/core';

// Styles for the home page
const useStyles = makeStyles(theme => {

    return (
        {
            image: {
                height: 200
            },

            iconButtonLabel: {
                display: 'flex',
                flexDirection: 'column',
            }
        }
    )
})

function Upload({sendDataToParent, errors} : any) {
    const [images, setImages] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);
    const classes = useStyles();

    const onInputChange = (e: SyntheticEvent) => {
        const { files } = e.target as any;

        if (files[4]) return setError("Cannot upload more than 4 images");
        else setError(null);

        let urls: any[] = [];

        Array.from(files).forEach((file: any) => {
            urls.push(URL.createObjectURL(file));
        });

        setImages(urls);
        sendDataToParent(files);
        
    };

    return (
        <>
            <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={onInputChange} name='files' multiple />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span" classes={{ label: classes.iconButtonLabel }}>
                    <PhotoCamera />
                    <Typography variant="subtitle1" align="center">
                        Upload Images
                    </Typography>
                </IconButton>
            </label>

            {error && <Typography variant="subtitle1" align='center' color="error">{error}</Typography>}
            {errors.images && <Typography variant="subtitle1" align='center' color="error">{errors.images}</Typography>}

            <br />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={2}>

                {images.map((image: any, index: number) => (
                    <Grid item key={index}>
                        <img className={classes.image} src={image} />
                    </Grid>
                ))}

            </Grid>

            {/* Selected Images Preview */}


        </>
    )
}

export default Upload;