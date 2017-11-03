import {
    detailsMatchHasErrored,
    detailsMatchInProgress,
    detailsMatchSuccess,
    faceMatchHasErrored,
    faceMatchInProgress,
    faceMatchSuccess,
    uploadLicenseHasErrored,
    uploadLicenseInProgress,
    photoFilePath,
    uploadPassportHasErrored,
    uploadPassportInProgress,
    passportFilePath,
    uploadPhotoHasErrored,
    uploadPhotoInProgress,
    licenseFilePath,
} from './dashboard-reducer';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { validationStarted } from './dashboard-reducer';

export default combineReducers({
    routing: routerReducer,
    uploadPhotoInProgress, uploadPhotoHasErrored, photoFilePath,
    uploadPassportInProgress, uploadPassportHasErrored, passportFilePath,
    uploadLicenseInProgress, uploadLicenseHasErrored, licenseFilePath,
    faceMatchInProgress, faceMatchHasErrored, faceMatchSuccess,
    detailsMatchInProgress, detailsMatchHasErrored, detailsMatchSuccess,
    validationStarted
});