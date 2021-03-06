import * as React from 'react';
import { Button, Spinner } from 'infotrack-ui/lib';
import { ActionCreator } from 'redux';

import '../Styles/common.css';
import { uploadFile, faceMatch, detailsMatchInProgress, detailsMatchSuccess } from '../Actions/dashboard-actions';
import { connect } from 'react-redux';
import { IFaceMatchModel } from '../Models/face-match-model';
import { IDetailsMatchResult } from '../Models/details-match-result';
import { IUserDetails } from '../Models/user-details';

interface IProps {
    photoFilePath: string;
    passportFilePath: string;
    licenseFilePath: string;
    validationStarted: boolean;
    uploadPhotoInProgress: boolean;
    uploadPhotoHasErrored: boolean;
    uploadPassportInProgress: boolean;
    uploadPassportHasErrored: boolean;
    uploadLicenseInProgress: boolean;
    uploadLicenseHasErrored: boolean;
    faceMatchInProgress: boolean;
    faceMatchHasErrored: boolean;
    faceMatchSuccess: IFaceMatchModel;
    detailsMatchInProgress: boolean;
    detailsMatchHasErrored: boolean;
    detailsMatchSuccess: IDetailsMatchResult;
    uploadFile: ActionCreator<any>;
    faceMatch: ActionCreator<any>;
    detailsMatch: ActionCreator<any>;
}

interface IState {
    name: string;
    dateOfBirth: string;
    gender: string;
    photoFile: FormData;
    photoFileName: string;
    licenseFile: FormData;
    licenseFileName: string;
    passportFile: FormData;
    passportFileName: string;

    nameValidationError: boolean;
    dobValidationError: boolean;
    genderValidationError: boolean;
    photoValidationError: boolean;
    licenseValidationError: boolean;
    passportValidationError: boolean;
}

class Dashboard extends React.Component<IProps, IState> {

    constructor() {
        super();
        this.state = {
            name: "",
            dateOfBirth: "",
            gender: "",
            photoFile: new FormData(),
            photoFileName: "",
            licenseFile: new FormData(),
            licenseFileName: "",
            passportFile: new FormData(),
            passportFileName: "",
            nameValidationError: false,
            dobValidationError: false,
            genderValidationError: false,
            licenseValidationError: false,
            passportValidationError: false,
            photoValidationError: false
        };
    }

