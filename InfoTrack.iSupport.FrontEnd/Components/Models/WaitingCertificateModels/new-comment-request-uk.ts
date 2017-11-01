export interface INewCommentRequest {
    OrderId: string;
    PencilOrderId: string;
    LoginId: string;
    From: string;
    IsClient?: boolean;
    ClientFacing?: boolean;
    ChaseComment: string;
    Date: string;
    Attachments?: IAttachment[];
}

interface IAttachment {
    AttachmentId: number;
    AttachmentFileName: string;
    AttachmentLocation: string;
}