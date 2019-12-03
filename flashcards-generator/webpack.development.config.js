const path = require("path");
const webpack = require("webpack");
const common = require('./webpack.config')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

const fileNameTemplate = ext => (production ?
  `[name].[hash].min.${ext}` :
  `[name].${ext}`)

const DIST_BUILD_DIR = path.resolve(__dirname, './dist')

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    historyApiFallback: true
  }
})