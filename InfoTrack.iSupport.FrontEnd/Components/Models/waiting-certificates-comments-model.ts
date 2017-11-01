export interface IWaitingCertificatesCommentsModel {
    Date: string;
    From: string;
    Comment: string;
    IsClient: boolean;
    OrderId: number;
    DocumentId: string;
    Id: number;
    Questions: IQuestion[];
    Seen: boolean;
    Attachments: string[];
}

export interface IQuestion {
    QuestionId: string;
    Question: string;
    PlanRequired: boolean;
    PlanRequested: boolean;
    ResponseTextRequired: boolean;
    Answer: string;
    DateTime: string;
    Answered: boolean;
    AnsweredBy: string;
    AnswerDateTime: string;
    CreatedAt: string;
    Attachments: IAttachment[];
}

export interface ISelectedCommentModel {
    CommentId: string;
    OrderId: string;
}

interface IAttachment {
    AttachmentId: string;
    AttachmentFileName: string;
}