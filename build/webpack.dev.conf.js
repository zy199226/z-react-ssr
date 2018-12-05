const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const baseWebpackConfig = require('./webpack.base.conf');

const ip = '0.0.0.0';

const devWebpackConfig = merge(baseWebpackConfig, {
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        publicPath: '/',
        compress: true,
        host: ip,
        port: 9090,
        hot: true,
        inline: true,
        open: true,
        clientLogLevel: 'warning',
        quiet: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://10.100.4.63:3000',
                // pathRewrite: { '^/api': '' },
                changeOrigin: true
            }
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../src/index.html'),
            inject: true,
            minify: true,
            hash: true,
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = devWebpackConfig.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            devWebpackConfig.devServer.port = port;

            devWebpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`runing here http://${ip}:${port}`]
                },
                onError: '/n'
            }));

            resolve(devWebpackConfig);
        }
    });
});
