const path = require("path");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.config.js')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const FLASHCARDS_VAULT_HOSTNAME = process.env.FLASHCARDS_VAULT_HOSTNAME
const NODE_ENV = process.env.NODE_ENV
const production = process.env.NODE_ENV === 'production'
const SRC_DIR = __dirname

module.exports = merge(common, {
  mode: production ? 'production' : "development",
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          include: [SRC_DIR]
        }
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: 'bundle.js'
  },
  devServer: {
    port: process.env.PORT,
    host: '0.0.0.0',
    compress: true,
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'dist/index.html',
      title: "Flashcards App",
      template: 'index.html',
      pageHeader: "Testing Page Header"
    }),
    new FaviconsWebpackPlugin('./public/flashcards.png'),
    new webpack.EnvironmentPlugin(
      {
        'NODE_ENV': NODE_ENV,
        'FLASHCARDS_VAULT_HOSTNAME': FLASHCARDS_VAULT_HOSTNAME
      }
    )
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
})