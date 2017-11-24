var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // Create an index.html, also put it in dist folder, including index_bundle.js

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },       // REGEX, babel usa qualquer file que tenha .js como extensão
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'app/index.html'
    })]
}