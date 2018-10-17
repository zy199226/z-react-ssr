import React from 'react';
import { render } from 'react-dom';
import { loadComponents } from 'loadable-components';
import Router from '../src/router/router';

window.Promise = Promise;

loadComponents().then(() => {
    render(
        <Router />,
        document.getElementById('app')
    );
});
