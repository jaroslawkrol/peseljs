var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./lib/index.ts",
    devtool: 'inline-source-map',
    output: {
        filename: "peseljs.min.js",
        path: path.resolve(__dirname, 'dist'),
        library: 'PeselJS'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ }]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};