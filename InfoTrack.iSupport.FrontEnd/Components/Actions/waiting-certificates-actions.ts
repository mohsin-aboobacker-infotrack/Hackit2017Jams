import { IAnswerRequest } from '../Models/waiting-certificates-answer-request';
import { IChaseRequest } from '../Models/WaitingCertificateModels/chase-request';
import { IWaitingCertificatesCommentsModel, IQuestion, ISelectedCommentModel } from '../Models/waiting-certificates-comments-model';
import { IChaseableOrder } from '../Models/waiting-certificates-chaseableorders';
import { IWaitingCertificatesMatters } from '../Models/waiting-certificates-matters-model';
import {
    LOAD_WAITING_CERTIFICATES_ERRORED,
    LOAD_WAITING_CERTIFICATES_IN_PROGRESS,
    LOAD_WAITING_CERTIFICATES_MATTERS_ERRORED,
    LOAD_WAITING_CERTIFICATES_MATTERS_IN_PROGRESS,
    LOAD_WAITING_CERTIFICATES_MATTERS_SUCCESS,
    LOAD_WAITING_CERTIFICATES_SUCCESS,
    WAITING_CERTIFICATES_ANSWER_HAS_ERRORED,
    WAITING_CERTIFICATES_ANSWER_IN_PROGRESS,
    WAITING_CERTIFICATES_ANSWER_SUCCESS,
    WAITING_CERTIFICATES_ANSWERING_QUESTION,
    WAITING_CERTIFICATES_CHASING_ERRORED,
    WAITING_CERTIFICATES_CHASING_IN_PROGRESS,
    WAITING_CERTIFICATES_CHASING_SUCCESS,
    WAITING_CERTIFICATES_COMMENT_POST_HAS_ERRORED,
    WAITING_CERTIFICATES_COMMENT_POST_IN_PROGRESS,
    WAITING_CERTIFICATES_COMMENT_POST_SUCCESS,
    WAITING_CERTIFICATES_COMMENTS_IS_LOADING,
    WAITING_CERTIFICATES_COMMENTS_LOADING_ERRORED,
    WAITING_CERTIFICATES_COMMENTS_LOADING_SUCCESS,
    WAITING_CERTIFICATES_SELECTED_COMMENT,
    WAITING_CERTIFICATES_SELECTED_MATTER,
    WAITING_CERTIFICATES_SELECTED_ORDER,
} from '../ActionTypes/waiting-certificates-action-types';
import axios from 'axios';
import { waitingCertificatesMattersApi, waitingCertificatesChaseableOrdersApi, waitingCertificatesCommentsApi, waitingCertificatesPostCommentApi, waitingCertificatesChaseOrderApi, waitingCertificatesPostAnswerApi, waitingCertificatesQuestionsFileUploadApi } from '../../App/api-endpoints';
import { IChaseableOrdersRequest } from '../Models/waiting-certificates-chaseableorders-request';
import { INewCommentRequest } from '../Models/WaitingCertificateModels/new-comment-request-uk';
import { chasedOrders } from '../Reducers/waiting-certificates-reducers';
import { IChasedOrder } from '../Models/WaitingCertificateModels/chased-orders';
import { isUk } from '../../App/common-helpers';
import { QUESTION_UPLOAD_FILE_IN_PROGRESS, QUESTION_UPLOAD_FILE_ERRORED, QUESTION_UPLOAD_FILE_SUCCESS } from '../ActionTypes/waiting-certificates-action-types';
import { IQuestionAttachment } from '../Models/WaitingCertificateModels/question-attachments';
import { initialSelectedQuestion } from '../Reducers/inital-states';

export function loadWaitingCertificatesMattersIsLoading(isLoading: boolean) {
    return {
        type: LOAD_WAITING_CERTIFICATES_MATTERS_IN_PROGRESS,
        isLoading
    };
}

export function loadWaitingCertificatesMattersHasErrored(hasErrored: boolean) {
    return {
        type: LOAD_WAITING_CERTIFICATES_MATTERS_ERRORED,
        hasErrored
    };
}

