import { IQuestionAttachment } from '../../../Models/WaitingCertificateModels/question-attachments';
import * as React from 'react';
import { IQuestion, IWaitingCertificatesCommentsModel, ISelectedCommentModel } from '../../../Models/waiting-certificates-comments-model';
import { Button, Spinner, StatusIndicator } from 'infotrack-ui/lib';
import { ActionCreator } from 'redux';
import { updateSelectedQuestion, postAnswer, questionUploadFileToServer, updateSelectedComment } from '../../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { IAnswerRequest } from '../../../Models/waiting-certificates-answer-request';
import { IHttpContext } from '../../../Models/CommonModels/IHttpContext';
import { initialSelectedQuestion } from '../../../Reducers/inital-states';

const moment = require("moment");

interface IProps {
    Question: IQuestion;
    index: number;
    selectQuestion: ActionCreator<any>;
    selectedQuestion: IQuestion;
    Comment: IWaitingCertificatesCommentsModel;
    httpContext: IHttpContext;
    selectComment: ActionCreator<any>;
}

class CommentQuestion extends React.Component<IProps, {}> {
    public render() {
        return (
            <div>
                <div className="comment-question">
                    {this.props.index}: {decodeURI(this.props.Question.Question)}
                    <span style={{ float: "right" }}>
                        {!this.props.Question.Answered && this.props.selectedQuestion.QuestionId === "0" && <i className="fa fa-reply reply-icon" onClick={() => this.replyToAnswer()}></i>}
                    </span>
                </div>
            </div>
        );
    }

    private replyToAnswer() {
        this.props.selectQuestion(this.props.Question);

        const selectedComment: ISelectedCommentModel = {
            CommentId: this.props.Comment.Id.toString(),
            OrderId: this.props.Comment.OrderId.toString()
        };

        this.props.selectComment(selectedComment);
    }

    private renderAnswer(answer: string, answerDate: string) {
        return (
            <div>

                <div className="comment-answer">
                    <span style={{ fontWeight: 600 }}>Your answer: </span>
                    <span>{decodeURI(answer)}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedQuestion: state.selectedQuestion,
        httpContext: state.httpContext,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectQuestion: (question: IQuestion) => dispatch(updateSelectedQuestion(question)),
        selectComment: (comment: ISelectedCommentModel) => dispatch(updateSelectedComment(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentQuestion);