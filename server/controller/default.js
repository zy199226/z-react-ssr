import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { Provider, useStaticRendering } from 'mobx-react';
import LRU from 'lru-cache';
import stores from '../../src/store';
import { Routes } from '../../src/router';
import newHtml from '../util/resHtml';
import resState from '../util/resState';
import resetStores from '../util/resetStore';

useStaticRendering(true);

const baseState = JSON.stringify(stores);

const microCache = LRU({
    max: 2,
    maxAge: 1000
});

const isCacheable = (req) => {
    // console.log(req);
    return true;
};

const defaultRes = async (req, res) => {
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
        await resState(req, stores);
        const main = await renderToString(content);
        const html = newHtml.replace('<div id="app"></div>', `<div id="app">${main}</div><script>window.__INITIAL_STATE__ = ${JSON.stringify(stores)}</script>${loadableState.getScriptTag()}`);
        res.status(200).send(html);
        resetStores(stores, baseState);
        return html;
    } catch (e) {
        console.log(e);
    }
    return false;
};

const getCache = (req, res) => {
    const start = Date.now();
    const cacheable = isCacheable(req);
    if (cacheable) {
        const hit = microCache.get(req.url);
        if (hit) {
            console.log(`--> ${req.url}  ${Date.now() - start}ms, cache`);
            return res.end(hit);
        }
    }

    defaultRes(req, res).then((html) => {
        if (cacheable) {
            microCache.set(req.url, html);
        }
        console.log(`--> ${req.url}  ${Date.now() - start}ms`);
    });
};

export default getCache;
