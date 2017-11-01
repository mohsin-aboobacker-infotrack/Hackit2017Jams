import { isUk } from '../../../../App/common-helpers';
import { IChaseableOrder } from '../../../Models/waiting-certificates-chaseableorders';
import { INewCommentRequest } from '../../../Models/WaitingCertificateModels/new-comment-request-uk';
import * as React from 'react';
import { IWaitingCertificatesCommentsModel, IQuestion } from '../../../Models/waiting-certificates-comments-model';
import { ActionCreator } from 'redux';
import { waitingCertificatesFetchComments, postComment } from '../../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { ListItem, Grid, Row, Col, Spinner, Button, Section, SectionHeader, StatusIndicator } from 'infotrack-ui/lib';
import MessageHistoryWithQuestion from '../../Common/message-history-with-question';
import { IHttpContext } from '../../../Models/CommonModels/IHttpContext';
import { IChasedOrder } from '../../../Models/WaitingCertificateModels/chased-orders';
import { Scrollbars } from 'react-custom-scrollbars';
import AnswerBox from "./answer-box";

const moment = require("moment");

interface IProps {
    commentsIsLoading: boolean;
    commentsLoadHasErrored: boolean;
    selectedOrder: IChaseableOrder;
    comments: IWaitingCertificatesCommentsModel[];
    fetchComments: ActionCreator<any>;
    postComment: ActionCreator<any>;
    postCommentInProgress: boolean;
    postCommentHasErrored: boolean;
    postCommentSuccess: boolean;
    selectedQuestion: IQuestion;
    httpContext: IHttpContext;
    chasedOrders: IChasedOrder[];
}

interface IState {
    comment: string;
}

class SelectedOrderComment extends React.Component<IProps, IState> {

    constructor() {
        super();

        this.state = {
            comment: ""
        };
    }

    public render() {
        return (
            <div>

                {(this.props.commentsLoadHasErrored || this.props.postCommentHasErrored) && <StatusIndicator size="lg" red text="Oops! Something has went wrong. Please try again after some time." />}
                {this.renderCareDetails()}
                {this.renderHeader()}
                <Scrollbars
                    className={this.props.selectedQuestion.QuestionId === "0" ? "scrollable-comments" : "scrollable-comments-full"}
                    autoHide
                    style={{ height: 'calc(100vh - 530px)' }}>
                    {(this.props.commentsIsLoading) && <Spinner mini className="padded-spinner" center />}

                    {this.props.comments.length === 0 && !this.props.commentsIsLoading && !this.props.postCommentInProgress && <div className="no-message-box">No messages found.</div>}
                    {this.renderDetails(this.props.comments)}
                </Scrollbars>
                {this.canShowNewCommentBox() && this.renderNewCommentBox()}

                {this.props.selectedQuestion.QuestionId !== "0" && <AnswerBox />}
            </div>
        );
    }

    private canShowNewCommentBox() {
        // if (this.props.commentsIsLoading) {
        //     return false;
        // }

        if (isUk()) {
            if (this.props.selectedQuestion.QuestionId === "0") {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.props.selectedOrder.CanChaseOrder && !this.isChased()) {
                return false;
            } else {
                return true;
            }
        }

    }

    private isChased() {
        for (let order of this.props.chasedOrders) {
            if (order.OrderId === this.props.selectedOrder.OrderId || order.PencilOrderId === this.props.selectedOrder.PencilOrderId) {
                return true;
            }
        }
    }

    private renderCareDetails() {
        return (
            <div>
                <ListItem className="list-header">
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={24} >
                                Details
                    </Col>
                        </Row>
                    </Grid>
                </ListItem>
                <ListItem>
                    <p><b>Incident Number:</b> ##### </p>
                    <p><b>Order ID:</b> {this.props.selectedOrder.OrderId} </p >
                </ListItem>
            </div>
        );
    }

    private renderHeader() {
        return (
            <ListItem className="list-header">
                <Grid fluid>
                    <Row nogutter>
                        <Col xs={24} >
                            Updates & Comments
                        </Col>
                    </Row>
                </Grid>
            </ListItem>
        );
    }

    private renderDetails(comments: IWaitingCertificatesCommentsModel[]) {
        return comments.map((comment, index) => {
            return (
                <div key={index}>
                    <MessageHistoryWithQuestion comment={comment} isClient={comment.IsClient} dateCreated={moment(comment.Date).calendar()} Questions={comment.Questions} />
                </div>
            );
        });
    }

    private renderNewCommentBox() {
        return (
            <div>
                <textarea style={{ width: "100%", height: "100px" }} value={this.state.comment} onChange={this.handleChange.bind(this)} placeholder="Type a comment or message here..."></textarea>
                {/*isUk() && 
                    this.renderCommentFileUploadControl()*/
                }
                <Button disabled={this.props.postCommentInProgress} className="button-full-width" warn primary onClick={() => { this.postComment(); }}>SEND {/*this.props.postCommentInProgress && <i className="fa fa-spinner fa-spin"></i>*/}</Button>
            </div >
        );
    }

    private postComment() {
        if (this.state.comment.trim() !== "") {
            let newComment: INewCommentRequest = {
                Attachments: [],
                ChaseComment: this.state.comment,
                ClientFacing: true,
                From: this.props.httpContext.username,
                IsClient: true,
                LoginId: this.props.httpContext.loginId,
                OrderId: this.props.selectedOrder.OrderId,
                PencilOrderId: this.props.selectedOrder.PencilOrderId,
                Date: moment().format()
            };

            this.props.postComment(newComment, this.props.httpContext.clientId);
            this.setState({ comment: "" });
        }
    }

    private handleChange(e) {
        this.setState({ comment: e.target.value });
    }
}

const mapStateToProps = (state) => {
    return {
        commentsIsLoading: state.waitingCertificatesCommentsIsLoading,
        commentsLoadHasErrored: state.waitingCertificatesCommentsHasErrored,
        comments: state.waitingCertificateComments,
        selectedQuestion: state.selectedQuestion,
        postCommentInProgress: state.postCommentInProgress,
        postCommentHasErrored: state.postCommentHasErrored,
        postCommentSuccess: state.postCommentSuccess,
        selectedOrder: state.waitingCertificatesSelectedOrder,
        httpContext: state.httpContext,
        chasedOrders: state.chasedOrders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (clientId, orderId) => dispatch(waitingCertificatesFetchComments(clientId, orderId, false)),
        postComment: (newComment: INewCommentRequest, clientId: string) => dispatch(postComment(newComment, clientId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOrderComment);
