import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import importedComponent from 'react-imported-component';

import App from '../pages/app';

const A = importedComponent(() => import('../pages/a/a'));
const B = importedComponent(() => import('../pages/b/b'));
const C = importedComponent(() => import('../pages/c/c'));
const App = loadable(() => import('../pages/app'));
const A = loadable(() => import('../pages/a/a'));
const B = loadable(() => import('../pages/b/b'));
const C = loadable(() => import('../pages/c/c'));

// import App from '../pages/app';
// import A from '../pages/a/a';
// import B from '../pages/b/b';
// import C from '../pages/c/c';


export class List extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={App} />
                <Route path="/aaa" component={A} />
                <Route path="/bbb" component={B} />
                <Route path="/c/ccc" component={C} />
            </div>
        );
    }
}

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <List />
                </div>
            </Router>
        );
    }
}

export default hot(module)(Root);
