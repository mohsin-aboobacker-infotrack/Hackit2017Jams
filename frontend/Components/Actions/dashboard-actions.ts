
import { type } from 'os';
import {
    DETAILS_MATCH_ERROR,
    DETAILS_MATCH_IN_PROGRESS,
    DETAILS_MATCH_SUCCESS,
    FACE_MATCH_ERROR,
    FACE_MATCH_IN_PROGRESS,
    FACE_MATCH_SUCCESS,
    UPLOAD_LICENSE_ERROR,
    UPLOAD_LICENSE_IN_PROGRESS,
    UPLOAD_LICENSE_SUCCESS,
    UPLOAD_PASSPORT_ERROR,
    UPLOAD_PASSPORT_IN_PROGRESS,
    UPLOAD_PASSPORT_SUCCESS,
    UPLOAD_PHOTO_HOLDNG_ID_ERROR,
    UPLOAD_PHOTO_HOLDNG_ID_IN_PROGRESS,
    UPLOAD_PHOTO_HOLDNG_ID_SUCCESS,
} from '../ActionTypes/dashboard-actions-types';
import { Error } from 'tslint/lib/error';

import axios from 'axios';
import { IDetailsMatchResult } from '../Models/details-match-result';
import { VALIDATION_STARTED } from '../ActionTypes/dashboard-actions-types';
import { IFaceMatchModel } from '../Models/face-match-model';
import { IUserDetails } from '../Models/user-details';
export function uploadPhotoInProgress(inProgress: boolean) {
    return {
        type: UPLOAD_PHOTO_HOLDNG_ID_IN_PROGRESS,
        inProgress
    };
}

export function uploadPhotoHasErrored(hasErrored: boolean) {
    return {
        type: UPLOAD_PHOTO_HOLDNG_ID_ERROR,
        hasErrored
    };
}

export function uploadPhotoSuccess(filePath: string) {
    return {
        type: UPLOAD_PHOTO_HOLDNG_ID_SUCCESS,
        filePath
    };
}

export function uploadFile(photoFile: FormData, passportFile: FormData, licenseFile: FormData, userDetail: IUserDetails) {
    return (dispatch) => {
        dispatch(uploadPhotoInProgress(true));

        axios({
            method: "POST",
            url: "http://localhost:62586/File/Upload",
            data: photoFile,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw new Error(response.statusText);
                }

                dispatch(uploadPhotoHasErrored(false));
                dispatch(uploadPhotoInProgress(false));
                dispatch(uploadPhotoSuccess(response.data));
                dispatch(uploadPassport(passportFile, licenseFile, response.data, userDetail));

            })
            .catch((e) => {
                dispatch(uploadPhotoHasErrored(true));
                dispatch(uploadPhotoInProgress(false));
                // tslint:disable-next-line:no-console
                console.log(e);
            });
    };
}

export function uploadPassportInProgress(inProgress: boolean) {
    return {
        type: UPLOAD_PASSPORT_IN_PROGRESS,
        inProgress
    };
}

export function uploadPassportHasErrored(hasErrored: boolean) {
    return {
        type: UPLOAD_PASSPORT_ERROR,
        hasErrored
    };
}

export function uploadPassportSuccess(filePath: string) {
    return {
        type: UPLOAD_PASSPORT_SUCCESS,
        filePath
    };
}

export function uploadPassport(passportFile: FormData, licenseFile: FormData, photoPath: string, userDetails: IUserDetails) {
    return (dispatch) => {
        dispatch(uploadPassportInProgress(true));

        axios({
            method: "POST",
            url: "http://localhost:62586/File/Upload",
            data: passportFile,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw new Error(response.statusText);
                }

                dispatch(uploadPassportHasErrored(false));
                dispatch(uploadPassportInProgress(false));
                dispatch(uploadPassportSuccess(response.data));
                dispatch(uploadLicense(licenseFile, photoPath, response.data, userDetails));
            })
            .catch((e) => {
                dispatch(uploadPassportHasErrored(true));
                dispatch(uploadPassportInProgress(false));
                // tslint:disable-next-line:no-console
                console.log(e);
            });
    };
}

export function uploadLicenseInProgress(inProgress: boolean) {
    return {
        type: UPLOAD_LICENSE_IN_PROGRESS,
        inProgress
    };
}

