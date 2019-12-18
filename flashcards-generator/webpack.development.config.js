const path = require("path");
const webpack = require("webpack");
const common = require('./webpack.config')
const merge = require('webpack-merge')

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "dist/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})