export function loadWaitingCertificatesMattersSuccess(matters: IWaitingCertificatesMatters[]) {
    return {
        type: LOAD_WAITING_CERTIFICATES_MATTERS_SUCCESS,
        matters
    };
}

export function waitingCertificatesSelectMatter(selectedMatterReference: string) {
    return {
        type: WAITING_CERTIFICATES_SELECTED_MATTER,
        selectedMatterReference
    };
}

export function updateSelectedMatter(selectedMatterReference: string) {
    return (dispatch) => {
        dispatch(waitingCertificatesSelectMatter(selectedMatterReference));
    };
}

const apiConfig = {
    headers: { "api-version": 2 }
};

export function fetchWaitingCertificatesMatters(clientId: string) {
    return (dispatch) => {
        dispatch(loadWaitingCertificatesMattersIsLoading(true));
        dispatch(loadWaitingCertificatesMattersSuccess([]));

        const url = waitingCertificatesMattersApi.replace("#clientId#", clientId);

        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(loadWaitingCertificatesMattersIsLoading(false));
                dispatch(loadWaitingCertificatesMattersHasErrored(false));

                // const apiData = response.data.splice(0, 1000);
                const apiData = response.data;

                dispatch(loadWaitingCertificatesMattersSuccess(apiData));

                // if (apiData.length > 0) {
                //     dispatch(updateSelectedMatter(apiData[0].MatterName));
                //     dispatch(fetchChaseableOrders(clientId, apiData[0].MatterName));
                // }
            })
            .catch(() => {
                dispatch(loadWaitingCertificatesMattersHasErrored(true));
                dispatch(loadWaitingCertificatesMattersIsLoading(false));
            });
    };
}

export function loadWaitingCertificatesIsLoading(isLoading: boolean) {
    return {
        type: LOAD_WAITING_CERTIFICATES_IN_PROGRESS,
        isLoading
    };
}

export function loadWaitingCertificatesHasErrored(hasErrored: boolean) {
    return {
        type: LOAD_WAITING_CERTIFICATES_ERRORED,
        hasErrored
    };
}

export function loadWaitingCertificatesSuccess(chaseableOrders: IChaseableOrder[]) {
    return {
        type: LOAD_WAITING_CERTIFICATES_SUCCESS,
        chaseableOrders
    };
}

export function fetchChaseableOrders(clientId: string, loginId: string) {
    return (dispatch) => {
        dispatch(loadWaitingCertificatesIsLoading(true));
        dispatch(loadWaitingCertificatesSuccess([]));

        const url: string = waitingCertificatesChaseableOrdersApi.replace("#clientId#", clientId).replace("#loginId#", loginId);
        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(loadWaitingCertificatesHasErrored(false));
                dispatch(loadWaitingCertificatesIsLoading(false));
                dispatch(loadWaitingCertificatesSuccess(response.data));

                // if (response.data.length > 0) {
                //     dispatch(updateSelectedOrder(response.data[0].OrderId));
                //     dispatch(waitingCertificatesFetchComments(clientId, response.data[0].OrderId, false));
                // }
                // else {
                //     const tempOrderId = "21096";
                //     dispatch(updateSelectedOrder(tempOrderId));
                //     dispatch(waitingCertificatesFetchComments(clientId, tempOrderId, false));
                // }
            })
            .catch(() => {
                dispatch(loadWaitingCertificatesHasErrored(true));
                dispatch(loadWaitingCertificatesIsLoading(false));
            });
    };
}

export function waitingCertificatesCommentsIsLoading(isLoading: boolean) {
    return {
        type: WAITING_CERTIFICATES_COMMENTS_IS_LOADING,
        isLoading
    };
}

export function waitingCertificatesCommentsLoadingHasErrored(hasErrored: boolean) {
    return {
        type: WAITING_CERTIFICATES_COMMENTS_LOADING_ERRORED,
        hasErrored
    };
}

export function waitingCertificatesCommentsSuccess(comments: IWaitingCertificatesCommentsModel[]) {
    return {
        type: WAITING_CERTIFICATES_COMMENTS_LOADING_SUCCESS,
        comments
    };
}

