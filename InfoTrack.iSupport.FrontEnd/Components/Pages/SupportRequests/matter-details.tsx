import { IHttpContext } from '../../Models/CommonModels/IHttpContext';
import { Col, Grid, List, ListItem, Row, SortableList, Spinner } from 'infotrack-ui/lib';
import * as React from 'react';
import { ActionCreator } from 'redux';
import { ISupportRequestCareModel } from '../../Models/support-requests-care-model';
import { supportRequestsFetchCares, updateSelectedCare, supportRequestsFetchCareComments } from '../../Actions/support-request-actions';
import { connect } from 'react-redux';
import { StatusIndicator } from 'infotrack-ui';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
const moment = require("moment");

interface IProps {
    commentsFetch: ActionCreator<any>;
    caresFetch: ActionCreator<any>;
    selectCare: ActionCreator<any>;
    caresIsLoading: boolean;
    caresHasErrored: boolean;
    cares: ISupportRequestCareModel[];
    selectedCareId: string;
    httpContext: IHttpContext;
}

class SupportRequestMatters extends React.Component<IProps, {}> {

    public componentDidMount() {
        if (this.props.httpContext.clientId === "") {
            const url = window.location.origin + "/iSupport/Api/Context";
            axios.get(url)
                .then((response) => {
                    if (response.statusText !== "OK") {
                        throw (Error(response.statusText));
                    }

                    this.props.caresFetch(response.data.clientId);
                })
                // tslint:disable-next-line:no-console
                .catch((e) => console.log(e));
        } else {
            this.props.caresFetch(this.props.httpContext.clientId);
        }
    }

    public render() {
        return (
            <div>
                {this.props.caresHasErrored && <StatusIndicator size="lg" red text="Oops! Something has went wrong. Please try again after some time." />}
                <List>
                    {this.renderHeader()}
                    {this.props.cares.length === 0 && !this.props.caresIsLoading && <div className="no-message-box">No cares found.</div>}
                    {this.props.caresIsLoading && <Spinner className="padded-spinner" center />}

                    <Scrollbars
                        style={{ 'height': 'calc(100vh - 263px)' }}
                        autoHide>
                        {this.renderDetails(this.props.cares)}
                    </Scrollbars>
                </List>

            </div>
        );
    }

    private renderHeader() {
        return (
            <ListItem className="list-header">
                <Grid fluid>
                    <Row nogutter>
                        <Col xs={4}>
                            Matter Reference
                        </Col>
                        <Col xs={2}>
                            Date Created
                        </Col>
                        <Col xs={3}>
                            Status
                        </Col>
                        <Col xs={11}>
                            Description
                        </Col>
                        <Col xs={4}>
                            Requested By
                        </Col>
                    </Row>
                </Grid>
            </ListItem>
        );
    }

    private renderDetails(cares: ISupportRequestCareModel[]) {
        return cares.map((care, index) => {
            return (
                <ListItem key={index} selected={this.props.selectedCareId === care.IncidentId ? true : false} interactive onClick={() => this.selectCare(care.IncidentId)}>
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={4}>
                                {care.Matter}
                            </Col>
                            <Col xs={2}>
                                {moment(care.CreatedDateTime).format("DD/MM/YYYY")}
                            </Col>
                            <Col xs={3}>
                                {care.Status}
                            </Col>
                            <Col xs={11} className="truncate-table-column">
                                {care.Description}
                            </Col>
                            <Col xs={4}>
                                {care.RequestedBy}
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            );
        });
    }

    private selectCare(careId: string) {
        this.props.selectCare(careId);
        this.props.commentsFetch(careId);
    }
}

const mapStateToProps = (state) => {
    return {
        caresIsLoading: state.supportRequestsCaresIsLoading,
        caresHasErrored: state.supportRequestsCaresHasErrored,
        cares: state.supportRequestsCares,
        selectedCareId: state.selectedCare,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        caresFetch: (clientId: string) => dispatch(supportRequestsFetchCares(clientId)),
        selectCare: (careId: string) => dispatch(updateSelectedCare(careId)),
        commentsFetch: (careId: string) => dispatch(supportRequestsFetchCareComments(careId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportRequestMatters);