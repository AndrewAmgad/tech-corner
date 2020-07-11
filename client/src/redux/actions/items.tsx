import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
    httpRequest
} from '../helpers';
import { Dispatch } from 'react';

/**
 * GET /api/v1/items
 * Get all items 
 */
export function fetchItems(page?: number) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('GET_ITEMS'));
        httpRequest('GET', '/v1/items', { page: page })
            .then((response) => {
                dispatch(fetchDataSuccess('GET_ITEMS', response))
            })
            .catch(err => dispatch(fetchDataFailure('GET_ITEMS', err.message)))
    }
}

/**
 * POST /api/v1/items
 * Create a new item
 */

export function createItem(body: any, cb: (response: any, error: any) => void) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('CREATE_ITEM'));
        httpRequest('POST', '/v1/items', false, false, body)
            .then((response) => {
                dispatch(fetchDataSuccess('CREATE_ITEM', response));
                cb(response, undefined);
            })
            .catch(err => {
                dispatch(fetchDataFailure('CREATE_ITEM', err))
                cb(undefined, err);
            });
    }
}



/**
 * POST /items/:item_id/upload-images
 * Upload item images and add their URLS to the item's database object
 * Uses form-data
 */

export function uploadImages(itemId: string, body: any, cb: () => void) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('UPLOAD_IMAGES'));
        httpRequest('POST', `/v1/items/${itemId}/upload-images`, false, {'Content-Type': `multipart/form-data`}, body)
            .then((response) => {
                cb();
            })
            .catch(err => {
                cb();
            })
    }
}