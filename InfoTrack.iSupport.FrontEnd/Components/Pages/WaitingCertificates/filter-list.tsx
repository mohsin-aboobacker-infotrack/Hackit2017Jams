import * as React from 'react';
import { IWaitingCertificatesMatters } from '../../Models/waiting-certificates-matters-model';
import { IChaseableOrder } from '../../Models/waiting-certificates-chaseableorders';
import { ActionCreator } from 'redux';
import { fetchWaitingCertificatesMatters, fetchChaseableOrders, updateSelectedMatter } from '../../Actions/waiting-certificates-actions';
import { connect } from 'react-redux';
import { StatusIndicator } from 'infotrack-ui';
import { List, ListItem, Grid, Row, Col, Spinner, DateInput, Select, RadioButton, Checkbox, TextInput } from 'infotrack-ui/lib';
import { IHttpContext } from '../../Models/CommonModels/IHttpContext';
import axios from 'axios';
import * as moment from 'moment';

interface IProps {
    onChange: (filter: any) => void
}

class FilterWaitingCertificatesMatters extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            chasable: 'chased',
            certificates: [],
            date: 1,
            matter: ''
        }
        this.handleCertificateTypeChecked = this.handleCertificateTypeChecked.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.sendFilterChangeToProp = this.sendFilterChangeToProp.bind(this)
    }

    public render() {
        return (
            <div>

                {this.renderMatter()}


            </div>
        );
    }

    componentWillReceiveProps(nextProps: any) {
        this.sendFilterChangeToProp(nextProps.chaseableOrders, this.state);
    }

    private sendFilterChangeToProp(chaseableOrders, state) {
        const filtered = chaseableOrders
            .filter((chaseableOrder: IChaseableOrder) => {
                if (state.matter.trim() != '') {
                    return ~chaseableOrder.Matter.toLowerCase().indexOf(state.matter.toLowerCase())
                } else {
                    return true
                }
            })
            .filter((chaseableOrder: IChaseableOrder) => {
                if (state.date == 0) return true;
                return moment(new Date()).diff(moment(chaseableOrder.DateOrdered), 'day') <= state.date
            })
            .filter((chaseableOrder: IChaseableOrder) => {
                if (state.certificates.length == 0) return true;
                return state.certificates.includes(chaseableOrder.CouncilName)
            })

        this.props.onChange(filtered);
    }

    private handleInputChange(event) {
        const state = { ...this.state, [event.target.name]: event.target.value }
        this.setState(state)
        this.sendFilterChangeToProp(this.props.chaseableOrders, state)

    }

    private handleCertificateTypeChecked(event) {
        let certificates = [...this.state.certificates]
        if (this.state.certificates.includes(event.target.value)) certificates = certificates.filter(certificate => certificate != event.target.value)
        else certificates.push(event.target.value)
        const state = { ...this.state, certificates }
        this.setState(state)
        this.sendFilterChangeToProp(this.props.chaseableOrders, state);
    }

    private renderMatter() {
        const certificateTypes = Array.from(new Set(this.props.chaseableOrders.map((order: IChaseableOrder) => order.CouncilName)))
        certificateTypes.sort(function (a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0
        })
        return (
            <div>
                {/* <ListItem className="list-header">
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={24}>
                                By Status
                            </Col>
                        </Row>
                    </Grid>

                </ListItem >
                <br />

                <label><RadioButton name="chasable" value="chased" className="label-input" onChange={this.handleInputChange} /> Chased</label>
                <label><RadioButton name="chasable" value="ready" className="label-input" onChange={this.handleInputChange} />Ready to Chase</label>
                <br />
                <br /> */}
                <ListItem className="list-header">
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={24}>
                                By Matter
                        </Col>
                        </Row>
                    </Grid>

                </ListItem>

                <ListItem>
                    <br />

                    <label className="label-input"><b>Search</b> </label>
                    <TextInput placeholder="Matter reference" name="matter" value={this.state.matter} onChange={this.handleInputChange} /><br />
                    <br />

                </ListItem>

                <ListItem className="list-header">
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={24}>
                                By Date Ordered
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
                <ListItem>
                    <br />

                    <label><RadioButton className="label-input " name="date" value={1} checked={this.state.date == 1} onChange={this.handleInputChange} /> Last month</label> <br />
                    <label><RadioButton className="label-input" name="date" value={6} checked={this.state.date == 6} onChange={this.handleInputChange} /> Last 6 month </label><br />
                    <label><RadioButton className="label-input" name="date" value={12} checked={this.state.date == 12} onChange={this.handleInputChange} /> Last year </label><br />
                    <label><RadioButton className="label-input" name="date" value={0} checked={this.state.date == 0} onChange={this.handleInputChange} /> All </label><br />
                    <br />

                </ListItem>


                <ListItem className="list-header">
                    <Grid fluid>
                        <Row nogutter>
                            <Col xs={24}>
                                By Council
                            </Col>
                        </Row>
                    </Grid>
                </ListItem>
                {(this.props.ordersIsLoading) && <Spinner className="padded-spinner" center />}
                {!this.props.ordersIsLoading &&
                    <ListItem>
                        <br />
                        {
                            certificateTypes.map((certificate: any, index) => (
                                <span key={index}>
                                    <label><Checkbox
                                        onChange={this.handleCertificateTypeChecked}
                                        name={certificate}
                                        value={certificate}
                                        checked={this.state.certificates.includes(certificate)} /> <span className="input-identation">{certificate}</span></label>
                                    < br />
                                </span>))
                        }
                        <br />
                    </ListItem>
                }
            </div >
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
        ordersIsLoading: state.waitingCertificatesChaseableOrdersIsLoading,
        ordersLoadingHasErrored: state.waitingCertificatesChaseableOrdersLoadingHasErrored,
        chaseableOrders: state.waitingCertificatesChaseableOrders,
        selectedOrder: state.waitingCertificatesSelectedOrder,
        chasedOrders: state.chasedOrders,
        httpContext: state.httpContext
    };
};

const mapDispatchToProps = (dispatch) => {
};

export default connect(mapStateToProps, null)(FilterWaitingCertificatesMatters) as any;