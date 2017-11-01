const webpack = require('webpack');
const awesomeTsLoader = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        property: helpers.root("InfoTrack.iSupport.FrontEnd", "index.tsx")
    },
    rules: [
        {
            enforce: "pre",
            test: /\.tsx?$/,
            use: ["tslint-loader"],
            include: /client/,
            exclude: /node_modules/
        },
        {
            test: /\.tsx?$/,
            use: [
                'awesome-typescript-loader?{tsconfig: "tsconfig.json"}'
            ]
        },
        {
            test: /\.(jpg|png|svg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 25000,
            },
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader']
            })
        },
        //   { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
        //   { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },
        //   { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    }
}