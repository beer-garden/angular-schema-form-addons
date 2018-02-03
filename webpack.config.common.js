const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compile ES6 and ES7 into ES5 code
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
