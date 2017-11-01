import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    selectedTab: string;
}

export class ISupportTab extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="container-fluid no-gutter">
                <div className="row blue-tab-bg">
                    <Link className={this.props.selectedTab === "waitingCertificates" ? "active-link" : "inactive-tab"} to="/isupport" >
                        <div className={`col-xs-2 ${this.props.selectedTab === "waitingCertificates" ? "active-tab" : "inactive-tab"}`}>
                            Waiting Certificates
                        </div>
                    </Link>
                    <Link className={this.props.selectedTab === "supportRequests" ? "active-link" : "inactive-tab"} to="/isupport/SupportRequests">
                        <div className={`col-xs-2 ${this.props.selectedTab === "supportRequests" ? "active-tab" : "inactive-tab"}`}>
                            Support Requests
                        </div>
                    </Link>
                    <div className="col-xs-20"></div>
                </div>
            </div>
        );
    }
}