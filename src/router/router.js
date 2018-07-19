import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import lazyLoad from './lazyLoad';

import App from '../pages/app';

const A = lazyLoad(() => import('../pages/a/a'));
const B = lazyLoad(() => import('../pages/b/b'));
const C = lazyLoad(() => import('../pages/c/c'));

class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={App} />
                    <Route path="/aaa" component={A} />
                    <Route path="/bbb" component={B} />
                    <Route path="/ccc" component={C} />
                </div>
            </Router>
        );
    }
}

export default hot(module)(Root);
