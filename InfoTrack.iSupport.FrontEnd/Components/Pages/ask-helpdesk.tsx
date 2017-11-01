// import * as querystring from 'querystring';
import 'react-select/dist/react-select.css';

import { Button, Loader, StatusIndicator } from 'infotrack-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import { ActionCreator } from 'redux';

import {
    callBackRequestErrored,
    callBackRequestInProgress,
    callBackRequestSuccess,
    matterOrdersFetch,
    mattersFetch,
    postCallBackRequest,
    resetCareId,
    userDetailsFetch,
} from '../Actions/ask-helpdesk-actions';
import { updateUserDetail } from '../Actions/ask-helpdesk-actions';
import { IAskHelpDesk } from '../Models/ask-helpdesk-form-model';
import { IMatter } from '../Models/matters-model';
import { IOrder } from '../Models/orders-model';
import { IUserDetail } from '../Models/user-detail-model';
import { initialMatter } from '../Reducers/inital-states';

const COMMENT_MAX_CHARACTER = 800
const DROP_DOWN_ITEM_MAX_CHARACTER = 70

// import  Autosuggest from 'react-autosuggest';
const queryString = require("query-string");
const Autosuggest = require("react-autosuggest");
const moment = require("moment");
const params = queryString.parse(location.search);
let testMatters: any = [];
// const Select = require('react-select');

interface IFormRequired {
    NameRequired: boolean;
    EmailRequired: boolean;
    PhoneRequired: boolean;
    MatterRequired: boolean;
    OrdersRequired: boolean;
    CommentsRequired: boolean;
}

interface IProps {
    userDetailsFetch: ActionCreator<any>;
    updateUserDetail: ActionCreator<any>;
    mattersFetch: ActionCreator<any>;
    matterOrdersFetch: ActionCreator<any>;
    postCallBackRequest: ActionCreator<any>;
    resetCareId: ActionCreator<any>;
    userDetail: IUserDetail;
    matters: IMatter[];
    matterOrders: IOrder[];
    userDetailLoading: boolean;
    userDetailLoadingErrored: boolean;
    mattersLoading: boolean;
    mattersLoadingErrored: boolean;
    matterOrdersLoading: boolean;
    mattersOrdersErrored: boolean;
    callBackRequestInProgress: boolean;
    callBackRequestErrored: boolean;
    callBackRequestSuccess: boolean;
    careId: string;
}

interface IState {
    Name?: string;
    Email?: string;
    Phone?: string;
    Matter?: IMatter;
    Comment?: string;
    MethodOfContact?: string;
    value?: any;
    ClientId?: number;
    LoginId?: number;
    suggestions: any;
    formRequired: IFormRequired;
    NameLabel: string;
    EmailLabel: string;
    PhoneLabel: string;
    CommentsLabel: string;
    NameValidationError: boolean;
    CommentsValidationError: boolean;
    PhoneValidationError: boolean;
    EmailValidationError: boolean;
}

class AskHelpdesk extends React.Component<IProps, IState> {
    constructor() {
        super();

        this.state = {
            Name: "",
            Email: "",
            Phone: "",
            Matter: initialMatter,
            value: [],
            Comment: "",
            MethodOfContact: "phone",
            ClientId: 0,
            LoginId: 0,
            suggestions: [],
            formRequired: {
                CommentsRequired: true,
                EmailRequired: false,
                MatterRequired: false,
                NameRequired: true,
                OrdersRequired: false,
                PhoneRequired: true
            },
            NameLabel: "Name",
            EmailLabel: "Email",
            PhoneLabel: "Phone",
            CommentsLabel: "Comments",
            NameValidationError: false,
            CommentsValidationError: false,
            PhoneValidationError: false,
            EmailValidationError: false
        };
    }

    public componentDidMount() {
        this.setState({
            ClientId: params.ClientId,
            LoginId: params.LoginId
        });

        this.props.userDetailsFetch(params.LoginId);

        const environment = process.env.NODE_ENV;

        if (environment === "devuk" || environment === "stageuk" || environment === "produk") {
            this.props.mattersFetch(params.ClientId, "");
        } else {
            this.props.mattersFetch(params.LoginId, "");
        }

        this.props.resetCareId();

    }

    private focusedOption(prop) {
        console.log('option', prop)
    }

    private renderCharactersRemaining() {
        const commentCharacterRemaining = this.state.Comment == null ? '' :
            COMMENT_MAX_CHARACTER - this.state.Comment.length + " characters remaining";
        return <span className="helpdesk-comment-title">{commentCharacterRemaining}</span>
    }

