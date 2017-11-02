const webpack = require('webpack');
const path = require("path");
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require("./common");

module.exports = {
    entry: common.entry,
    output: {
        publicPath: '/',
        path: helpers.root('frontend', 'dist'),
        filename: "index.test.js"
    },
    devtool: "source-map",
    resolve: common.resolve,

    module: {
        rules: common.rules
    },

    plugins: [
        // HtmlWebpackPluginConfig,
        new ExtractTextPlugin('main-bundle.css'),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("dev")
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 4444,
        contentBase: helpers.root("frontend"),
        proxy: {
            '/api/Conveyancers/*': 'http://localhost:4444',
            '/api/Quotes/*': 'http://localhost:4444',
            '/dist/': 'http://localhost:4444'
        }
    }
};