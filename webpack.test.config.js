//在终端中输入webpack命令时是自动读取webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './app/test-counter/test.tsx',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, './app/test-counter')
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
        }]
    },
    devtool: 'eval',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/test-counter/index.tmpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './app/test-counter',
        port: '8081',
        hot: true,
        inline: true
    }
}