    public render() {

        const matterOrderTruncated = this.props.matterOrders.map((matterOrder: any) => {
            console.log(matterOrder)
            const label = matterOrder.label.length > DROP_DOWN_ITEM_MAX_CHARACTER
                ? matterOrder.label.substr(0, DROP_DOWN_ITEM_MAX_CHARACTER - 5) + "... "
                : matterOrder.label
            return { ...matterOrder, label }
        })
        console.log(matterOrderTruncated)

        return (
            <div>
                {(this.props.userDetailLoadingErrored || this.props.mattersOrdersErrored || this.props.mattersLoadingErrored || this.props.callBackRequestErrored) &&
                    <StatusIndicator size="lg" red text="Oops! Something went wrong. Please try again after some time." />}
                {this.props.callBackRequestSuccess && <StatusIndicator size="lg" green text={`Your request has been submitted successfully. Care #` + this.props.careId} />}

                {this.props.careId === "0" &&
                    <form style={{ padding: "20px" }}>
                        <div className="form-group">

                            <label className="blue-label">{this.state.NameLabel}</label>{this.state.formRequired.NameRequired && <label className="required">*</label>}
                            <input type="text" className={`form-control ${this.state.NameValidationError ? "validationError" : ""}`} placeholder="Name" value={this.props.userDetail.name} onChange={this.handleFieldChange.bind(this, "name")} />
                        </div>
                        <div className="form-group">
                            <label className="blue-label">{this.state.EmailLabel}</label>{this.state.formRequired.EmailRequired && <label className="required">*</label>}
                            <input type="Email" className={`form-control ${this.state.EmailValidationError ? "validationError" : ""}`} placeholder="Email" value={this.props.userDetail.email} onChange={this.handleFieldChange.bind(this, "email")} />
                        </div>
                        <div className="form-group">
                            <label className="blue-label">{this.state.PhoneLabel}</label>{this.state.formRequired.PhoneRequired && <label className="required">*</label>}
                            <input type="text" className={`form-control ${this.state.PhoneValidationError ? "validationError" : ""}`} placeholder="Phone" value={this.props.userDetail.phone} onChange={this.handleFieldChange.bind(this, "phone")} />
                        </div>
                        <div className="form-group">
                            <label className="blue-label">Matter</label>{this.state.formRequired.MatterRequired && <label className="required">*</label>}
                            <VirtualizedSelect name="matter-field"
                                value={this.state.Matter ? this.state.Matter.value : ""}
                                onChange={this.handleFieldChange.bind(this, "matter")}
                                options={this.props.matters}
                                resetValue={initialMatter}
                                searchable
                                clearable
                                placeholder="Matter"
                                isLoading={this.props.matterOrdersLoading}

                            />
                        </div>
                        <div className="form-group">
                            <label className="blue-label">Orders</label>{this.state.formRequired.OrdersRequired && <label className="required">*</label>}
                            {/* <select className="form-control">
                            <option>Select</option>
                        </select> */}
                            <Select name="matter-order-field"
                                value={this.state.value}
                                options={matterOrderTruncated}
                                onChange={this.handleFieldChange.bind(this, "matterOrder")}
                                focusedOption={this.focusedOption}
                                resetValue={[]}
                                deleteRemoves={false}
                                backspaceRemoves={false}
                                multi={true}
                                closeOnSelect={false}
                                placeholder="Select Orders"
                            />

                        </div>
                        <div className="form-group">
                            <label className="radio-inline" style={{ paddingRight: "10px" }}>
                                What is your preferred method of contact?
                    </label>
                            <label className="radio-inline" style={{ paddingRight: "10px" }}>
                                <input type="radio" name="contactradio" value="phone" onChange={this.handleFieldChange.bind(this, "callBackMethod")} checked={this.state.MethodOfContact === "phone" ? true : false} />Phone</label>
                            <label className="radio-inline">
                                <input type="radio" name="contactradio" value="email" onChange={this.handleFieldChange.bind(this, "callBackMethod")} checked={this.state.MethodOfContact === "email" ? true : false} />Email</label>
                        </div>
                        <div className="form-group">
                            <label className="blue-label">{this.state.CommentsLabel}</label> {this.renderCharactersRemaining()}{this.state.formRequired.CommentsRequired && <label className="required">*</label>}
                            <textarea maxLength={COMMENT_MAX_CHARACTER} className={`form-control ${this.state.CommentsValidationError ? "validationError" : ""}`} rows={5}
                                placeholder="Add comments / describe your request here..." value={this.state.Comment} onChange={this.handleFieldChange.bind(this, "comments")}></textarea>
                        </div>
                        <div className="form-group">
                            <Button className="button-full-width" warn primary disabled={this.props.callBackRequestInProgress} onClick={this.submitForm.bind(this)}>SUBMIT REQUEST</Button>
                        </div>
                    </form>}
                <Loader show={this.props.userDetailLoading || this.props.mattersLoading || this.props.callBackRequestInProgress}>Processing...</Loader>
            </div>
        );
    }

