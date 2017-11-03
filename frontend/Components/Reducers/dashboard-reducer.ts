import { IFaceMatchModel } from '../Models/face-match-model';
import { IDetailsMatchResult } from '../Models/details-match-result';
import { UPLOAD_PHOTO_HOLDNG_ID_IN_PROGRESS, UPLOAD_PHOTO_HOLDNG_ID_ERROR, UPLOAD_PHOTO_HOLDNG_ID_SUCCESS, UPLOAD_PASSPORT_IN_PROGRESS, UPLOAD_PASSPORT_ERROR, UPLOAD_PASSPORT_SUCCESS, UPLOAD_LICENSE_IN_PROGRESS, UPLOAD_LICENSE_ERROR, UPLOAD_LICENSE_SUCCESS, FACE_MATCH_SUCCESS, FACE_MATCH_ERROR, FACE_MATCH_IN_PROGRESS, DETAILS_MATCH_IN_PROGRESS, DETAILS_MATCH_ERROR, DETAILS_MATCH_SUCCESS, VALIDATION_STARTED } from '../ActionTypes/dashboard-actions-types';

export function uploadPhotoInProgress(state: boolean = false, action) {
    if (action.type === UPLOAD_PHOTO_HOLDNG_ID_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function uploadPhotoHasErrored(state: boolean = false, action) {
    if (action.type === UPLOAD_PHOTO_HOLDNG_ID_ERROR) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function photoFilePath(state: string = "", action) {
    if (action.type === UPLOAD_PHOTO_HOLDNG_ID_SUCCESS) {
        return action.filePath;
    } else {
        return state;
    }
}

export function uploadPassportInProgress(state: boolean = false, action) {
    if (action.type === UPLOAD_PASSPORT_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function uploadPassportHasErrored(state: boolean = false, action) {
    if (action.type === UPLOAD_PASSPORT_ERROR) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function passportFilePath(state: string = "", action) {
    if (action.type === UPLOAD_PASSPORT_SUCCESS) {
        return action.filePath;
    } else {
        return state;
    }
}

export function uploadLicenseInProgress(state: boolean = false, action) {
    if (action.type === UPLOAD_LICENSE_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function uploadLicenseHasErrored(state: boolean = false, action) {
    if (action.type === UPLOAD_LICENSE_ERROR) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function licenseFilePath(state: string = "", action) {
    if (action.type === UPLOAD_LICENSE_SUCCESS) {
        return action.filePath;
    } else {
        return state;
    }
}

export function faceMatchInProgress(state: boolean = false, action) {
    if (action.type === FACE_MATCH_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function faceMatchHasErrored(state: boolean = false, action) {
    if (action.type === FACE_MATCH_ERROR) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function faceMatchSuccess(state: IFaceMatchModel = intialFaceMatchModel, action) {
    if (action.type === FACE_MATCH_SUCCESS) {
        return action.result;
    } else {
        return state;
    }
}

export function detailsMatchInProgress(state: boolean = false, action) {
    if (action.type === DETAILS_MATCH_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function detailsMatchHasErrored(state: boolean = false, action) {
    if (action.type === DETAILS_MATCH_ERROR) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function detailsMatchSuccess(state: IDetailsMatchResult = initialDetailsMatchResult, action) {
    if (action.type === DETAILS_MATCH_SUCCESS) {
        return action.result;
    } else {
        return state;
    }
}

export function validationStarted(state: boolean = false, action) {
    if (action.type === VALIDATION_STARTED) {
        return action.hasStarted;
    } else {
        return state;
    }
}

const initialDetailsMatchResult: IDetailsMatchResult = {
    ImageQualityAcceptable: false,
    NameMatch: false,
    DobMatch: false,
    GenderMatch: false,
    IsDocumentValid: false
};

const intialFaceMatchModel: IFaceMatchModel = {
    error: "",
    face1Base64: "",
    face1Path: "",
    face2Path: "",
    matchPercentage: 0,
    success: false
};