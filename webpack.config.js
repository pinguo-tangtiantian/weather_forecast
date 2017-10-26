//在终端中输入webpack命令时是自动读取webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './app/page/index.tsx',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, './app/page')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        },{
            test: /\.css?$/,
            loader: 'style-loader!css-loader'
        },{
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        },{
            test: /\.(woff|woff2)$/,
            loader:"url-loader?prefix=font/&limit=5000"
        },{
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=application/octet-stream"
        },{
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader?limit=10000&mimetype=image/svg+xml"
        }]
    },
    devtool: 'eval',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/page/index.tmpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './app/page',
        port: '3000',
        hot: true,
        inline: true
    }
}