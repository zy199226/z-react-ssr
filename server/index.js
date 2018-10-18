import path from 'path';
import fs from 'fs';
import url from 'url';
import zlib from 'zlib';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import { List } from '../src/router/router';

const resFile = (req, res, filepath) => fs.stat(filepath, (err) => {
    if (err) {
        res.status(404).send();
    } else {
        const raw = fs.createReadStream(filepath);
        let acceptEncoding = req.headers['accept-encoding'];
        if (!acceptEncoding) {
            acceptEncoding = '';
        }

        if (/\bdeflate\b/.test(acceptEncoding)) {
            res.writeHead(200, { 'Content-Encoding': 'deflate' });
            raw.pipe(zlib.createDeflate()).pipe(res);
        } else if (/\bgzip\b/.test(acceptEncoding)) {
            res.writeHead(200, { 'Content-Encoding': 'gzip' });
            raw.pipe(zlib.createGzip()).pipe(res);
        } else {
            raw.pipe(res);
        }
    }
});

export default () => {
    const port = 8080;
    let body = '';
    const indexFile = path.resolve(__dirname, '../index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            body = data;
        }
    });

    const app = express();
    app.use(compression());
    app.use('/static', express.static(path.join(__dirname)));

    app.get('/static/favicon.ico', (req, res) => {
        const { pathname } = url.parse(req.url);
        const filepath = path.join(__dirname, '..', pathname);
        resFile(req, res, filepath);
    });

    app.get('*', (req, res) => {
        const start = Date.now();
        const context = {};
        const content = (
            <StaticRouter location={req.url} context={context}>
                <List />
            </StaticRouter>
        );

        getLoadableState(content).then((loadableState) => {
            const main = renderToString(content);
            const html = body.replace('<div id="app"></div>', `<div id="app">${main}</div>${loadableState.getScriptTag()}`);
            res.status(200).send(html);
            console.log(`--> ${req.url}  ${Date.now() - start}ms`);
        }).catch((err) => {
            console.log(err);
        });
    });

    app.listen(port);

    console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
};
