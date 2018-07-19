import React from 'react';
import { render } from 'react-dom';
import Router from './router/router';
import 'normalize.css';

window.Promise = Promise;

render(
    <Router />,
    document.getElementById('app')
);
