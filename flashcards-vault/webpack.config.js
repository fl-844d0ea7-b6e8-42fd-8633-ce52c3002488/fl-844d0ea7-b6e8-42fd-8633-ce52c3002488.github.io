const path = require("path");
const webpack = require("webpack");

const fileNameTemplate = ext => (production ?
  `[name].[hash].min.${ext}` :
  `[name].${ext}`)

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
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(
      [
        'NODE_ENV',
        'DB_CONNECTION'
      ]
    ),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
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
};