    private submitForm(e) {
        e.preventDefault();

        if (this.validateForm()) {
            let relatedOrders: any = [];
            this.state.value.map((item) => {
                relatedOrders.push(item.value);
            });

            const request: IAskHelpDesk = {
                Name: this.props.userDetail.name,
                Email: this.props.userDetail.email,
                Phone: this.props.userDetail.phone,
                Matter: this.state.Matter ? this.state.Matter.value : "",
                RelatedOrderIds: relatedOrders,
                CallBackMethod: this.state.MethodOfContact,
                Comment: this.state.Comment,
                LoginId: this.state.LoginId,
                ClientId: this.state.ClientId,
                DateCreated: moment().format()
            };

            this.props.postCallBackRequest(request);
            // console.log("submit");
        }
    }

    private validateForm() {
        let validationSucceeded = true;
        if (this.props.userDetail.name.trim() === "") {
            this.setState({
                NameLabel: "Name - is required",
                NameValidationError: true
            });
            validationSucceeded = false;

        } else {
            this.setState({
                NameLabel: "Name",
                NameValidationError: false
            });
        }

        if (this.state.Comment === "") {
            this.setState({
                CommentsLabel: "Comments - is required",
                CommentsValidationError: true
            });
            validationSucceeded = false;
        } else {
            this.setState({
                CommentsLabel: "Comments",
                CommentsValidationError: false
            });
        }
        if (this.state.formRequired.PhoneRequired && this.props.userDetail.phone.trim() === "") {
            this.setState({
                PhoneLabel: "Phone - is required",
                PhoneValidationError: true
            });
            validationSucceeded = false;
        } else {
            this.setState({
                PhoneLabel: "Phone",
                PhoneValidationError: false
            });
        }
        if (this.state.formRequired.EmailRequired && this.props.userDetail.email.trim() === "") {
            this.setState({
                EmailLabel: "Email - is required",
                EmailValidationError: true
            });
            validationSucceeded = false;
        } else {
            this.setState({
                EmailLabel: "Email",
                EmailValidationError: false
            });
        }

        return validationSucceeded;
    }

    private handleFieldChange(name: string, e) {

        let value: string = "";
        if (name !== "matter" && name !== "matterOrder") {
            value = e.target.value;
        }

        if (name === "name") {
            this.props.updateUserDetail({
                name: value,
                email: this.props.userDetail.email,
                phone: this.props.userDetail.phone
            });
        }

        if (name === "email") {
            this.props.updateUserDetail({
                name: this.props.userDetail.name,
                email: value,
                phone: this.props.userDetail.phone
            });
        }

        if (name === "phone") {
            this.props.updateUserDetail({
                name: this.props.userDetail.name,
                email: this.props.userDetail.email,
                phone: value
            });
        }

        if (name === "matter") {
            if (e !== null) {
                this.setState({ Matter: { label: e.label, value: e.value } });
                if (e.label !== "") {
                    this.props.matterOrdersFetch(this.state.ClientId, e.label);
                }
            } else {
                this.setState({ Matter: initialMatter });
            }
        }

        if (name === "matterOrder") {
            this.setState({
                value: e
            });

        }

        if (name === "callBackMethod") {
            this.setState({
                MethodOfContact: value
            });

            if (value === "phone") {
                this.setState({
                    formRequired: {
                        CommentsRequired: true,
                        EmailRequired: false,
                        MatterRequired: false,
                        NameRequired: true,
                        OrdersRequired: false,
                        PhoneRequired: true
                    }
                });
            } else {
                this.setState({
                    formRequired: {
                        CommentsRequired: true,
                        EmailRequired: true,
                        MatterRequired: false,
                        NameRequired: true,
                        OrdersRequired: false,
                        PhoneRequired: false
                    }
                });
            }
        }

        if (name === "comments") {
            this.setState({ Comment: value });
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userDetail: state.userDetail,
        matters: state.matters,
        matterOrders: state.orders,
        userDetailLoading: state.userDetailIsLoading,
        userDetailLoadingErrored: state.userDetailHasErrored,
        mattersLoading: state.mattersIsLoading,
        mattersLoadingErrored: state.mattersHasErrored,
        matterOrdersLoading: state.ordersIsLoading,
        mattersOrdersErrored: state.ordersHasErrored,
        callBackRequestInProgress: state.callBackRequestInProgress,
        callBackRequestErrored: state.callBackRequestErrored,
        callBackRequestSuccess: state.callBackRequestSuccess,
        careId: state.careId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userDetailsFetch: (loginId) => dispatch(userDetailsFetch(loginId)),
        mattersFetch: (loginId: string, matterReference: string) => dispatch(mattersFetch(loginId, matterReference)),
        matterOrdersFetch: (clientId: string, matterReference: string) => dispatch(matterOrdersFetch(clientId, matterReference)),
        postCallBackRequest: (request: IAskHelpDesk) => dispatch(postCallBackRequest(request)),
        updateUserDetail: (userDetail: IUserDetail) => dispatch(updateUserDetail(userDetail)),
        resetCareId: () => dispatch(resetCareId())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskHelpdesk);