import React from 'react';
import Modal from '../Modal'
import Item from '../../types/Item';
import Carousel from 'react-material-ui-carousel'
import Styles from './modal-styles';
import { Typography, Button } from '@material-ui/core';
import { formatTime } from '../../helpers';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
    open: boolean,
    handleClose: () => void,
    item: Item | undefined
}

const ItemModal = ({ open, handleClose, item }: Props) => {
    const classes = Styles();

    return (
        <Modal
            open={open}
            handleClose={handleClose}>
            <div className={classes.root}>
                <Button className={classes.closeButton} onClick={handleClose}><CloseIcon /></Button>
                <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                    {item?.images.map((image) => (
                        <img className={classes.image} src={`${process.env.REACT_APP_AWS_URL}/${image}`} />
                    ))}
                </Carousel>

                <div className={classes.content}>
                    <Typography variant="h5" align='center'>{item?.title}</Typography>
                    <Typography variant="subtitle1" align='center' className={classes.price}>{formatTime(item?.time)}</Typography>
                    <Typography variant="subtitle1" className={classes.price}>{item?.price} EGP</Typography>
                    <Typography variant="subtitle2">By {item?.seller.name}</Typography>
                    <Typography className={classes.body} style={{ marginTop: 16 }} variant="body2">{item?.details}</Typography>

                    <div>
                        <Button className={classes.button} size="small">
                            Call
                        </Button>

                        <Button className={classes.button} size="small">
                            Message
                        </Button>

                        <Button className={classes.button} size="small">
                            Favorite
                        </Button>
                    </div>
                </div>

            </div>
        </Modal>
    )
};

export default ItemModal;