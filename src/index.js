import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import stores from './store';
import Router from './router';

window.Promise = Promise;

configure({
    enforceActions: 'observed'
});

render(
    <Provider {...stores}>
        <Router />
    </Provider>,
    document.getElementById('app')
);
