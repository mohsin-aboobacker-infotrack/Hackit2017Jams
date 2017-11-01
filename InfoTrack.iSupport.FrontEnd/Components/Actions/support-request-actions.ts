import { ISupportRequestsCommentsModel } from '../Models/support-requests-comments-model';
import { ISupportRequestCareModel } from '../Models/support-requests-care-model';
import axios from 'axios';
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
    SUPPORT_REQUESTS_NEW_COMMENT_POST_SUCCESS,
} from '../ActionTypes/support-request-action-types';
import { supportRequestsCaresApi, supportRequestsCommentsApi, supportRequestsNewCommentApi } from '../../App/api-endpoints';
import { initialSupportRequestsCaresCommentsState } from '../Reducers/inital-states';
import { INewCommentModel } from '../Models/support-request-new-comment-model';
export function loadSupportRequestsCaresIsLoading(isLoading: boolean) {
    return {
        type: SUPPORT_REQUESTS_CARES_IS_LOADING,
        isLoading
    };
}

export function loadSupportRequestsCaresHasErrored(hasErrored: boolean) {
    return {
        type: SUPPORT_REQUESTS_CARES_LOADING_HAS_ERRORED,
        hasErrored
    };
}

export function loadSupportRequestsCaresSuccess(cares: ISupportRequestCareModel[]) {
    return {
        type: SUPPORT_REQUESTS_CARES_LOADING_SUCCESS,
        cares
    };
}

export function supportRequestsSelectCare(selectedCareId: string) {
    return {
        type: SUPPORT_REQUESTS_SELECT_CARE_ID,
        selectedCareId
    };
}

export function updateSelectedCare(selectedCareId: string) {
    return (dispatch) => {
        dispatch(supportRequestsSelectCare(selectedCareId));
    };
}

const apiConfig = {
    headers: { "api-version": 2 }
};

export function supportRequestsFetchCares(clientId: string) {
    return (dispatch) => {
        dispatch(loadSupportRequestsCaresIsLoading(true));
        dispatch(loadSupportRequestsCaresSuccess([]));
        const url = supportRequestsCaresApi.replace("#clientId#", clientId);
        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(loadSupportRequestsCaresIsLoading(false));
                dispatch(loadSupportRequestsCaresHasErrored(false));
                dispatch(loadSupportRequestsCaresSuccess(response.data));

                // if (response.data.length > 0) {
                //     dispatch(updateSelectedCare(response.data[0].IncidentId));
                //     dispatch(supportRequestsFetchCareComments(response.data[0].IncidentId));
                // }
            })
            .catch(() => {
                dispatch(loadSupportRequestsCaresIsLoading(false));
                dispatch(loadSupportRequestsCaresHasErrored(true));
            });
    };
}

export function loadSupportRequestsCommentsIsLoading(isLoading: boolean) {
    return {
        type: SUPPORT_REQUESTS_CARES_COMMENTS_IS_LOADING,
        isLoading
    };
}

export function loadSupportRequestsCommentsHasErrored(hasErrored: boolean) {
    return {
        type: SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_ERRORED,
        hasErrored
    };
}

export function loadSupportRequestsCommentsSuccess(careComments: ISupportRequestsCommentsModel) {
    return {
        type: SUPPORT_REQUESTS_CARES_COMMENTS_LOADING_SUCCESS,
        careComments
    };
}

export function supportRequestsFetchCareComments(careId: string) {
    return (dispatch) => {
        dispatch(postCommentHasErrored(false));
        dispatch(loadSupportRequestsCommentsIsLoading(true));
        //dispatch(loadSupportRequestsCommentsSuccess(initialSupportRequestsCaresCommentsState));
        const url = supportRequestsCommentsApi.replace("#careId", careId);

        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(loadSupportRequestsCommentsIsLoading(false));
                dispatch(loadSupportRequestsCommentsHasErrored(false));
                dispatch(loadSupportRequestsCommentsSuccess(response.data));
            })
            .catch(() => {
                dispatch(loadSupportRequestsCommentsIsLoading(false));
                dispatch(loadSupportRequestsCommentsHasErrored(true));
            });
    };
}

export function postCommentInProgress(inProgress: boolean) {
    return {
        type: SUPPORT_REQUESTS_NEW_COMMENT_POST_IN_PROGRESS,
        inProgress
    };
}

export function postCommentHasErrored(hasErrored: boolean) {
    return {
        type: SUPPORT_REQUESTS_NEW_COMMENT_POST_HAS_ERRORED,
        hasErrored
    };
}

export function postCommentSuccess(isSuccess: boolean) {

    return {
        type: SUPPORT_REQUESTS_NEW_COMMENT_POST_SUCCESS,
        isSuccess
    };
}

export function postComment(newComment: INewCommentModel, careId: string) {
    return (dispatch) => {
        dispatch(postCommentInProgress(true));

        axios({
            method: "POST",
            url: supportRequestsNewCommentApi.replace("#careId#", careId),
            data: newComment,
            headers: {
                "api-version": 2,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }
                dispatch(postCommentInProgress(false));
                dispatch(postCommentHasErrored(false));
                dispatch(postCommentSuccess(true));
                dispatch(supportRequestsFetchCareComments(careId));
            })
            .catch(() => {
                dispatch(postCommentHasErrored(true));
                dispatch(postCommentInProgress(false));
                dispatch(postCommentSuccess(false));
            });
    };
}