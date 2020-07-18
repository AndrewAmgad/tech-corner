import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import authReducer from '../redux/reducers/auth';
import fetchItemsReducer from '../redux/reducers/Items/fetch-items';
import createItemReducer from '../redux/reducers/Items/create-item';
import notificationReducer from '../redux/reducers/notifications';
import categoriesReducer from '../redux/reducers/Items/categories';

export default createStore(
    combineReducers({
        authReducer,
        fetchItemsReducer,
        createItemReducer,
        notificationReducer,
        categoriesReducer
    }),
    {},
    applyMiddleware(thunk)
);

