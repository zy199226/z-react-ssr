import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { loadComponents } from 'loadable-components';
import stores from './store';
import Router from './router';
import mergeOb from './util/mergeObservables';

window.Promise = Promise;

configure({
    enforceActions: 'observed'
});

mergeOb(stores, window.__INITIAL_STATE__);

loadComponents().then(() => {
    render(
        <Provider {...stores}>
            <Router />
        </Provider>,
        document.getElementById('app')
    );
});
