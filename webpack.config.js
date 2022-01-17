const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
    mode: "development",
    //entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        writeToDisk: true
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
}