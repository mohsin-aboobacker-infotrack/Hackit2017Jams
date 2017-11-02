import * as React from 'react';
import { Button } from 'infotrack-ui/lib';
import { ActionCreator } from 'redux';

import '../Styles/common.css';

interface IProps {
    validationInProgress: boolean;
    validationHasErrored: boolean;
    validate: ActionCreator<any>;
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

    validations: {
        nameValidationError?: boolean;
        dobValidationError?: boolean;
        genderValidationError?: boolean;
        photoValidationError?: boolean;
        licenseValidationError?: boolean;
        passportValidationError?: boolean;
    };
}

export default class Dashboard extends React.Component<any, IState> {

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
            validations: {
                nameValidationError: false,
                dobValidationError: false,
                genderValidationError: false,
                licenseValidationError: false,
                passportValidationError: false,
                photoValidationError: false
            }
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
        if (this.state.name.trim() === "") {
            this.setState({
                validations: {
                    nameValidationError: true
                }
            });
        }

        if (this.state.dateOfBirth.trim() === "") {
            this.setState({
                validations: {
                    dobValidationError: true
                }
            });
        }

        if (this.state.gender.trim() === "") {
            this.setState({
                validations: {
                    genderValidationError: true
                }
            });
        }

        if (this.state.photoFileName.trim() === "") {
            this.setState({
                validations: {
                    photoValidationError: true
                }
            });
        }

        if (this.state.licenseFileName.trim() === "") {
            this.setState({
                validations: {
                    licenseValidationError: true
                }
            });
        }

        if (this.state.passportFileName.trim() === "") {
            this.setState({
                validations: {
                    passportValidationError: true
                }
            });
        }

    }

    private renderForm() {
        return (
            <div>
                <form style={{ width: "800px", padding: "20px" }}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={this.state.name} className={`form-control ${this.state.validations.nameValidationError ? "validationError" : ""}`} onChange={this.handleChange.bind(this, "name")} />
                    </div>
                    <div className="form-group">
                        <label>Date of birth:</label>
                        <input type="date" value={this.state.dateOfBirth} className={`form-control ${this.state.validations.dobValidationError ? "validationError" : ""}`} onChange={this.handleChange.bind(this, "dob")} />
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
            </div>
        );
    }

    private submitForm(e) {
        e.preventDefault();

        if (this.validateForm()) {
            console.log("going to submit form");
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