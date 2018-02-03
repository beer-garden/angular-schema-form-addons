
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {

  entry: {
    'addons': path.join(__dirname, 'src', 'addons.js'),
    'addons.min': path.join(__dirname, 'src', 'addons.js')
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    library: '[name]',
    libraryTarget: 'umd'
  },

  externals: {
    'jquery': 'jquery',
    'angular': 'angular',
    'angular-ui-bootstrap': 'angular-ui-bootstrap',
    'angular-schema-form-bootstrap': 'angular-schema-form-bootstrap',
    'eonasdan-bootstrap-datetimepicker': 'eonasdan-bootstrap-datetimepicker',
    'moment': 'moment',
    'moment-timezone': 'moment-timezone'
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  ]
});
