const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

const SRC_DIR = __dirname
const CLIENT_DIR = path.resolve(SRC_DIR, 'client')
const PUBLIC_DIR = path.resolve(SRC_DIR, 'public')

module.exports = {
  entry: ['./src/client/index.js'],
  mode: production ? 'production' : 'development',
  devServer: { historyApiFallback: true },
  devtool: 'inline-source-map',
  output: {
    path: CLIENT_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      include: [SRC_DIR],
      options: {
        presets: ['@babel/preset-env'],
        envName: 'client',
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file-loader?name=[name].[ext]',
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'DB_CONNECTION',
      'API_KEY',
      'API_HOSTNAME',
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC_DIR, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ]
}