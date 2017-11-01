import * as React from 'react';

interface IProps {
    comment: any;
    dateCreated: any;
    isClient: any;
}

export default function MessageHistoryComment(props: IProps) {
    return (
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
    );
}