import Dashboard from '../Components/Pages/dashboard';
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Dashboard} />

            </Switch>
        </BrowserRouter>

    );
}