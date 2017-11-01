import { initialSupportRequestsCaresCommentsState } from './inital-states';
import { ISupportRequestsCommentsModel } from '../Models/support-requests-comments-model';
import { ISupportRequestCareModel } from '../Models/support-requests-care-model';
import {
    SUPPORT_REQUESTS_CARES_COMMENTS_IS_LOADING,
    SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_ERRORED,
    SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_SUCCESS,
    SUPPORT_REQUESTS_CARES_IS_LOADING,
    SUPPORT_REQUESTS_CARES_LOADING_HAS_ERRORED,
    SUPPORT_REQUESTS_CARES_LOADING_SUCCESS,
    SUPPORT_REQUESTS_SELECT_CARE_ID,
    SUPPORT_REQUESTS_NEW_COMMENT_POST_IN_PROGRESS,
    SUPPORT_REQUESTS_NEW_COMMENT_POST_HAS_ERRORED,
    SUPPORT_REQUESTS_NEW_COMMENT_POST_SUCCESS
} from '../ActionTypes/support-request-action-types';

export function supportRequestsCaresIsLoading(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_CARES_IS_LOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function supportRequestsCaresHasErrored(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_CARES_LOADING_HAS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function supportRequestsCares(state: ISupportRequestCareModel[] = [], action) {
    if (action.type === SUPPORT_REQUESTS_CARES_LOADING_SUCCESS) {
        return action.cares;
    } else {
        return state;
    }
}

export function supportRequestsCareCommentsIsLoading(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_CARES_COMMENTS_IS_LOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function supportRequestsCaresCommentsHasErrored(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function supportRequestsCareComments(state: ISupportRequestsCommentsModel = initialSupportRequestsCaresCommentsState, action) {
    if (action.type === SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_SUCCESS) {
        return action.careComments;
    } else {
        return state;
    }
}

export function selectedCare(state: string = "0", action) {
    if (action.type === SUPPORT_REQUESTS_SELECT_CARE_ID) {
        return action.selectedCareId;
    } else {
        return state;
    }
}

export function supportRequestsNewCommentInProgress(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_NEW_COMMENT_POST_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function supportRequestsNewCommentHasErrored(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_NEW_COMMENT_POST_HAS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function supportRequestsNewCommentSuccess(state: boolean = false, action) {
    if (action.type === SUPPORT_REQUESTS_NEW_COMMENT_POST_SUCCESS) {
        return action.isSuccess;
    } else {
        return state;
    }
}
