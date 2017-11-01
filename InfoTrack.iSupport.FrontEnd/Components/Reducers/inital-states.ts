import { IQuestion, ISelectedCommentModel } from '../Models/waiting-certificates-comments-model';
import { ISupportRequestsCommentsModel } from '../Models/support-requests-comments-model';
import { IMatter } from '../Models/matters-model';
import { IOrder } from '../Models/orders-model';
import { ISelectModel } from '../Models/react-select-model';
import { IUserDetail } from '../Models/user-detail-model';
import { IChaseableOrder } from '../Models/waiting-certificates-chaseableorders';

export const initialUserDetail: IUserDetail = {
    name: "",
    email: "",
    phone: "",
};

export const initialOrder: IOrder = {
    Id: "0",
    Description: ""
};

export const initialMatter: IMatter = {
    label: "",
    value: ""
};

export const initialSelectState: ISelectModel = {
    label: "",
    value: ""
};

export const initialSupportRequestsCaresCommentsState: ISupportRequestsCommentsModel = {
    Notes: [],
    IncidentId: 0,
    ClientId: "",
    Description: "",
    Status: "",
    CreatedDateTime: "",
    ClientStaff: ""
};

export const initialSelectedQuestion: IQuestion = {
    Question: "",
    QuestionId: "0",
    PlanRequired: false,
    PlanRequested: false,
    ResponseTextRequired: false,
    Answer: "",
    DateTime: "",
    Answered: false,
    AnsweredBy: "",
    AnswerDateTime: "",
    CreatedAt: "",
    Attachments: []
};

export const initialChasedOrderState: IChaseableOrder = {
    AlreadyRequestedChase: false,
    CanChaseOrder: false,
    CertificateDescription: "",
    CouncilName: "",
    DateOrdered: "",
    EstimatedDeliveryTime: "",
    LotPlans: [],
    Matter: "",
    OrderId: "",
    PencilOrderId: "",
    ServiceManagerId: "",
    State: ""
};

export const initialSelectedCommentModel: ISelectedCommentModel = {
    CommentId: "0",
    OrderId: "0"
};