export function waitingCertificatesSelectedOrder(selectedOrder: IChaseableOrder) {
    return {
        type: WAITING_CERTIFICATES_SELECTED_ORDER,
        selectedOrder
    };
}

export function updateSelectedOrder(selectedOrder: IChaseableOrder) {
    return (dispatch) => {
        dispatch(waitingCertificatesSelectedOrder(selectedOrder));
    };
}

export function waitingCertificatesFetchComments(clientId: string, orderId: string, isRefresh: boolean) {
    return (dispatch) => {
        dispatch(postCommentHasErrored(false));
        dispatch(postAnswerHasErrored(false));
        dispatch(questionFileUploadSuccess([]));
        dispatch(updateSelectedQuestion(initialSelectedQuestion));
        dispatch(questionFileUploadHasErrored(false));
        dispatch(questionFileUploadInProgress(false));
        dispatch(postAnswerHasErrored(false));
        dispatch(postAnswerInProgress(false));
        dispatch(postCommentHasErrored(false));
        dispatch(postCommentInProgress(false));

        if (!isRefresh) {
            dispatch(waitingCertificatesCommentsIsLoading(true));
            dispatch(waitingCertificatesCommentsSuccess([]));
        }

        // added temporarily
        // orderId = "21096";

        const url = waitingCertificatesCommentsApi.replace("#orderId#", orderId);

        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(waitingCertificatesCommentsIsLoading(false));
                dispatch(waitingCertificatesCommentsLoadingHasErrored(false));
                dispatch(waitingCertificatesCommentsSuccess(response.data));
            })
            .catch((e) => {
                dispatch(waitingCertificatesCommentsLoadingHasErrored(true));
                dispatch(waitingCertificatesCommentsIsLoading(false));
            });
    };
}

export function postCommentInProgress(inProgress: boolean) {
    return {
        type: WAITING_CERTIFICATES_COMMENT_POST_IN_PROGRESS,
        inProgress
    };
}

export function postCommentHasErrored(hasErrored: boolean) {
    return {
        type: WAITING_CERTIFICATES_COMMENT_POST_HAS_ERRORED,
        hasErrored
    };
}

export function postCommentSuccess(isSuccess: boolean) {

    return {
        type: WAITING_CERTIFICATES_COMMENT_POST_SUCCESS,
        isSuccess
    };
}

export function postComment(newComment: INewCommentRequest, clientId: string) {
    return (dispatch) => {
        dispatch(postCommentInProgress(true));

        axios({
            method: "POST",
            url: waitingCertificatesPostCommentApi,
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
                dispatch(waitingCertificatesFetchComments(clientId, newComment.OrderId, true));
            })
            .catch(() => {
                dispatch(postCommentHasErrored(true));
                dispatch(postCommentInProgress(false));
                dispatch(postCommentSuccess(false));
            });
    };
}

export function postAnswerInProgress(inProgress: boolean) {
    return {
        type: WAITING_CERTIFICATES_ANSWER_IN_PROGRESS,
        inProgress
    };
}

export function postAnswerHasErrored(hasErrored: boolean) {
    return {
        type: WAITING_CERTIFICATES_ANSWER_HAS_ERRORED,
        hasErrored
    };
}

export function postAnswerSuccess(isSuccess: boolean) {

    return {
        type: WAITING_CERTIFICATES_ANSWER_SUCCESS,
        isSuccess
    };
}

