const webpack = require('webpack');
const path = require("path");
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require("./common");

module.exports = {
    entry: common.entry,
    output: {
        publicPath: '/',
        path: helpers.root('InfoTrack.iSupportMvc', 'wwwroot', 'dist'),
        filename: "index.js"
    },
    devtool: "source-map",
    resolve: common.resolve,

    module: {
        rules: common.rules
    },

    plugins: common.plugins,
    devServer: {
        historyApiFallback: true,
        port: 4444,
        contentBase: helpers.root("InfoTrack.iSupport.FrontEnd"),
        proxy: {
            '/api/Conveyancers/*': 'http://localhost:4444',
            '/api/Quotes/*': 'http://localhost:4444',
            '/dist/': 'http://localhost:4444'
        }
    }
};