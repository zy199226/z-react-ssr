import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { loadComponents } from 'loadable-components';
import stores from './store';
import Router from './router';

// window.Promise = Promise; // 在 transform-runtime 对引入的组件（例如 antd）无效时，可对全局对象赋值来生效

const mergeObservables = (stores, source) => {
    if (!source) {
        return stores;
    }
    for (const v in source) {
        if (Object.prototype.hasOwnProperty.call(source, v)) {
            Object.assign(stores[v], source[v]);
        }
    }
    return stores;
};

mergeObservables(stores, window.__INITIAL_STATE__);

configure({
    enforceActions: 'observed'
});

loadComponents().then(() => {
    render(
        <Provider {...stores}>
            <Router />
        </Provider>,
        document.getElementById('app')
    );
});