export function postAnswer(answerRequest: IAnswerRequest, loginId: string, orderId: string, clientId: string) {
    return (dispatch) => {
        dispatch(postAnswerInProgress(true));

        axios({
            method: "POST",
            url: waitingCertificatesPostAnswerApi.replace("#loginId#", loginId),
            data: answerRequest,
            headers: {
                "api-version": 2,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(postAnswerInProgress(false));
                dispatch(postAnswerHasErrored(false));
                dispatch(postAnswerSuccess(true));
                dispatch(waitingCertificatesFetchComments(clientId, orderId, true));
            })
            .catch(() => {
                dispatch(postAnswerHasErrored(true));
                dispatch(postAnswerInProgress(false));
                dispatch(postAnswerSuccess(false));
            });
    };
}

export function waitingCertificatesSelectQuestion(selectedQuestion: IQuestion) {
    return {
        type: WAITING_CERTIFICATES_ANSWERING_QUESTION,
        selectedQuestion
    };
}

export function updateSelectedQuestion(selectedQuestion: IQuestion) {
    return (dispatch) => {
        dispatch(waitingCertificatesSelectQuestion(selectedQuestion));
    };
}

export function selectComment(selectedComment: ISelectedCommentModel) {
    return {
        type: WAITING_CERTIFICATES_SELECTED_COMMENT,
        selectedComment
    };
}

export function updateSelectedComment(selectedComment: ISelectedCommentModel) {
    return (dispatch) => {
        dispatch(selectComment(selectedComment));
    };
}

export function chasingInProgress(inProgress: boolean) {
    return {
        type: WAITING_CERTIFICATES_CHASING_IN_PROGRESS,
        inProgress
    };
}

export function chasingHasErrored(hasErrored: boolean) {
    return {
        type: WAITING_CERTIFICATES_CHASING_ERRORED,
        hasErrored
    };
}

export function chasingSuccess(orders: IChasedOrder[]) {
    return {
        type: WAITING_CERTIFICATES_CHASING_SUCCESS,
        chasedOrders: orders
    };
}

export function chaseOrder(chaseRequest: IChaseRequest, clientId: string) {
    return (dispatch, getState) => {
        dispatch(chasingInProgress(true));

        axios({
            method: "POST",
            url: waitingCertificatesChaseOrderApi,
            data: chaseRequest,
            headers: {
                "api-version": 2,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(chasingInProgress(false));
                dispatch(chasingHasErrored(false));

                let prevChasedOrders: IChasedOrder[] = [...getState().chasedOrders];
                // let prevChasedOrders: IChasedOrder[] = getState().chasedOrders;

                const newChasedOrder: IChasedOrder = {
                    OrderId: chaseRequest.OrderId,
                    PencilOrderId: chaseRequest.PencilOrderId
                };

                prevChasedOrders.push(newChasedOrder);

                dispatch(chasingSuccess(prevChasedOrders));

                if (!isUk()) {
                    dispatch(waitingCertificatesFetchComments(chaseRequest.LoginId, chaseRequest.OrderId, false));
                }
            })
            .catch((e) => {
                dispatch(chasingInProgress(false));
                dispatch(chasingHasErrored(true));

            });
    };
}

export function questionFileUploadInProgress(inProgress: boolean) {
    return {
        type: QUESTION_UPLOAD_FILE_IN_PROGRESS,
        inProgress
    };
}

export function questionFileUploadHasErrored(hasErrored: boolean) {
    return {
        type: QUESTION_UPLOAD_FILE_ERRORED,
        hasErrored
    };
}

export function questionFileUploadSuccess(questionAttachments: IQuestionAttachment[]) {
    return {
        type: QUESTION_UPLOAD_FILE_SUCCESS,
        questionAttachments
    };
}

export function questionUploadFileToServer(formData: FormData, questionId: string, fileName: string) {
    return (dispatch, getState) => {
        dispatch(questionFileUploadInProgress(true));
        dispatch(questionFileUploadHasErrored(false));
        axios({
            method: "POST",
            url: waitingCertificatesQuestionsFileUploadApi.replace("#questionId#", questionId),
            data: formData,
            headers: {
                "api-version": 2,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(questionFileUploadInProgress(false));
                dispatch(questionFileUploadHasErrored(false));

                let attachments: IQuestionAttachment[] = [...getState().questionAttachments];
                const newAttachment: IQuestionAttachment = {
                    QuestionId: questionId,
                    AttachmentId: response.data.AttachmentId,
                    FileName: fileName
                };

                attachments.push(newAttachment);

                dispatch(questionFileUploadSuccess(attachments));
            })
            .catch((e) => {
                console.log("Error while file upload:", e);
                dispatch(questionFileUploadHasErrored(true));
                dispatch(questionFileUploadInProgress(false));
            });
    };
}