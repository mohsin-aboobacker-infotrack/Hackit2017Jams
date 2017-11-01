import { IHttpContext } from '../../Models/CommonModels/IHttpContext';
import * as React from 'react';
import { ActionCreator } from 'redux';
import { ISupportRequestsCommentsModel } from '../../Models/support-requests-comments-model';
import { supportRequestsFetchCareComments, postComment } from '../../Actions/support-request-actions';
import { connect } from 'react-redux';
import { Col, Container, Grid, ListItem, Row, Spinner, TextInput, Button, Section, SectionHeader } from 'infotrack-ui/lib';
import MessageHistoryComment from '../Common/message-history-comments';
import { INewCommentModel } from '../../Models/support-request-new-comment-model';
import { Scrollbars } from 'react-custom-scrollbars';
const moment = require("moment");

interface IProps {
    commentsFetch: ActionCreator<any>;
    commentsIsLoading: boolean;
    commentsHasErrored: boolean;
    comments: ISupportRequestsCommentsModel;
    selectedCareId: string;
    newCommentInProgress: boolean;
    newCommentHasErrored: boolean;
    newCommentSuccess: boolean;
    postNewComment: ActionCreator<any>;
    httpContext: IHttpContext;
}

interface IState {
    comment: string;
}

class SupportRequestsMessageHistory extends React.Component<IProps, IState> {

    constructor() {
        super();

        this.state = {
            comment: ""
        };
    }

    public render() {
        if (this.props.selectedCareId === "0") { return <div />; }
        return (
            <div>
                <Section header={<SectionHeader title="Message History" />}>
                    {this.renderCareDetails()}
                    {this.renderHeader()}

                    <Scrollbars
                        className="scrollable-comments"
                        style={{ 'height': 'calc(100vh - 540px)' }}
                        autoHide>
                        {this.props.comments.Notes.length === 0 && !this.props.commentsIsLoading && !this.props.newCommentInProgress && <div className="no-message-box">No messages found.</div>}
                        {this.renderDetails(this.props.comments)}
                        {/* <div>
                        {(this.props.commentsIsLoading || this.props.newCommentInProgress) && <Spinner mini className="padded-spinner" center />}
                    </div> */}
                    </Scrollbars>


                    {this.renderNewCommentBox()}
                </Section>

            </div>
        );
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
                    <p><b>Incident Number:</b> {this.props.selectedCareId} </p>
                </ListItem>
            </div>
        )
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

    private renderNewCommentBox() {
        return (
            <div>
                <textarea style={{ width: "100%", height: "100px", margin: "5px" }} value={this.state.comment} onChange={this.handleChange.bind(this)} placeholder="Type a comment or message here..."></textarea>
                <Button className="button-full-width" warn primary onClick={() => { this.postComment(); }}>SEND</Button>
            </div>
        );
    }

    private handleChange(e) {
        this.setState({ comment: e.target.value });
    }
    private postComment() {
        if (this.state.comment.trim() !== "") {
            const comment: INewCommentModel = {
                AddedBy: this.props.httpContext.username,
                DateCreated: moment().format(),
                Text: this.state.comment
            };

            this.props.postNewComment(comment, this.props.selectedCareId);
            this.setState({
                comment: ""
            });
        }
    }

    private renderDetails(comments: ISupportRequestsCommentsModel) {
        return comments.Notes.map((note, index) => {
            return (
                <div key={index} className="">
                    <MessageHistoryComment comment={note.Details} isClient={note.AddedByClient} dateCreated={moment(note.DateCreated).calendar()} />
                </div>
            );
        });
    }
}

const mapStateToProps = (state) => {
    return {
        commentsIsLoading: state.supportRequestsCareCommentsIsLoading,
        commentsHasErrored: state.supportRequestsCaresCommentsHasErrored,
        comments: state.supportRequestsCareComments,
        newCommentInProgress: state.supportRequestsNewCommentInProgress,
        newCommentHasErrored: state.supportRequestsNewCommentHasErrored,
        newCommentSuccess: state.supportRequestsNewCommentSuccess,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentsFetch: (careId: string) => dispatch(supportRequestsFetchCareComments(careId)),
        postNewComment: (comment: INewCommentModel, careId: string) => dispatch(postComment(comment, careId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportRequestsMessageHistory);