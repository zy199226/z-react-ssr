const path = require('path');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');

const baseWebpackConfig = require('./webpack.prod.conf');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: path.join(__dirname, '../src/ssr.entry.js')
    },

    plugins: [
        new ManifestPlugin({
            generate: (seed, files) => {
                seed = {
                    all: {}, initial: [], async: [], css: []
                };
                files.forEach((o) => {
                    seed.all[o.name] = o.path;
                    if (/^(?!(js\/)).+\.js$/.test(o.name)) {
                        seed.initial.push(o.name);
                    } else if (/\.js$/.test(o.name)) {
                        seed.async.push(o.name);
                    }
                    if (/\.css$/.test(o.name)) {
                        seed.css.push(o.name);
                    }
                });
                return seed;
            }
        })
    ]
});
