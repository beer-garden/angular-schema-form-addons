const path = require('path');
const webpack = require('webpack');

module.exports = {
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

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'ngtemplate-loader',
            options: { relativeTo: path.join(__dirname, 'src') }
          },
          'html-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'angular-schema-form-bootstrap': 'angular-schema-form-bootstrap/dist/angular-schema-form-bootstrap-bundled.js'
    }
  }
};
