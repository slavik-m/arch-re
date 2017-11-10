const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/client/entry.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loaders: ['happypack/loader?id=jsx'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      state: path.join(__dirname, './src/client/stateManagement/state'),
    },
  },
  // devtool: 'cheap-module-source-map',
  plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader'],
    }),
    new HtmlWebpackPlugin({
      title: 'Architecture re',
      template: path.resolve(__dirname, './src/client/assets/index.html'),
      filename: 'index.html',
      env: process.env.NODE_ENV,
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, './src/client/assets/favicon.ico') },
      { from: path.join(__dirname, './src/client/assets/css'), to: 'assets/css' },
      // { from: path.join(__dirname, './src/client/assets/fonts'), to: 'assets/fonts' },
      { from: path.join(__dirname, './src/client/assets/img'), to: 'assets/img' },
    ]),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
  devServer: {
    port: 8080,
    host: 'localhost',
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
    historyApiFallback: true,
    noInfo: false,
    stats: {
      chunks: false,
    },
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
};