import React from 'react';
import Modal from '../Modal'
import Item from '../../types/Item';

interface Props {
    open: boolean,
    handleClose: () => void,
    item: Item | undefined
}

const ItemModal = ({ open, handleClose, item }: Props) => {
    console.log(item);
    return (
        <Modal
            open={open}
            handleClose={handleClose}>
            <h1>{item?.title}</h1>
        </Modal>
    )
};

export default ItemModal;