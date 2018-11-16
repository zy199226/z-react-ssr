const path = require('path');
const os = require('os');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const nodeExternals = require('webpack-node-externals');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {

    entry: {
        server: path.join(__dirname, '../server/index.js')
    },

    output: {
        path: path.resolve(__dirname, '../dist/server/'),
        filename: '[name].js',
        chunkFilename: '[name].[hash:8].js',
        libraryTarget: 'commonjs2'
    },

    target: 'node',

    node: {
        __filename: true,
        __dirname: true
    },

    externals: [nodeExternals({
        whitelist: [/\.css$/i]
    })],

    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: [
                    {
                        loader: 'happypack/loader?id=happyBabel'
                    }
                ],
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'ignore-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024,
                            outputPath: 'images',
                            publicPath: '/static/images/'
                        }
                    }
                ]
            },
            {
                test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5 * 1024,
                            outputPath: 'fonts',
                            publicPath: '../static/fonts/'
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },

    plugins: [
        new CleanWebpackPlugin(
            ['dist/server'],
            {
                root: path.join(__dirname, '../'),
                verbose: true,
                dry: false
            }
        ),
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new ProgressBarPlugin({
            format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
            clear: false
        })
    ]
};
