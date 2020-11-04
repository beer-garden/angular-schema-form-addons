
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generate a test build
   * Karma will set this when it's a test build
   */
  entry: void 0,

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generate a test build
   * Karma will handle setting it up for you when it's a test build
   */
  output: {},

  devtool: 'inline-source-map',

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code
  // covearge reporting. Skips node_modules and files that end with .spec.js
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /.spec\.js$/,
          /tests\.webpack\.js$/
        ],
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      }
    ]
  }
});
