import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { validationInProgress, validationHasErrored, validationSummary } from './dashboard-reducer';

export default combineReducers({
    routing: routerReducer,
    validationInProgress, validationHasErrored, validationSummary
});