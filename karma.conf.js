var webpack = require("webpack");
module.exports = function(config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      // Set framework to mocha
      'mocha'
    ],

    reporters: [
      // Reference: https://githbu.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'progress',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'

      //'spec'
    ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/tv4/tv4.js',
      'src/tests.webpack.js'
    ],

    preprocessors: {
      // Reference: http://webpack/github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },

    browsers: ['PhantomJS'],

    coverageReporter: {

      dir: 'build/coverage/',
      reporters: [
        { type: 'html'},
        { type: 'text'},
        { type: 'text-summary'}
      ]
    },

    webpack: require('./webpack.config.test'),

    // Hide webpack build information from output
    webpackMiddleWare: {
      noInfo: 'errors-only'
    }

  });
};
