const path = require('path');
const startServer = require('universal-webpack/server');
const settings = require('./universal-webpack-settings');
const config = require('./webpack.base.conf');

config.entry = {
    app: path.join(__dirname, '../server/entry.js')
};

startServer(config, settings);
