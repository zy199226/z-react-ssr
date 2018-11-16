import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './store';
import Router from './router';

// window.Promise = Promise; // 在 transform-runtime 对引入的组件（例如 antd）无效时，可对全局对象赋值来生效

configure({
    enforceActions: 'observed'
});

render(
    <Provider {...stores}>
        <Router />
    </Provider>,
    document.getElementById('app')
);
