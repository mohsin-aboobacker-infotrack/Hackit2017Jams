import '../Styles/common.css';

import { Col, Grid, SectionHeader, Row, Section } from 'infotrack-ui';
import * as React from 'react';

import { ISupportTab } from './Common/isupport_tab';
import { ActionCreator } from 'redux';
import { ISupportRequestCareModel } from '../Models/support-requests-care-model';
import { ISupportRequestsCommentsModel } from '../Models/support-requests-comments-model';
import { supportRequestsFetchCares, supportRequestsFetchCareComments } from '../Actions/support-request-actions';
import { connect } from 'react-redux';
import SupportRequestMatters from './SupportRequests/matter-details';
import SupportRequestsMessageHistory from './SupportRequests/message-history';
import { IHttpContext } from '../Models/CommonModels/IHttpContext';
import { loadHttpContext } from '../Actions/httpcontext-actions';

interface IProps {
    commentsFetch: ActionCreator<any>;
    commentsIsLoading: boolean;
    commentsHasErrored: boolean;
    comments: ISupportRequestsCommentsModel;
    selectedCareId: string;
    httpContext: IHttpContext;
    loadHttpContext: ActionCreator<any>;
}

class SupportRequestsView extends React.Component<IProps, {}> {

    public componentDidMount() {
        if (this.props.httpContext.clientId === "") {
            this.props.loadHttpContext();
        }
    }

    public render() {

        return (
            <Grid fluid>
                <Row nogutter>
                    <Col xs={24}>
                        <ISupportTab selectedTab="supportRequests" />
                    </Col>
                </Row>
                <Row>
                    <Col md={18}>
                        <Section header={<SectionHeader title="Callbacks" />}>
                            <SupportRequestMatters />
                        </Section>
                    </Col>
                    <Col md={6}>

                        <SupportRequestsMessageHistory selectedCareId={this.props.selectedCareId} />

                    </Col>
                </Row>
            </Grid>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        commentsIsLoading: state.supportRequestsCareCommentsIsLoading,
        commentsHasErrored: state.supportRequestsCaresCommentsHasErrored,
        comments: state.supportRequestsCareComments,
        selectedCareId: state.selectedCare,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentsFetch: (careId: string) => dispatch(supportRequestsFetchCareComments(careId)),
        loadHttpContext: () => dispatch(loadHttpContext())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportRequestsView);