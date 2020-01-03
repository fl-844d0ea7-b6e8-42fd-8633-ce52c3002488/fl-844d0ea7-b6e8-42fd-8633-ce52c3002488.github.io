const path = require("path");
var webpack = require("webpack")
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./app.js",
  mode: "development",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  plugins: [
    new webpack.EnvironmentPlugin(
      [
        'NODE_ENV',
        'DB_CONNECTION'
      ]
    ),
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: 'bundle.js'
  },
};