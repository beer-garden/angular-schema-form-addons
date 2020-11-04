
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    addons: path.join(__dirname, 'src', 'addons'),
  },
  devtool: 'cheap-module-eval-source-map',
});
