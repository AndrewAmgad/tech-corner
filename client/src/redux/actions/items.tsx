import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
    httpRequest
} from '../helpers';
import { Dispatch } from 'react';
import { displaySnackBar } from './notifications';

/**
 * GET /api/v1/items
 * Get all items 
 */
export function fetchItems(page?: number, cb?: () => void) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('GET_ITEMS'));
        httpRequest('GET', '/v1/items', { page: page, page_limit: 10 })
            .then((response) => {
                dispatch(fetchDataSuccess('GET_ITEMS', response))
                if (cb) cb()
            })
            .catch(err => dispatch(fetchDataFailure('GET_ITEMS', err.message)))
    }
}

/**
 * Clear the items reducer state
 */

 export function clearItems(){
     return (dispatch: Dispatch<any>) => {
         dispatch({type: "CLEAR_ITEMS"})
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
        httpRequest('POST', `/v1/items/${itemId}/upload-images`, false, { 'Content-Type': `multipart/form-data` }, body)
            .then((response) => {
                cb();
            })
            .catch(err => {
                cb();
            })
    }
};

/**
 * GET /categories
 * Returns a list of all available categories and their ID's
 */

export function getCategories() {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchDataBegin('GET_CATEGORIES'));
        httpRequest('GET', '/v1/categories')
            .then((response) => {
                dispatch(fetchDataSuccess('GET_CATEGORIES', response))
            })
            .catch(err => dispatch(fetchDataFailure('GET_CATEGORIES', err.message)))
    }
};

/** 
 * GET /items/:item_id/favorite
 * Adds the sent item to the user's favorites array
 */

 export function addToFavorites(id: string,) {
     return (dispatch: Dispatch<any>) => {
         httpRequest('GET', `/v1/items/${id}/favorite`)
         .then((response) => {
             dispatch(fetchDataSuccess('ADD_FAVORITE', response))
             dispatch(displaySnackBar(true, 'Added to favorites', 'success'))
         })
         .catch(err => {
             dispatch(fetchDataFailure('ADD_FAVORITE', err));
             if(err.status === 401) dispatch(displaySnackBar(true, 'Sign in to track your favorite items', 'warning'))
             else dispatch(displaySnackBar(true, err.reason, 'info'));
         })
     }
 };

/**
 * Clear the favorites reducer state
 */

export function clearFavorites(){
    return (dispatch: Dispatch<any>) => {
        dispatch({type: "CLEAR_FAVORITES"})
    }
};