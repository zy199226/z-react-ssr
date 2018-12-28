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

useStaticRendering(true); // Mobx 的官方方法，防止多次渲染，避免内存泄漏

const baseState = JSON.stringify(stores);

/**
 * 设置缓存工作方法的相关属性
 */
const microCache = LRU({
    max: 100, // 缓存数量
    maxAge: 1000 // 缓存时间（毫秒）
});

/**
 * 判断是否需要缓存处理
 * @param  {Object}  req 请求相关数据
 * @return {Boolean}     true: 需要缓存，false: 不需要。默认返回 true
 */
const isCacheable = (req) => {
    // console.log(req);
    return true;
};

/**
 * 默认实时编译页面数据
 * @return {String}     html 页面结构
 */
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
        return false;
    }
};

/**
 * 判断是返回缓存，默认实时编译返回
 * @param  {Object} req 请求相关数据
 * @param  {Object} res 返回相关数据
 */
const getCache = (req, res) => {
    const start = Date.now();
    const cacheable = isCacheable(req);
    if (cacheable) { // 判断是否需要缓存处理，否则默认实时编译返回
        const hit = microCache.get(req.url);
        if (hit) { // 判断是否存在缓存，有则返回缓存，无则默认实时编译返回
            console.log(`--> ${req.url}  ${Date.now() - start}ms, cache`);
            return res.end(hit);
        }
    }

    defaultRes(req, res).then((html) => {
        if (cacheable) { // 判断是否需要缓存
            microCache.set(req.url, html);
        }
        console.log(`--> ${req.url}  ${Date.now() - start}ms`);
    });
};

export default getCache;
