import React from 'react';

// Material UI Component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import placeholder from '../images/placeholder-image.png'

// Component Styles
import itemStyles from './styles/item-styles';
import { formatTime } from '../helpers';


export default function Item({item}: any) {
    const classes = itemStyles();

    const time = formatTime(item.time);

    return (
        <Card className={classes.root} >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    // IMAGE PLACEHOLDER
                    image={item.images[0] ? process.env.REACT_APP_AWS_URL + "/" + item.images[0] : placeholder}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" style={{height: 32, overflow: 'hidden'}}>
                        {item.title}
                    </Typography>


                    {/* Row Grid */}
                    <Grid style={{marginBottom: 12}} container direction="row"  justify="space-between" alignItems="flex-start">

                    <Typography className={classes.date} variant="subtitle2" component="p">
                        Cairo, Egypt
                      </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                    {time}     
                    </Typography>

                    </Grid>

                    <Typography className={classes.price} variant="subtitle2" gutterBottom>
                          {item.price} EGP
                      </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>

                <Button className={classes.button} size="small">
                    Favorite
                </Button>

                <Button className={classes.button} size="small">
                    Message
                    
                 </Button>
            </CardActions>
        </Card>
    );
}
