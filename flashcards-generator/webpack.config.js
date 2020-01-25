const path = require("path");
const webpack = require("webpack");
const production = process.env.NODE_ENV === 'production'

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
  plugins: [
    new webpack.EnvironmentPlugin(
      [
        'NODE_ENV',
        'FLASHCARDS_VAULT_HOSTNAME'
      ]
    ),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};