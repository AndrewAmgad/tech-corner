import React, { SyntheticEvent } from 'react';
import Modal from '../Modal'
import Item from '../../types/Item';
import Carousel from 'react-material-ui-carousel'
import Styles from './styles/modal-styles';
import { Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { formatTime } from '../../helpers';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import store from '../../setup/redux-store';
import { displaySnackBar } from '../../redux/actions/notifications';
import { addToFavorites } from '../../redux/actions/items';
import StarsIcon from '@material-ui/icons/Stars';
import MessageIcon from '@material-ui/icons/Message';
import CallIcon from '@material-ui/icons/Call';
import ContactIcon from '@material-ui/icons/ContactPhone';

interface Props {
    open: boolean,
    handleClose: () => void,
    item: Item | undefined,
}

const ItemModal = ({ open, handleClose, item }: Props) => {
    const classes = Styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const contactMenu = Boolean(anchorEl);


    if (!item) return <></>;

    return (
        <Modal
            open={open}
            handleClose={handleClose}>
            <div className={classes.root}>
                <Button className={classes.closeButton} onClick={handleClose}><CloseIcon /></Button>
                <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                    {item?.images.map((image: any, index: number) => (
                        <img key={index} className={classes.image} src={`${process.env.REACT_APP_AWS_URL}/${image}`} />
                    ))}
                </Carousel>

                <div className={classes.content}>
                    <Typography variant="h5" align='center'>{item?.title}</Typography>
                    <Typography variant="subtitle1" align='center' className={classes.price}>{formatTime(item?.time)}</Typography>
                    <Typography variant="subtitle1" className={classes.price}>{item?.price} EGP</Typography>
                    <Typography variant="subtitle2">By {item?.seller.name}</Typography>
                    <Typography className={classes.body} style={{ marginTop: 16 }} variant="body2">{item?.details}</Typography>

                    <div>
                        <Button className={classes.button}
                            style={{width: "50%"}}
                            size="small" aria-haspopup={true}
                            onClick={(e: any) => setAnchorEl(e.currentTarget)}>
                            <ContactIcon className={classes.buttonIcon} /> Contact
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={contactMenu}
                            onClose={() => setAnchorEl(null)}>

                            <CopyToClipboard text={item?.seller.phone}>
                                <MenuItem className={classes.menuItem} onClick={() => {
                                    store.dispatch(displaySnackBar(true, 'Phone number copied to clipboard', 'success'));
                                    setAnchorEl(null);
                                }}>
                                    <CallIcon className={classes.buttonIcon} /> Call
                            </MenuItem>
                            </CopyToClipboard>

                            <MenuItem className={classes.menuItem}> 
                                <MessageIcon className={classes.buttonIcon} /> Message
                            </MenuItem>
                        </Menu>



                        <Button className={classes.button}
                            style={{width: "50%"}}
                            size="small" onClick={() => store.dispatch(addToFavorites(item._id))}>
                            <StarsIcon className={classes.buttonIcon} /> Favorite
                        </Button>
                    </div>
                </div>

            </div>
        </Modal >
    )
};

export default ItemModal;