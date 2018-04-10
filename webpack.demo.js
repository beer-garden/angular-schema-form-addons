
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = {
  entry: {
    demo: path.join(__dirname, 'demo', 'app')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    watchContentBase: true,
    stats: 'minimal',
    port: 8081
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
  },

};
