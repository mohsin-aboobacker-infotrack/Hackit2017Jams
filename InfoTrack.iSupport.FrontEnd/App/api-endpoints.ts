let apiDomain: string;

if (process.env.NODE_ENV === "dev") {
    apiDomain = "https://testdeliverysystems.infotrack.com.au/WeCare.Api/api/isupport/";
} else if (process.env.NODE_ENV === "stage") {
    apiDomain = "https://stagedeliverysystems.infotrack.com.au/WeCare.Api/api/isupport/";
} else if (process.env.NODE_ENV === "prod") {
    apiDomain = "https://deliverysystems.infotrack.com.au/WeCare.Api/api/isupport/";
} else if (process.env.NODE_ENV === "devuk") {
    apiDomain = "https://testdeliverysystems.infotrack.co.uk/WeCare.Api/api/isupport/";
} else if (process.env.NODE_ENV === "stageuk") {
    apiDomain = "https://stagedeliverysystems.infotrack.co.uk/WeCare.Api/api/isupport/";
} else {
    apiDomain = "https://deliverysystems.infotrack.co.uk/WeCare.Api/api/isupport/";
}

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "stage" || process.env.NODE_ENV === "devuk" || process.env.NODE_ENV === "stageuk") {
    console.log(process.env.NODE_ENV);
}

export const userDetailApi = `${apiDomain}LoginUserDetails/`;
export const mattersApi = `${apiDomain}messages/matterNames`;
export const matterOrdersApi = `${apiDomain}messages/ordersForMatter`;
export const callBackRequestApi = `${apiDomain}messages/incidents`;

export const supportRequestsCaresApi = `${apiDomain}clients/#clientId#/incidents`;
export const supportRequestsCommentsApi = `${apiDomain}incidents/#careId#`;
export const supportRequestsNewCommentApi = `${apiDomain}messages/incidents/#careId#/comments`;

export const waitingCertificatesMattersApi = `${apiDomain}messages/matterSummary?clientId=#clientId#`;
export const waitingCertificatesChaseableOrdersApi = `${apiDomain}chase/chaseableOrders?clientId=#clientId#&loginId=#loginId#`;
export const waitingCertificatesCommentsApi = `${apiDomain}chase/comments?orderId=#orderId#`;
export const waitingCertificatesPostCommentApi = `${apiDomain}chase/PostChaseComment`;
export const waitingCertificatesChaseOrderApi = `${apiDomain}chase/chaseRequest`;
export const waitingCertificatesPostAnswerApi = `${apiDomain}chase/#loginId#/PostAnswer`;
export const waitingCertificatesQuestionsFileUploadApi = `${apiDomain}chase/question/#questionId#/attachment`;
// export const userDetailApi = `${apiDomain}userDetail/`;