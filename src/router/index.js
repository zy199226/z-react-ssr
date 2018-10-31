import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import loadable from 'loadable-components';
import list from './routes';
import list2 from './routes2';

const App = loadable(() => import('../pages/app'));

export const serverRoutes = list.concat(list2);

export class Routes extends Component {
    render() {
        return (
            <Switch>
                {list.map(v => (<Route key={v.path} {...v} />))}
                <Route path="/" render={props => <App {...props} />} />
            </Switch>
        );
    }
}

class Root extends Component {
    render() {
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}

export default hot(module)(Root);
