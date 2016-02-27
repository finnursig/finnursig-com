var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var resolve = {
  modulesDirectories: ['web_modules', 'node_modules', 'less', './src/components', './src'],
  extensions: ['', '.js', '.less', '.json']
};

module.exports = {
  name: 'browser',
  target: 'web',
  context: path.join(__dirname, '..'),
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/client'
  ],

  output: {
    publicPath: 'http://localhost:8080/static',
    path: 'dist/public',
    filename: 'client.js',
    sourceMapFilename: 'client.map'
  },

  devServer: {
    stats: {
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
  },

  resolve,

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: ['babel']
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ]
}
