import { IHttpContext } from '../Models/CommonModels/IHttpContext';
import { LOAD_HTTP_CONTEXT } from '../ActionTypes/httpcontext-action-types';

const initialHttpContext: IHttpContext = {
    loginId: "",
    clientId: "",
    username: "",
    retailerId: ""
};

export function httpContext(state: IHttpContext = initialHttpContext, action) {
    if (action.type === LOAD_HTTP_CONTEXT) {
        return action.httpContext;
    } else {
        return state;
    }
}