import * as React from "react";

const moment = require("moment");

export default function FormattedDate(date: any) {
    return (
        <div>{moment(date).format("DD/MM/YYYY")}</div>
    );
}