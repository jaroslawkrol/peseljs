var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./lib/index.ts",
    output: {
        filename: "peseljs.min.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        loaders: [{ test: /\.ts$/, loader: "ts-loader" }]
    }
    plugins: [
        new UglifyJSPlugin()
    ]
}