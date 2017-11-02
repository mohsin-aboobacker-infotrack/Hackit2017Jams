import { VALIDATION_IN_PROGRESS, VALIDATION_HAS_ERRORED, VALIDATION_SUCCESS } from '../ActionTypes/dashboard-actions-types';

export function validationInProgress(state: boolean = false, action) {
    if (action.type === VALIDATION_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function validationHasErrored(state: boolean = false, action) {
    if (action.type === VALIDATION_HAS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function validationSummary(state: any = {}, action) {
    if (action.type === VALIDATION_SUCCESS) {
        return action.validationResult;
    } else {
        return state;
    }
}