import {
    CALL_BACK_REQUEST_POST_SUCCESS,
    USER_DETAIL_UPDATE,
    USER_DETAILS_IS_LOADING,
    USER_DETAILS_LOADING_ERRORED,
    USER_DETAILS_LOADING_SUCCESS,
} from '../ActionTypes/ask-helpdesk-action-types';
import {
    MATTERS_ISLOADING,
    MATTERS_LOADING_ERRORED,
    MATTERS_LOADING_SUCCESS,
} from '../ActionTypes/ask-helpdesk-action-types';
import {
    MATTER_ORDERS_IS_LOADING,
    MATTER_ORDERS_LOADING_ERRORED,
    MATTER_ORDERS_LOADING_SUCCESS,
} from '../ActionTypes/ask-helpdesk-action-types';
import {
    CALL_BACK_REQUEST_POST_ERRORED,
    CALL_BACK_REQUEST_POST_IN_PROGRESS,
} from '../ActionTypes/ask-helpdesk-action-types';
import { SET_CARE_ID } from '../ActionTypes/ask-helpdesk-action-types';
import { IMatter } from '../Models/matters-model';
import { ISelectModel } from '../Models/react-select-model';
import { IUserDetail } from '../Models/user-detail-model';
import { initialUserDetail } from './inital-states';

export function userDetailIsLoading(state: boolean = false, action) {
    if (action.type === USER_DETAILS_IS_LOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function userDetailHasErrored(state: boolean = false, action) {
    if (action.type === USER_DETAILS_LOADING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function userDetail(state: IUserDetail = initialUserDetail, action) {
    if (action.type === USER_DETAILS_LOADING_SUCCESS || action.type === USER_DETAIL_UPDATE) {
        return action.userDetail;
    } else {
        return state;
    }
}

export function mattersIsLoading(state: boolean = false, action) {
    if (action.type === MATTERS_ISLOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function mattersHasErrored(state: boolean = false, action) {
    if (action.type === MATTERS_LOADING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function matters(state: IMatter[] = [], action) {
    if (action.type === MATTERS_LOADING_SUCCESS) {
        return action.matters;
    } else {
        return state;
    }
}

export function ordersIsLoading(state: boolean = false, action) {
    if (action.type === MATTER_ORDERS_IS_LOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function ordersHasErrored(state: boolean = false, action) {
    if (action.type === MATTER_ORDERS_LOADING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function orders(state: ISelectModel[] = [], action) {
    if (action.type === MATTER_ORDERS_LOADING_SUCCESS) {
        return action.orders;
    } else {
        return state;
    }
}

export function callBackRequestInProgress(state = false, action) {
    if (action.type === CALL_BACK_REQUEST_POST_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function callBackRequestErrored(state = false, action) {
    if (action.type === CALL_BACK_REQUEST_POST_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function callBackRequestSuccess(state = false, action) {
    if (action.type === CALL_BACK_REQUEST_POST_SUCCESS) {
        return action.isSuccess;
    } else {
        return state;
    }
}

export function careId(state = 0, action) {
    if (action.type === SET_CARE_ID) {
        return action.careId;
    } else {
        return state;
    }
}