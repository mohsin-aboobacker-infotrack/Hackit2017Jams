import axios from 'axios';

import { callBackRequestApi, matterOrdersApi, mattersApi, userDetailApi } from '../../App/api-endpoints';
import {
    CALL_BACK_REQUEST_POST_ERRORED,
    CALL_BACK_REQUEST_POST_IN_PROGRESS,
    CALL_BACK_REQUEST_POST_SUCCESS,
    MATTER_ORDERS_IS_LOADING,
    MATTER_ORDERS_LOADING_ERRORED,
    MATTER_ORDERS_LOADING_SUCCESS,
    MATTERS_ISLOADING,
    MATTERS_LOADING_ERRORED,
    MATTERS_LOADING_SUCCESS,
    SET_CARE_ID,
    USER_DETAILS_IS_LOADING,
    USER_DETAILS_LOADING_ERRORED,
    USER_DETAILS_LOADING_SUCCESS,
} from '../ActionTypes/ask-helpdesk-action-types';
import { USER_DETAIL_UPDATE } from '../ActionTypes/ask-helpdesk-action-types';
import { IAskHelpDesk } from '../Models/ask-helpdesk-form-model';
import { IOrder } from '../Models/orders-model';
import { ISelectModel } from '../Models/react-select-model';
import { IUserDetail } from '../Models/user-detail-model';

export function loadUserDetailsIsLoading(isLoading: boolean) {
    return {
        type: USER_DETAILS_IS_LOADING,
        isLoading
    };
}

export function loadUserDetailsHasErrored(hasErrored: boolean) {
    return {
        type: USER_DETAILS_LOADING_ERRORED,
        hasErrored
    };
}

export function loadUserDetailsSuccess(userDetail: IUserDetail) {
    return {
        type: USER_DETAILS_LOADING_SUCCESS,
        userDetail
    };
}

export function updateUserDetailSuccess(userDetail: IUserDetail) {
    return {
        type: USER_DETAIL_UPDATE,
        userDetail
    };
}

export function updateUserDetail(userDetail: IUserDetail) {
    return (dispatch) => {
        dispatch(updateUserDetailSuccess(userDetail));
    };
}

const apiConfig = {
    headers: { "api-version": 2 }
};

export function userDetailsFetch(loginId: string) {
    return (dispatch) => {
        dispatch(callBackRequestErrored(false));
        dispatch(loadUserDetailsIsLoading(true));

        const url = `${userDetailApi}${loginId}`;
        // axios.defaults.headers.common["api-version"] = "2";
        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }
                // console.log(response.data);
                dispatch(loadUserDetailsIsLoading(false));
                dispatch(loadUserDetailsHasErrored(false));
                dispatch(loadUserDetailsSuccess(response.data));
            })
            .catch((e) => {
                dispatch(loadUserDetailsHasErrored(true));
                dispatch(loadUserDetailsIsLoading(false));
            });
    };
}

export function loadMattersIsLoading(isLoading: boolean) {
    return {
        type: MATTERS_ISLOADING,
        isLoading
    };
}

export function loadMattersHasErrored(hasErrored: boolean) {
    return {
        type: MATTERS_LOADING_ERRORED,
        hasErrored
    };
}

export function loadMattersSuccess(matters: any) {
    return {
        type: MATTERS_LOADING_SUCCESS,
        matters: mapMatters(matters)
    };
}

function mapMatters(matters: any) {
    let formattedMatters: ISelectModel[] = [];

    matters.map((item, index) => {
        const formattedMatter = {
            value: item.trim(),
            label: item.trim()
        };

        formattedMatters.push(formattedMatter);
    });

    return formattedMatters;
}

export function mattersFetch(loginId: string, matterReference: string) {
    return (dispatch) => {
        dispatch(loadMattersIsLoading(true));

        const url = `${mattersApi}?id=${loginId}`;
        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {

                    throw Error(response.statusText);
                }

                dispatch(loadMattersIsLoading(false));
                dispatch(loadMattersHasErrored(false));

                // splicing coz test has so much rubbish matters
                if (process.env.NODE_ENV === "dev") {
                    dispatch(loadMattersSuccess(response.data));
                } else {
                    dispatch(loadMattersSuccess(response.data));
                }
                // return mapMatters(response.data);
            })
            .catch(() => {
                dispatch(loadMattersHasErrored(true));
                dispatch(loadMattersIsLoading(false));
            });
    };
}

export function loadMatterOrdersIsLoading(isLoading: boolean) {
    return {
        type: MATTER_ORDERS_IS_LOADING,
        isLoading
    };
}

export function loadMatterOrdersHasErrored(hasErrored: boolean) {
    return {
        type: MATTER_ORDERS_LOADING_ERRORED,
        hasErrored
    };
}

export function loadMatterOrdersSuccess(orders: IOrder[]) {
    return {
        type: MATTER_ORDERS_LOADING_SUCCESS,
        orders: mapMatterOrders(orders)
    };
}

function mapMatterOrders(orders: IOrder[]) {
    let formattedMatterOrders: ISelectModel[] = [];

    orders.map((item, index) => {
        const formattedOrder: ISelectModel = {
            value: item.Id,
            label: item.Description
        };

        formattedMatterOrders.push(formattedOrder);
    });

    return formattedMatterOrders;
}

export function matterOrdersFetch(clientId: string, matterReference: string) {
    return (dispatch) => {
        dispatch(loadMatterOrdersIsLoading(true));

        const url = `${matterOrdersApi}?clientId=${clientId}&matterReference=${matterReference}`;
        axios.get(url, apiConfig)
            .then((response) => {
                if (response.statusText !== "OK") {
                    throw Error(response.statusText);
                }

                dispatch(loadMatterOrdersIsLoading(false));
                dispatch(loadMatterOrdersHasErrored(false));
                dispatch(loadMatterOrdersSuccess(response.data));
            })
            .catch(() => {
                dispatch(loadMatterOrdersIsLoading(false));
                dispatch(loadMatterOrdersHasErrored(true));
            });
    };
}

export function callBackRequestInProgress(inProgress: boolean) {
    return {
        type: CALL_BACK_REQUEST_POST_IN_PROGRESS,
        inProgress
    };
}

export function callBackRequestErrored(hasErrored: boolean) {
    return {
        type: CALL_BACK_REQUEST_POST_ERRORED,
        hasErrored
    };
}

export function callBackRequestSuccess(isSuccess: boolean) {
    return {
        type: CALL_BACK_REQUEST_POST_SUCCESS,
        isSuccess
    };
}

export function setCareId(careId: string) {
    return {
        type: SET_CARE_ID,
        careId
    };
}

export function resetCareId() {
    return (dispatch) => {
        dispatch(setCareId("0"));
    };
}

export function postCallBackRequest(callBackRequest: IAskHelpDesk) {
    return (dispatch) => {
        dispatch(callBackRequestInProgress(true));

        axios({
            method: "POST",
            url: callBackRequestApi,
            data: callBackRequest,
            headers: {
                "api-version": 2,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.statusText !== "OK") {
                    dispatch(callBackRequestInProgress(false));
                    throw Error(response.statusText);
                }

                dispatch(callBackRequestInProgress(false));
                dispatch(callBackRequestErrored(false));
                dispatch(callBackRequestSuccess(true));
                dispatch(setCareId(response.data.Item2));
            })
            .catch((e) => {
                dispatch(callBackRequestErrored(true));
            });
    };
}