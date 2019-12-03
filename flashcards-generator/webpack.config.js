const path = require("path");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const production = process.env.NODE_ENV === 'production'

const fileNameTemplate = ext => (production ?
  `[name].[hash].min.${ext}` :
  `[name].${ext}`)

const SRC_DIR = __dirname
const DIST_BUILD_DIR = path.resolve(__dirname, './dist')

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
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
    publicPath: "/dist/",
    filename: fileNameTemplate('js')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(
      ['NODE_ENV', 'FLASHCARDS_VAULT_HOSTNAME']
    )
  ]
};