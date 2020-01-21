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
        test: /\.(js)$/,
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
        'DB_USER',
        'DB_PASSWORD',
        'DB_NAME',
        'DB_SOCKET',
        'DB_PORT'
      ]
    ),
  ],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: 'bundle.js'
  },
};