
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',

  entry: {
    addons: path.join(__dirname, 'src', 'addons'),
    demo: path.join(__dirname, 'demo', 'app')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },

  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    watchContentBase: true,
    stats: 'minimal',
    port: 8078
  },

  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'moment': 'moment',
      'tv4': 'tv4'
    }),
  ]
});
