import * as React from 'react';
import { Button, StatusIndicator, Spinner } from 'infotrack-ui/lib';
import { IQuestion, ISelectedCommentModel } from '../../../Models/waiting-certificates-comments-model';
import { IHttpContext } from '../../../Models/CommonModels/IHttpContext';
import { ActionCreator } from 'redux';
import { IQuestionAttachment } from '../../../Models/WaitingCertificateModels/question-attachments';
import { IAnswerRequest } from '../../../Models/waiting-certificates-answer-request';
import { postAnswer, questionUploadFileToServer, updateSelectedQuestion, updateSelectedComment } from '../../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { initialSelectedCommentModel, initialSelectedQuestion } from '../../../Reducers/inital-states';

const moment = require("moment");

interface IProps {
    selectedQuestion: IQuestion;
    httpContext: IHttpContext;
    postAnswerInProgress: boolean;
    postAnswerHasErrored: boolean;
    questionAttachments: IQuestionAttachment[];
    uploadInProgress: boolean;
    uploadHasErrored: boolean;
    selectedComment: ISelectedCommentModel;
    selectQuestion: ActionCreator<any>;
    selectComment: ActionCreator<any>;
    uploadFile: ActionCreator<any>;
    postAnswer: ActionCreator<any>;
}

interface IState {
    answer: string;
}

class AnswerBox extends React.Component<IProps, IState> {
    constructor() {
        super();

        this.state = {
            answer: ""
        };
    }

    public render() {
        return (
            <div>
                <div className="answer-inline-div">
                    <span className="comment-question">{this.props.selectedQuestion.Question}</span>
                    <span style={{ float: "right" }}>
                        <i className="fa fa-times-circle-o fa-2" onClick={() => { this.handleCancel(); }} />
                    </span>

                    {this.props.selectedQuestion.PlanRequested && this.renderUploads()}
                </div>
                <textarea style={{ width: "100%", height: "100px" }} value={this.state.answer} onChange={this.handleChange.bind(this)} placeholder="Type your answer here..."></textarea>
                <Button disabled={this.props.postAnswerInProgress} className="button-full-width" warn primary onClick={() => { this.handleSubmit.bind(this); }}>RESPOND </Button>
            </div >
        );
    }

    private handleCancel() {
        this.props.selectQuestion(initialSelectedQuestion);
        this.props.selectComment(initialSelectedCommentModel);
    }

    private handleChange(e) {
        this.setState({ answer: e.target.value });
    }

    private handleSubmit() {
        let answerRequest: IAnswerRequest = {
            Answer: this.state.answer,
            AnswerDateTime: moment().format(),
            AnsweredBy: this.props.httpContext.username,
            Attachments: [],
            CommentId: this.props.selectedComment.CommentId,
            QuestionId: this.props.selectedQuestion.QuestionId
        };

        this.props.postAnswer(answerRequest, this.props.httpContext.loginId, this.props.selectedComment.OrderId, this.props.httpContext.clientId);
    }

    private onFileUpload(e) {
        const filePath: string = e.target.value;
        const files = e.target.files;

        let formData = new FormData();
        formData.append("file", files[0]);
        const fileName: string = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
        this.props.uploadFile(formData, this.props.selectedQuestion.QuestionId, fileName);
    }

    private renderUploads() {
        return (
            <div style={{ padding: "10px" }}>
                {this.props.uploadHasErrored && <StatusIndicator size="lg" red text="File upload failed." />}

                <a href="#" onClick={this.openFileUpload.bind(this)} >Upload File</a>
                <input ref={input => this.inputElement = input} type="file" style={{ display: "none" }} onChange={this.onFileUpload.bind(this)} />
                {this.props.uploadInProgress && <Spinner mini />}
                <span style={{ float: "right" }}><a href="#" onClick={(e) => { e.preventDefault(); }}>InfoTrack Plan</a></span>
                {this.props.selectedQuestion.Attachments.length + this.props.questionAttachments.length > 0 && <div style={{ fontWeight: 600, paddingTop: "5px" }}>Uploaded Files:</div>}
                {this.renderUploadedFiles()}
            </div>
        );
    }

    private inputElement;

    private openFileUpload(e) {
        e.preventDefault();
        this.inputElement.click();
    }

    private renderUploadedFiles() {
        return (
            <div>
                {this.renderNewAttachedFiles()}
                {this.renderOldAttachedFiles()}
            </div>
        );

    }

    private renderOldAttachedFiles() {
        return this.props.selectedQuestion.Attachments.map((attachment, index) => {
            return (
                <div key={attachment.AttachmentId}>
                    {attachment.AttachmentFileName}
                </div>
            );
        });
    }

    private renderNewAttachedFiles() {
        return this.props.questionAttachments.map((attachment, index) => {
            if (attachment.QuestionId === this.props.selectedQuestion.QuestionId) {
                return (
                    <div key={attachment.AttachmentId}>
                        {attachment.FileName}
                    </div>
                );
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        selectedQuestion: state.selectedQuestion,
        httpContext: state.httpContext,
        questionAttachments: state.questionAttachments,
        uploadInProgress: state.uploadInProgress,
        uploadHasErrored: state.uploadHasErrored,
        postAnswerInProgress: state.postAnswerInProgress,
        postAnswerHasErrored: state.postAnswerHasErrored,
        selectedComment: state.selectedComment
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectQuestion: (question: IQuestion) => dispatch(updateSelectedQuestion(question)),
        selectComment: (comment: ISelectedCommentModel) => dispatch(updateSelectedComment(comment)),
        postAnswer: (answerRequest: IAnswerRequest, loginId: string, orderId: string, clientId: string) => dispatch(postAnswer(answerRequest, loginId, orderId, clientId)),
        uploadFile: (formData: FormData, questionId: string, fileName: string) => dispatch(questionUploadFileToServer(formData, questionId, fileName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerBox);