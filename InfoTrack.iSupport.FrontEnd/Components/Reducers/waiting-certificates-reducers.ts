import { IChasedOrder } from '../Models/WaitingCertificateModels/chased-orders';
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
import { IChaseableOrder } from '../Models/waiting-certificates-chaseableorders';
import { IWaitingCertificatesCommentsModel, IQuestion, ISelectedCommentModel } from '../Models/waiting-certificates-comments-model';
import { initialChasedOrderState, initialSelectedQuestion, initialSelectedCommentModel } from './inital-states';
import { IQuestionAttachment } from '../Models/WaitingCertificateModels/question-attachments';
import { QUESTION_UPLOAD_FILE_SUCCESS, QUESTION_UPLOAD_FILE_IN_PROGRESS, QUESTION_UPLOAD_FILE_ERRORED } from '../ActionTypes/waiting-certificates-action-types';

export function waitingCertificatesMattersIsLoading(state: boolean = false, action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_MATTERS_IN_PROGRESS) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function waitingCertificatesMattersLoadingHasErrored(state: boolean = false, action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_MATTERS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function waitingCertificatesMatters(state: IWaitingCertificatesMatters[] = [], action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_MATTERS_SUCCESS) {
        return action.matters;
    } else {
        return state;
    }
}

export function selectedMatterReference(state: string = "", action) {
    if (action.type === WAITING_CERTIFICATES_SELECTED_MATTER) {
        return action.selectedMatterReference;
    } else {
        return state;
    }
}

export function waitingCertificatesChaseableOrdersIsLoading(state: boolean = false, action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_IN_PROGRESS) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function waitingCertificatesChaseableOrdersLoadingHasErrored(state: boolean = false, action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function waitingCertificatesSelectedOrder(state: IChaseableOrder = initialChasedOrderState, action) {
    if (action.type === WAITING_CERTIFICATES_SELECTED_ORDER) {
        return action.selectedOrder;
    } else {
        return state;
    }
}

export function waitingCertificatesChaseableOrders(state: IChaseableOrder[] = [], action) {
    if (action.type === LOAD_WAITING_CERTIFICATES_SUCCESS) {
        return action.chaseableOrders;
    } else {
        return state;
    }
}

export function waitingCertificatesCommentsIsLoading(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_COMMENTS_IS_LOADING) {
        return action.isLoading;
    } else {
        return state;
    }
}

export function waitingCertificatesCommentsHasErrored(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_COMMENTS_LOADING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function waitingCertificateComments(state: IWaitingCertificatesCommentsModel[] = [], action) {
    if (action.type === WAITING_CERTIFICATES_COMMENTS_LOADING_SUCCESS) {
        return action.comments;
    } else {
        return state;
    }
}

export function postCommentInProgress(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_COMMENT_POST_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function postCommentHasErrored(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_COMMENT_POST_HAS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function postCommentSuccess(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_COMMENT_POST_SUCCESS) {
        return action.isSuccess;
    } else {
        return state;
    }
}

export function postAnswerInProgress(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_ANSWER_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function postAnswerHasErrored(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_ANSWER_HAS_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function postAnswerSuccess(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_ANSWER_SUCCESS) {
        return action.isSuccess;
    } else {
        return state;
    }
}

export function selectedQuestion(state: IQuestion = initialSelectedQuestion, action) {
    if (action.type === WAITING_CERTIFICATES_ANSWERING_QUESTION) {
        return action.selectedQuestion;
    } else {
        return state;
    }
}

export function chasingInProgress(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_CHASING_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function chasingHasErrored(state: boolean = false, action) {
    if (action.type === WAITING_CERTIFICATES_CHASING_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function chasedOrders(state: IChasedOrder[] = [], action) {
    if (action.type === WAITING_CERTIFICATES_CHASING_SUCCESS) {
        return action.chasedOrders;
    } else {
        return state;
    }
}

export function uploadInProgress(state: boolean = false, action) {
    if (action.type === QUESTION_UPLOAD_FILE_IN_PROGRESS) {
        return action.inProgress;
    } else {
        return state;
    }
}

export function uploadHasErrored(state: boolean = false, action) {
    if (action.type === QUESTION_UPLOAD_FILE_ERRORED) {
        return action.hasErrored;
    } else {
        return state;
    }
}

export function questionAttachments(state: IQuestionAttachment[] = [], action) {
    if (action.type === QUESTION_UPLOAD_FILE_SUCCESS) {
        return action.questionAttachments;
    } else {
        return state;
    }
}

export function selectedComment(state: ISelectedCommentModel = initialSelectedCommentModel, action) {
    if (action.type === WAITING_CERTIFICATES_SELECTED_COMMENT) {
        return action.selectedComment;
    } else {
        return state;
    }
}