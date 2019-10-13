const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const path = require('path');
var webpack = require('webpack')

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, 'src/entry-server.js'),
  target: 'node',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('./package.json').dependencies)
})
