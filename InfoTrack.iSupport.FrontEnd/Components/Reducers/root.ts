import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { careId, orders, ordersHasErrored, ordersIsLoading } from './ask-helpdesk-reducer';
import { postCommentInProgress, uploadInProgress, uploadHasErrored, questionAttachments, selectedComment } from './waiting-certificates-reducers';
import {
    waitingCertificatesMattersIsLoading, waitingCertificatesMattersLoadingHasErrored,
    waitingCertificatesMatters, selectedMatterReference, waitingCertificatesChaseableOrdersIsLoading,
    waitingCertificatesChaseableOrdersLoadingHasErrored, waitingCertificatesChaseableOrders,
    waitingCertificatesSelectedOrder, waitingCertificatesCommentsIsLoading,
    waitingCertificatesCommentsHasErrored, waitingCertificateComments,
    postCommentHasErrored, postCommentSuccess, postAnswerInProgress, postAnswerHasErrored,
    postAnswerSuccess, selectedQuestion, chasedOrders, chasingInProgress, chasingHasErrored
} from './waiting-certificates-reducers';
import {
    supportRequestsCaresIsLoading, supportRequestsCaresHasErrored, supportRequestsCares,
    supportRequestsCareCommentsIsLoading, supportRequestsCaresCommentsHasErrored,
    supportRequestsCareComments, selectedCare, supportRequestsNewCommentInProgress,
    supportRequestsNewCommentHasErrored, supportRequestsNewCommentSuccess
} from './support-request-reducers';
import {
    callBackRequestErrored,
    callBackRequestInProgress,
    callBackRequestSuccess,
    matters,
    mattersHasErrored,
    mattersIsLoading,
    userDetail,
    userDetailHasErrored,
    userDetailIsLoading,
} from './ask-helpdesk-reducer';
import { httpContext } from './httpcontext-reducer';

export default combineReducers({
    routing: routerReducer,
    userDetailIsLoading, userDetailHasErrored, userDetail,
    mattersIsLoading, mattersHasErrored, matters,
    ordersIsLoading, ordersHasErrored, orders,
    callBackRequestInProgress, callBackRequestErrored, callBackRequestSuccess, careId,
    supportRequestsCaresIsLoading, supportRequestsCaresHasErrored, supportRequestsCares, selectedCare,
    supportRequestsCareCommentsIsLoading, supportRequestsCaresCommentsHasErrored, supportRequestsCareComments,
    supportRequestsNewCommentInProgress, supportRequestsNewCommentHasErrored, supportRequestsNewCommentSuccess,
    waitingCertificatesMattersIsLoading, waitingCertificatesMattersLoadingHasErrored, waitingCertificatesMatters,
    selectedMatterReference, waitingCertificatesSelectedOrder,
    waitingCertificatesChaseableOrdersIsLoading, waitingCertificatesChaseableOrdersLoadingHasErrored, waitingCertificatesChaseableOrders,
    waitingCertificatesCommentsIsLoading, waitingCertificatesCommentsHasErrored, waitingCertificateComments,
    postCommentInProgress, postCommentHasErrored, postCommentSuccess,
    postAnswerInProgress, postAnswerHasErrored, postAnswerSuccess,
    selectedQuestion, chasedOrders, chasingInProgress, chasingHasErrored,
    httpContext,
    uploadInProgress, uploadHasErrored, questionAttachments,
    selectedComment
});