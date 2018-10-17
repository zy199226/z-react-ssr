import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import loadable from 'loadable-components';

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
