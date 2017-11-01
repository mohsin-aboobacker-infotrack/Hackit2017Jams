import axios from 'axios';
import { LOAD_HTTP_CONTEXT } from '../ActionTypes/httpcontext-action-types';
import { IHttpContext } from '../Models/CommonModels/IHttpContext';

export function updateHttpContext(httpContext: IHttpContext) {
    return {
        type: LOAD_HTTP_CONTEXT,
        httpContext
    };
}

export function loadHttpContext() {
    return (dispatch) => {
        const url = window.location.origin + "/iSupport/Api/Context";

        const apiConfig = {
            headers: { "Content-Type": "application/json" }
        };

        axios.get(url)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(updateHttpContext(response.data));
            })
            .catch((e) => {
                // tslint:disable-next-line:no-console
                console.log("Failed to load context: " + e);
            });
    };
}