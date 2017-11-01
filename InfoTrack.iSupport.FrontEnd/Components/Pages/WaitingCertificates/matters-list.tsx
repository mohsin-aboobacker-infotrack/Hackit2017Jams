import * as React from 'react';
import { IWaitingCertificatesMatters } from '../../Models/waiting-certificates-matters-model';
import { ActionCreator } from 'redux';
import { fetchWaitingCertificatesMatters, fetchChaseableOrders, updateSelectedMatter } from '../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { StatusIndicator } from 'infotrack-ui';
import { List, ListItem, Grid, Row, Col, Spinner } from 'infotrack-ui/lib';
import { IHttpContext } from '../../Models/CommonModels/IHttpContext';
import axios from 'axios';

interface IProps {
    mattersIsLoading: boolean;
    mattersHasErrored: boolean;
    matters: IWaitingCertificatesMatters[];
    mattersFetch: ActionCreator<any>;
    selectMatter: ActionCreator<any>;
    chaseableOrdersFetch: ActionCreator<any>;
    selectedMatter: string;
    httpContext: IHttpContext;
}

class WaitingCertificatesMatters extends React.Component<IProps, {}> {

    public componentDidMount() {
        if (this.props.httpContext.clientId === "") {
            const url = window.location.origin + "/iSupport/Api/Context";
            axios.get(url)
                .then((response) => {
                    if (response.statusText !== "OK") {
                        throw (Error(response.statusText));
                    }

                    this.props.mattersFetch(response.data.clientId);
                })
                // tslint:disable-next-line:no-console
                .catch((e) => console.log(e));
        } else {
            this.props.mattersFetch(this.props.httpContext.clientId);
        }
    }

    public render() {
        return (
            <div>
                {this.props.mattersHasErrored && <StatusIndicator size="lg" red text="Oops! Something has went wrong. Please try again after some time." />}

                <List>
                    {this.renderHeader()}
                    {this.props.matters.length === 0 && !this.props.mattersIsLoading && <div className="no-message-box">No matters found.</div>}
                    {this.props.mattersIsLoading && <Spinner className="padded-spinner" center />}

                    <div className="scrollable-matters">
                        {this.renderDetails(this.props.matters)}
                    </div>

                </List>
            </div>
        );
    }

    private renderHeader() {
        return (
            <ListItem className="list-header">
                <Grid fluid>
                    <Row nogutter>
                        <Col xs={20}>
                            REFERENCE
                        </Col>
                        <Col xs={4}>
                            PENDING
                        </Col>
                    </Row>
                </Grid>
            </ListItem>
        );
    }

    private renderDetails(matters: IWaitingCertificatesMatters[]) {
        return matters.map((matter, index) => {
            return (
                <ListItem key={index} selected={this.props.selectedMatter === matter.MatterName} interactive onClick={() => this.selectMatter(matter.MatterName)}>
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={20}>
                                {matter.MatterName}
                            </Col>
                            <Col xs={4}>
                                {matter.PendingOrdersCount}
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            );
        });
    }

    private selectMatter(matterReference: string) {
        this.props.selectMatter(matterReference);
        this.props.chaseableOrdersFetch(this.props.httpContext.clientId, matterReference, this.props.httpContext.loginId);
    }
}

const mapStateToProps = (state) => {
    return {
        mattersIsLoading: state.waitingCertificatesMattersIsLoading,
        mattersHasErrored: state.waitingCertificatesMattersLoadingHasErrored,
        matters: state.waitingCertificatesMatters,
        selectedMatter: state.selectedMatterReference,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        mattersFetch: (clientId) => dispatch(fetchWaitingCertificatesMatters(clientId)),
        chaseableOrdersFetch: (clientId, loginId: string) => dispatch(fetchChaseableOrders(clientId, loginId)),
        selectMatter: (matterReference) => dispatch(updateSelectedMatter(matterReference))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingCertificatesMatters);