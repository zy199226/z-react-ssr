import url from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { Provider, useStaticRendering } from 'mobx-react';
import cache from 'memory-cache';
import stores from '../../src/store';
import { Routes } from '../../src/router';
import newHtml from '../util/resHtml';
import resState from '../util/resState';

useStaticRendering(true);

const defaultRes = async (req, res, pathname, noState) => {
    const context = {};
    const content = (
        <Provider {...stores}>
            <StaticRouter location={req.url} context={context}>
                <Routes />
            </StaticRouter>
        </Provider>
    );

    try {
        const loadableState = await getLoadableState(content);
        const stateLength = noState || await resState(req, stores);
        const main = await renderToString(content);
        const html = newHtml.replace('<div id="app"></div>', `<div id="app">${main}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(stores)}</script>${loadableState.getScriptTag()}`);
        res.status(200).send(html);

        if (stateLength) {
            cache.put(pathname, { stores: JSON.stringify(stores), html });
        } else {
            cache.put(pathname, html);
        }
    } catch (e) {
        console.log(e);
    }
};

const getCache = (req, res) => {
    const start = Date.now();
    const { pathname } = url.parse(req.url);
    const c = cache.get(pathname);

    if (Object.prototype.toString.call(c) === '[object Object]') {
        resState(req, stores).then((l) => {
            if (JSON.stringify(stores) === c.stores) {
                res.status(200).send(c.html);
            } else {
                defaultRes(req, res, pathname, l);
            }
        });
    } else if (c) {
        res.status(200).send(c);
    } else {
        defaultRes(req, res, pathname);
    }
    console.log(`--> ${req.url}  ${Date.now() - start}ms`);
};

export default getCache;