export function uploadLicenseHasErrored(hasErrored: boolean) {
    return {
        type: UPLOAD_LICENSE_ERROR,
        hasErrored
    };
}

export function uploadLicenseSuccess(filePath: string) {
    return {
        type: UPLOAD_LICENSE_SUCCESS,
        filePath
    };
}

export function uploadLicense(licenseFile: FormData, photoPath: string, passportPath: string, userDetails: IUserDetails) {
    return (dispatch) => {
        dispatch(uploadLicenseInProgress(true));

        axios({
            method: "POST",
            url: "http://localhost:62586/File/Upload",
            data: licenseFile,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw new Error(response.statusText);
                }

                dispatch(uploadLicenseHasErrored(false));
                dispatch(uploadLicenseInProgress(false));
                dispatch(uploadLicenseSuccess(response.data));

                dispatch(startValidation());
                dispatch(faceMatch(photoPath));
                dispatch(detailsMatch(response.data, passportPath, userDetails));
            })
            .catch((e) => {
                dispatch(uploadLicenseHasErrored(true));
                dispatch(uploadLicenseInProgress(false));
                // tslint:disable-next-line:no-console
                // console.log(e);
            });
    };
}

export function validationStarted(hasStarted: boolean) {
    return {
        type: VALIDATION_STARTED,
        hasStarted
    };
}
export function startValidation() {
    return (dispatch) => {
        dispatch(validationStarted(true));
    };
}

export function faceMatchInProgress(inProgress: boolean) {
    return {
        type: FACE_MATCH_IN_PROGRESS,
        inProgress
    };
}

export function faceMatchHasErrored(hasErrored: boolean) {
    return {
        type: FACE_MATCH_ERROR,
        hasErrored
    };
}

export function faceMatchSuccess(result: IFaceMatchModel) {
    return {
        type: FACE_MATCH_SUCCESS,
        result
    };
}

export function faceMatch(filePath: string) {
    return (dispatch) => {
        dispatch(faceMatchInProgress(true));

        axios({
            method: "POST",
            url: `http://localhost:53125/api/detection`,
            data: { path: filePath },
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw new Error(response.statusText);
                }

                dispatch(faceMatchHasErrored(false));
                dispatch(faceMatchInProgress(false));
                dispatch(faceMatchSuccess(response.data));
            })
            .catch((e) => {
                dispatch(faceMatchHasErrored(true));
                dispatch(faceMatchInProgress(false));
                // tslint:disable-next-line:no-console
                console.log(e);
            });
    };
}

export function detailsMatchInProgress(inProgress: boolean) {
    return {
        type: DETAILS_MATCH_IN_PROGRESS,
        inProgress
    };
}

export function detailsMatchHasErrored(hasErrored: boolean) {
    return {
        type: DETAILS_MATCH_ERROR,
        hasErrored
    };
}

export function detailsMatchSuccess(result: IDetailsMatchResult) {
    return {
        type: DETAILS_MATCH_SUCCESS,
        result
    };
}

export function detailsMatch(licensePath: string, passportPath: string, userDetails: IUserDetails) {
    return (dispatch) => {
        dispatch(detailsMatchInProgress(true));

        axios({
            method: "POST",
            url: "http://localhost:62586/license/data",
            data: {
                Name: userDetails.Name,
                DOB: userDetails.DOB,
                Gender: userDetails.Gender,
                FilePath: licensePath
            },
        })
            .then((licenseResponse) => {
                if (licenseResponse.statusText !== "OK") {
                    throw new Error(licenseResponse.statusText);
                }

                let finalResponse: IDetailsMatchResult = {
                    ImageQualityAcceptable: (licenseResponse.data.ImageQualityAcceptable),
                    DobMatch: (licenseResponse.data.DobMatch),
                    IsDocumentValid: (licenseResponse.data.IsDocumentValid),
                    GenderMatch: (licenseResponse.data.GenderMatch),
                    NameMatch: (licenseResponse.data.NameMatch),
                };

                dispatch(detailsMatchHasErrored(false));
                dispatch(detailsMatchInProgress(false));
                dispatch(detailsMatchSuccess(finalResponse));
            })
            .catch((e) => {
                dispatch(detailsMatchHasErrored(true));
                dispatch(detailsMatchInProgress(false));
                // tslint:disable-next-line:no-console
                console.log(e);
            });
    };
}