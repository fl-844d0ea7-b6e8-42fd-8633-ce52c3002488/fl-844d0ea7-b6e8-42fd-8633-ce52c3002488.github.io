const path = require('path')
const webpack = require('webpack')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')

const production = process.env.NODE_ENV === 'production'

module.exports = merge(common, {
  mode: production ? 'production' : 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
})
