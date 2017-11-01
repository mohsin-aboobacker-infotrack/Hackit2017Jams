import CommentQuestion from '../WaitingCertificates/Comments/comment-question';
import { IQuestion, IWaitingCertificatesCommentsModel } from '../../Models/waiting-certificates-comments-model';
import * as React from 'react';

interface IProps {
    comment: IWaitingCertificatesCommentsModel;
    dateCreated: string;
    isClient: boolean;
    Questions: IQuestion[];
}

export default class MessageHistoryWithQuestion extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="">
                <div className="clear-fix">
                    <div className={this.props.isClient === true ? "client-comment-box" : "helpdesk-comment-box"}>
                        {decodeURI(this.props.comment.Comment)}
                        {this.renderQuestions()}
                    </div>
                </div>
                <div className="clear-fix">

                    {!this.props.isClient && <span className="comment-date clear-fix">Replied {this.props.dateCreated}</span>}
                    {this.props.isClient && <div className="comment-date clear-fix">Sent {this.props.dateCreated}</div>}

                </div>
            </div>
        );
    }


    /*
            <div className="">
                <div className="clear-fix">
                    <div className={props.isClient === true ? "client-comment-box clear-fix" : "helpdesk-comment-box "}>
                        {props.comment}
                    </div>
                </div>
                <div className="clear-fix">
                    {!props.isClient && <span className="comment-date clear-fix" >Replied {props.dateCreated}</span>}
                    {props.isClient && <div className="comment-date clear-fix" >Sent {props.dateCreated}</div>}
                </div>
            </div>
    
    */


    private renderQuestions() {
        if (this.props.Questions === null) {
            return <div></div>;
        }
        return this.props.Questions.map((question, index) => {
            return (
                <div key={index}>
                    <CommentQuestion Comment={this.props.comment} Question={question} index={index + 1} />
                </div>
            );
        });
    }
}

// const mapStateToProps = (state) => {
//     return {
//         selectedQuestion: state.selectedQuestion
//     };
// };

// export default connect(mapStateToProps)(MessageHistoryWithQuestion);