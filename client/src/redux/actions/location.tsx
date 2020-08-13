import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
    httpRequest
} from '../helpers';
import { Dispatch } from 'react';

/** 
 * GET /api/v1/location/cities
 * Get all supported cities from the API
 */

 export function fetchCities() {
     return (dispatch: Dispatch<any>) => {
         dispatch(fetchDataBegin('GET_CITIES'));
         httpRequest('GET', '/v1/location/cities')
         .then((response) => {
             console.log(response)
             dispatch(fetchDataSuccess('GET_CITIES', response))
         })
         .catch(err => dispatch(fetchDataFailure('GET_CITIES', err.message)))
     };
 };