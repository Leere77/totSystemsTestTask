import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Login from '../Login/Login';
import Messages from '../Messages/Messages'

function App() {
    return (
        <Switch>
            <Route
                exact
                path="/login"
                component={Login}
            />
            <Route
                exact
                path="/work"
                render={props => (<Messages {...props} type="work" />)}
            />
            <Route
                exact
                path="/work"
                render={props => (<Messages {...props} type="work" />)}
            />
            <Route
                exact
                path="/chat"
                render={props => (<Messages {...props} type="chat" />)}
            />
            <Route
                exact
                path="/my"
                render={props => (<Messages {...props} type="my" />)}
            />
            <Route component={Messages} />
        </Switch>
    );
}

export default App;