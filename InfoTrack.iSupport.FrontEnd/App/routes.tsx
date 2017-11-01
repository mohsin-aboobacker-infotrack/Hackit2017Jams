import Dashboard from '../Components/Pages/dashboard';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AskHelpdesk from '../Components/Pages/ask-helpdesk';
import SupportRequestsView from '../Components/Pages/support-requests-view';
import WaitingCertificatesView from '../Components/Pages/waiting-certificates-view';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/isupport/AskHelpdesk"} component={AskHelpdesk} />
                <Route path={"/isupport/SupportRequests"} component={SupportRequestsView} />
                <Route path="/" component={Dashboard} />

            </Switch>
        </BrowserRouter>

    );
}