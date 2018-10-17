const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const { client } = require('universal-webpack/config');
const settings = require('./universal-webpack-settings');
const config = require('./webpack.base.conf');

config.entry = {
    app: path.join(__dirname, '../server/entry.js')
};

config.optimization = {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            },
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                name: 'vendor',
                priority: -20,
                enforce: true
            },
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true
            }
        }
    },
    minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, // 不需要格式化
                    comments: false // 不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
    ]
};

config.plugins.push(
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, '../dist/index.html'),
        template: path.join(__dirname, '../dist/index.html'),
        inject: true
    })
);

const configuration = client(config, settings, {
    development: false,
    useMiniCssExtractPlugin: true
});

module.exports = configuration;
