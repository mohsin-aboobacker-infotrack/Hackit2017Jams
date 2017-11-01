export interface IAnswerRequest {
    Answer: string;
    AnsweredBy: string;
    CommentId: string;
    QuestionId: string;
    AnswerDateTime: string;
    Attachments: IAttachment[];
}

interface IAttachment {
    AttachmentId: string;
    AttachmentFileName: string;
    AttachmentLocation: string;
    Deleted: boolean;
}