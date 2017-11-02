import * as React from 'react';

export default class Dashboard extends React.Component<any, {}> {
    public render() {
        return (
            <div>
                {this.renderForm()}
            </div>
        );
    }

    private renderForm() {
        return (
            <div>
                <form style={{ width: "800px", padding: "20px" }}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Date of birth:</label>
                        <input type="text" className="form-control" />
                    </div>
                </form>
            </div>
        );
    }
}