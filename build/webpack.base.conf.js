const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const devMode = process.env.NODE_ENV === 'production';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const staticPath = devMode ? 'static/' : '';

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },

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
                    devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024, // 图片大小 > limit 使用file-loader, 反之使用url-loader
                        outputPath: 'images',
                        // publicPath: '../images/'
                    }
                ]
            },
            {
                test: /\.(svg|bmp|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024, // 图片大小 > limit 使用file-loader, 反之使用url-loader
                        outputPath: 'assets',
                        publicPath: '../assets/'
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

    stats: {
        children: false,
        modules: false,
        warnings: false
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].[hash:8].css' : 'css/[name].css',
            chunkFilename: devMode ? 'css/[id].[hash:8].css' : 'css/[id].css'
        }),
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
