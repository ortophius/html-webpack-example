const webpack = require('webpack');
const path = require('path');
const html2bemdecl = require('html2bemdecl-loader');
const bemdecl2fs = require('bemdecl-to-fs-loader');
const Copy = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "pages", "index.js"),
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            { 
              test: /\.html$/, 
              use: [
                {
                  loader: 'bemdecl-to-fs-loader',
                  options: { levels: ['desktop'], extensions: ['css', 'js'] } // Add css and js files of BEM entities to bundle
                },
                { loader: 'html2bemdecl-loader' } // First, convert HTML to bem DECL format
              ] },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    plugins: [
        new Copy([
            { from: path.resolve(__dirname, 'pages'), test: /\.html$/, to: path.resolve(__dirname, "dist") }
        ])
    ]
}