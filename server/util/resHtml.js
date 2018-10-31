import fs from 'fs';
import path from 'path';

const buildHtml = (html, m) => {
    let cssStr = '';
    let scriptStr = '';
    m.initial.forEach((o) => {
        cssStr += `<link rel="preload" href="${m.all[o]}" as="script">`;
        scriptStr += `<script src="${m.all[o]}" defer></script>`;
    });
    m.async.forEach((o) => { cssStr += `<link rel="prefetch" href="${m.all[o]}">`; });
    m.css.forEach((o) => { cssStr += `<link rel="stylesheet" href="${m.all[o]}">`; });

    let newHtml = html.replace('</head>', `${cssStr}</head>`);
    newHtml = newHtml.replace('</body>', `${scriptStr}</body>`);
    return newHtml;
};

const html = fs.readFileSync(path.resolve(__dirname, '../../src/index.html'), 'utf8');
const manifest = fs.readFileSync(path.resolve(__dirname, '../../dist/static/manifest.json'), 'utf8');

export default buildHtml(html, JSON.parse(manifest));
