const path = require("path");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const common = require('./webpack.config.js')

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
          include: [SRC_DIR],
            options: {
              envName: 'client'
            },
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new FaviconsWebpackPlugin('./public/flashcards.png'),
    new webpack.EnvironmentPlugin(
      ['NODE_ENV', 'FLASHCARDS_VAULT_HOSTNAME']
    )
  ]
})