    public render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }

    private handleChange(name: string, e) {
        let value: string = "";
        value = e.target.value;
        if (name === "name") {
            this.setState({
                name: value
            });
        }

        if (name === "dob") {
            this.setState({
                dateOfBirth: value
            });
        }

        if (name === "gender") {
            this.setState({
                gender: value
            });
        }

        if (name === "photo") {
            const filePath: string = e.target.value;
            const files = e.target.files;
            let formData = new FormData();
            formData.append("file", files[0]);
            const fileName: string = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
            this.setState({
                photoFile: formData
            });
            this.setState({
                photoFileName: fileName
            });
        }

        if (name === "license") {
            const filePath: string = e.target.value;
            const files = e.target.files;
            let formData = new FormData();
            formData.append("file", files[0]);
            const fileName: string = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
            this.setState({
                licenseFile: formData
            });
            this.setState({
                licenseFileName: fileName
            });
        }

        if (name === "passport") {
            const filePath: string = e.target.value;
            const files = e.target.files;
            let formData = new FormData();
            formData.append("file", files[0]);
            const fileName: string = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
            this.setState({
                passportFile: formData
            });
            this.setState({
                passportFileName: fileName
            });
        }
    }

    private validateForm() {
        let validateSuccess: boolean = true;
        if (this.state.name.trim() === "") {
            this.setState({
                nameValidationError: true
            });
            validateSuccess = false;
        }

        if (this.state.dateOfBirth.trim() === "") {
            this.setState({
                dobValidationError: true
            });
            validateSuccess = false;
        }

        if (this.state.gender.trim() === "") {
            this.setState({
                genderValidationError: true
            });
            validateSuccess = false;
        }

        if (this.state.photoFileName.trim() === "") {
            this.setState({
                photoValidationError: true
            });
            validateSuccess = false;
        }

        if (this.state.licenseFileName.trim() === "") {
            this.setState({
                licenseValidationError: true
            });
            validateSuccess = false;
        }

        if (this.state.passportFileName.trim() === "") {
            this.setState({
                passportValidationError: true
            });
            validateSuccess = false;
        }

        return validateSuccess;
    }

    private renderForm() {
        return (
            <div>
                <form style={{ width: "800px", padding: "20px" }}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={this.state.name} className={`form-control ${this.state.nameValidationError ? "validationError" : ""}`} onChange={this.handleChange.bind(this, "name")} />
                    </div>
                    <div className="form-group">
                        <label>Date of birth:</label>
                        <input type="date" value={this.state.dateOfBirth} className={`form-control ${this.state.dobValidationError ? "validationError" : ""}`} onChange={this.handleChange.bind(this, "dob")} />
                    </div>
                    <div className="form-check form-check-inline">
                        <label style={{ marginRight: "10px" }}>Gender:</label>
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio" name="genderOptions" checked={this.state.gender === "Male"} onChange={this.handleChange.bind(this, "gender")} value="Male" /> Male
                        </label>
                        <label className="form-check-label">
                            <input className="form-check-input" type="radio" name="genderOptions" checked={this.state.gender === "Female"} onChange={this.handleChange.bind(this, "gender")} value="Female" /> Female
                        </label>
                    </div>
                    <div className="form-group form-group-inline">
                        <label>Upload photo holding a photo id:</label>
                        <Button onClick={this.openFileUploadPhoto.bind(this)} >Choose File</Button>
                        <input ref={input => this.inputElementPhoto = input} type="file" style={{ display: "none" }} onChange={this.handleChange.bind(this, "photo")} />
                        <label>{this.state.photoFileName}</label>
                    </div>
                    <div className="form-group form-group-inline">
                        <label>Upload Drivers License:</label>
                        <Button onClick={this.openFileUploadLicense.bind(this)} >Choose File</Button>
                        <input ref={input => this.inputElementDriversLicense = input} type="file" style={{ display: "none" }} onChange={this.handleChange.bind(this, "license")} />
                        <label>{this.state.licenseFileName}</label>
                    </div>
                    <div className="form-group form-group-inline">
                        <label>Upload Passport:</label>
                        <Button onClick={this.openFileUploadPassport.bind(this)} >Choose File</Button>
                        <input ref={input => this.inputElementPassport = input} type="file" style={{ display: "none" }} onChange={this.handleChange.bind(this, "passport")} />
                        <label>{this.state.passportFileName}</label>
                    </div>
                    <Button onClick={this.submitForm.bind(this)}>Validate</Button>
                </form>

                {(this.props.uploadPhotoInProgress || this.props.uploadLicenseInProgress || this.props.uploadPassportInProgress || this.props.validationStarted) && this.renderValidationResults()}
            </div>
        );
    }

    private renderValidationResults() {
        return (
            <div>
                {this.props.uploadPhotoInProgress && <div>Upload photo in progress <Spinner mini /></div>}
                {this.props.uploadPassportInProgress && <div>Upload passport in progress <Spinner mini /></div>}
                {this.props.uploadLicenseInProgress && <div>Upload license in progress <Spinner mini /></div>}

                {this.props.validationStarted && <div>{this.renderSummary()}</div>}
            </div>

        );
    }

    private renderSummary() {
        return (
            <div>
                <div>
                    {this.props.faceMatchInProgress && <div><Spinner mini />Face match in progress </div>}
                    {!this.props.faceMatchInProgress && <div>Confidence: {this.props.faceMatchSuccess.matchPercentage}</div>}

                </div>
                <div>
                    {this.props.detailsMatchInProgress && <div><Spinner mini />Name match in progress </div>}
                    {!this.props.detailsMatchInProgress && <div>Name match result: {this.props.detailsMatchSuccess.NameMatch ? "Pass" : "Fail"}</div>}

                </div>
                <div>
                    {this.props.detailsMatchInProgress && <div><Spinner mini />Date of birth match in progress </div>}
                    {!this.props.detailsMatchInProgress && <div>Date of birth match result: {this.props.detailsMatchSuccess.DobMatch ? "Pass" : "Fail"}</div>}

                </div>
                <div>
                    {this.props.detailsMatchInProgress && <div><Spinner mini />Gender match in progress </div>}
                    {!this.props.detailsMatchInProgress && <div>Gender match result: {this.props.detailsMatchSuccess.GenderMatch ? "Pass" : "Fail"}</div>}

                </div>
            </div>
        );
    }

    private submitForm(e) {
        e.preventDefault();

        if (this.validateForm()) {
            console.log("going to submit form");

            let userDetail: IUserDetails = {
                DOB: this.state.dateOfBirth,
                Gender: this.state.gender,
                Name: this.state.name
            };

            this.props.uploadFile(this.state.photoFile, this.state.passportFile, this.state.licenseFile, userDetail);
        } else {
            console.log("validation failed");
        }
    }

    private inputElementPhoto;
    private inputElementDriversLicense;
    private inputElementPassport;

    private openFileUploadPhoto(e) {
        e.preventDefault();
        this.inputElementPhoto.click();
    }

    private openFileUploadLicense(e) {
        e.preventDefault();
        this.inputElementDriversLicense.click();
    }

    private openFileUploadPassport(e) {
        e.preventDefault();
        this.inputElementPassport.click();
    }

    private onFileUpload(e) {
        const filePath: string = e.target.value;
        const files = e.target.files;

        let formData = new FormData();
        formData.append("file", files[0]);
        const fileName: string = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
        // this.props.uploadFile(formData, this.props.selectedQuestion.QuestionId, fileName);
    }
}

const mapStateToProps = (state) => {
    return {
        photoFilePath: state.photoFilePath,
        passportFilePath: state.passportFilePath,
        licenseFilePath: state.licenseFilePath,
        validationStarted: state.validationStarted,
        uploadPhotoInProgress: state.uploadPhotoInProgress,
        uploadPhotoHasErrored: state.uploadPhotoHasErrored,
        uploadPassportInProgress: state.uploadPassportInProgress,
        uploadPassportHasErrored: state.uploadPassportHasErrored,
        uploadLicenseInProgress: state.uploadLicenseInProgress,
        uploadLicenseHasErrored: state.uploadLicenseHasErrored,
        faceMatchInProgress: state.faceMatchInProgress,
        faceMatchHasErrored: state.faceMatchHasErrored,
        detailsMatchInProgress: state.detailsMatchInProgress,
        detailsMatchHasErrored: state.detailsMatchHasErrored,
        faceMatchSuccess: state.faceMatchSuccess,
        detailsMatchSuccess: state.detailsMatchSuccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (photoFile: FormData, passportFile: FormData, licenseFile: FormData, userDetails: IUserDetails) => dispatch(uploadFile(photoFile, passportFile, licenseFile, userDetails)),
        faceMatch: (photoFilePath: string) => dispatch(faceMatch(photoFilePath)),
        detailsMatch: (licensePath: string, passportPath: string) => dispatch(licensePath, passportPath)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);