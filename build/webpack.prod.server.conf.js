const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { server } = require('universal-webpack/config');
const settings = require('./universal-webpack-settings');
const config = require('./webpack.base.conf');

config.entry = {
    app: path.join(__dirname, '../server/entry.js')
};

config.plugins.push(
    new CleanWebpackPlugin(
        ['dist/static'],
        {
            root: path.join(__dirname, '../'),
            verbose: true,
            dry: false
        }
    ),
    new HtmlWebpackPlugin({
        favicon: path.join(__dirname, '../src/favicon.ico'),
        filename: path.join(__dirname, '../dist/index.html'),
        template: path.join(__dirname, '../src/index.html'),
        inject: true
    })
);

module.exports = server(config, settings);
