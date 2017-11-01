import { isUk } from '../../../App/common-helpers';
import { IChasedOrder } from '../../Models/WaitingCertificateModels/chased-orders';
import { IChaseRequest } from '../../Models/WaitingCertificateModels/chase-request';
import * as React from 'react';
import { IChaseableOrder } from '../../Models/waiting-certificates-chaseableorders';
import { ActionCreator } from 'redux';
import { updateSelectedOrder, fetchChaseableOrders, waitingCertificatesFetchComments, chaseOrder } from '../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { StatusIndicator } from 'infotrack-ui';
import { List, ListItem, Grid, Row, Col, Spinner, Button } from 'infotrack-ui/lib';
import { chasedOrders } from '../../Reducers/waiting-certificates-reducers';
import FormattedDate from '../Common/formatted-date';
import { IHttpContext } from '../../Models/CommonModels/IHttpContext';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
const moment = require("moment");

interface IProps {
    ordersIsLoading: boolean;
    ordersLoadingHasErrored: boolean;
    chaseableOrders: IChaseableOrder[];
    selectedOrder: IChaseableOrder;
    chasedOrders: IChasedOrder[];
    selectOrder: ActionCreator<any>;
    fetchComments: ActionCreator<any>;
    chaseOrder: ActionCreator<any>;
    chaseableOrdersFetch: ActionCreator<any>;
    httpContext: IHttpContext;
    filteredChasableOrders: IChaseableOrder[]
}

class ChaseableOrders extends React.Component<IProps, {}> {

    public componentDidMount() {
        if (this.props.httpContext.clientId === "") {
            const url = window.location.origin + "/iSupport/Api/Context";
            axios.get(url)
                .then((response) => {
                    if (response.statusText !== "OK") {
                        throw (Error(response.statusText));
                    }

                    this.props.chaseableOrdersFetch(response.data.clientId, response.data.loginId);
                })
                // tslint:disable-next-line:no-console
                .catch((e) => console.log(e));
        } else {
            this.props.chaseableOrdersFetch(this.props.httpContext.clientId, this.props.httpContext.loginId);
        }
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick = (order: IChaseableOrder) => (event) => {
        this.selectOrder(order);
    }

    public render() {
        return (
            <div>
                {this.props.ordersLoadingHasErrored && <StatusIndicator size="lg" red text="Oops! Something has went wrong. Please try again after some time." />}

                <List>
                    {this.renderHeader()}
                    {this.props.chaseableOrders.length === 0 && !this.props.ordersIsLoading && <div className="no-message-box">No chaseable orders found.</div>}
                    {this.props.ordersIsLoading && <Spinner className="padded-spinner" center />}


                    <Scrollbars
                        className="scrollable-matters"
                        style={{ 'height': 'calc(100vh - 263px)' }}
                        autoHide>

                        {this.renderDetails(this.props.chaseableOrders)}
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
                        <Col xs={10}>
                            Certificates/Documents
                        </Col>
                        <Col xs={3}>
                            Date Ordered
                        </Col>
                        <Col xs={3}>
                            ETD
                        </Col>
                        <Col xs={4}>
                            Chase
                        </Col>
                    </Row>
                </Grid>
            </ListItem>
        );
    }

    private ifChased(chaseableOrder: IChaseableOrder) {
        for (let order of this.props.chasedOrders) {
            if (order.OrderId === chaseableOrder.OrderId || (!isUk() && order.PencilOrderId === chaseableOrder.PencilOrderId)) {
                return true;
            }
        }

        if (!chaseableOrder.CanChaseOrder) {
            return true;
        }
    }

    private renderDetails(orders: IChaseableOrder[]) {
        return this.props.filteredChasableOrders.map((order, index) => {
            const disabled = this.ifChased(order);
            return (
                <ListItem key={index} selected={this.props.selectedOrder.OrderId === order.OrderId} interactive onClick={this.handleClick(order)}>
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={4}>
                                {order.Matter}
                            </Col>
                            <Col xs={10}>
                                {order.CertificateDescription}
                            </Col>
                            <Col xs={3}>
                                {moment(order.DateOrdered).format("DD/MM/YYYY")}
                            </Col>
                            <Col xs={3}>
                                {moment(order.EstimatedDeliveryTime).format("DD/MM/YYYY") === "31/12/9999" ? "TBA" : moment(order.EstimatedDeliveryTime).format("DD/MM/YYYY")}
                            </Col>
                            <Col xs={4}>
                                <Button warn primary className="chase-button-box" disabled={disabled} onClick={() => { this.chaseOrder(order.OrderId, order.PencilOrderId); }} size="small" >
                                    {disabled ? "Chased" : "Chase"}
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
            );
        });
    }

    private chaseOrder(orderId: string, pencilOrderId) {
        const chaseRequest: IChaseRequest = {
            LoginId: this.props.httpContext.loginId,
            OrderId: orderId,
            PencilOrderId: pencilOrderId
        };
        this.props.chaseOrder(chaseRequest, this.props.httpContext.clientId);
    }

    private selectOrder(order: IChaseableOrder) {
        this.props.selectOrder(order);
        this.props.fetchComments(this.props.httpContext.clientId, order.OrderId);
    }
}

const mapStateToProps = (state) => {
    return {
        ordersIsLoading: state.waitingCertificatesChaseableOrdersIsLoading,
        ordersLoadingHasErrored: state.waitingCertificatesChaseableOrdersLoadingHasErrored,
        chaseableOrders: state.waitingCertificatesChaseableOrders,
        selectedOrder: state.waitingCertificatesSelectedOrder,
        chasedOrders: state.chasedOrders,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectOrder: (order: IChaseableOrder) => dispatch(updateSelectedOrder(order)),
        fetchComments: (clientId, orderId) => dispatch(waitingCertificatesFetchComments(clientId, orderId, false)),
        chaseOrder: (chaseRequest: IChaseRequest, clientId: string) => dispatch(chaseOrder(chaseRequest, clientId)),
        chaseableOrdersFetch: (clientId: string, loginId: string) => dispatch(fetchChaseableOrders(clientId, loginId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChaseableOrders);