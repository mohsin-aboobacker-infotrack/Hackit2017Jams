import { IChaseableOrder } from '../Models/waiting-certificates-chaseableorders';
import '../Styles/common.css';

import { Col, Grid, Row, SectionHeader, Section } from 'infotrack-ui/lib';
import * as React from 'react';

import { ISupportTab } from './Common/isupport_tab';
import WaitingCertificatesMatters from "./WaitingCertificates/matters-list";
import FilterWaitingCertificatesMatters from "./WaitingCertificates/filter-list";

import ChaseableOrders from "./WaitingCertificates/waiting-certificates";
import SelectedOrderComment from "./WaitingCertificates/Comments/selected-order-comment";
import { connect } from 'react-redux';
import { ActionCreator } from 'redux';
import { IHttpContext } from '../Models/CommonModels/IHttpContext';
import { loadHttpContext } from '../Actions/httpcontext-actions';


interface IProps {
    selectedOrder: IChaseableOrder;
    httpContext: IHttpContext;
    loadHttpContext: ActionCreator<any>;
}

interface IState {
    chasableOrders: IChaseableOrder[]
}

class WaitingCertificatesView extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            chasableOrders: []
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }
    public componentDidMount() {
        if (this.props.httpContext.clientId === "") {
            this.props.loadHttpContext();
        }
    }

    private handleFilterChange(chasableOrders) {
        this.setState({ chasableOrders });
    }

    public render() {
        return (
            <Grid fluid>
                <Row nogutter>
                    <Col xs={24}>
                        <ISupportTab selectedTab="waitingCertificates" />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Section header={<SectionHeader title="Filter" />}>
                            <FilterWaitingCertificatesMatters onChange={this.handleFilterChange} />
                        </Section>
                    </Col>
                    <Col md={14}>
                        <Section header={<SectionHeader title="Waiting Certificates" />}>
                            <ChaseableOrders filteredChasableOrders={this.state.chasableOrders} />
                        </Section>
                    </Col>
                    <Col md={6}>
                        {this.props.selectedOrder.OrderId !== "" &&
                            <Section header={<SectionHeader title="Selected Order" />}>
                                <SelectedOrderComment />
                            </Section>
                        }
                    </Col>
                </Row>
            </Grid>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedOrder: state.waitingCertificatesSelectedOrder,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadHttpContext: () => dispatch(loadHttpContext())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingCertificatesView);