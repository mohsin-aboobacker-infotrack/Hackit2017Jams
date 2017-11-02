import { VALIDATION_IN_PROGRESS, VALIDATION_HAS_ERRORED, VALIDATION_SUCCESS } from '../ActionTypes/dashboard-actions-types';
import axios from 'axios';
export function validationInProgress(inProgress: boolean) {
    return {
        type: VALIDATION_IN_PROGRESS,
        inProgress
    };
}

export function validationHasErrored(hasErrored: boolean) {
    return {
        type: VALIDATION_HAS_ERRORED,
        hasErrored
    };
}

export function validationSuccess(validationResult: any) {
    return {
        type: VALIDATION_SUCCESS,
        validationResult
    };
}

export function validate() {
    return (dispatch) => {
        dispatch(validationInProgress(true));

        axios({
            method: "POST",
            url: "",
            headers: {
                "Content-Type": "multipart/formdata"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(validationHasErrored(false));
                dispatch(validationInProgress(false));
                dispatch(validationSuccess(response.data));
            })
            .catch((e) => {
                dispatch(validationHasErrored(true));
                dispatch(validationInProgress(false));
                // tslint:disable-next-line:no-console
                console.log(e);
            });
    };
}