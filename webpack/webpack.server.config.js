var path = require('path');
var webpack = require('webpack');

var resolve = {
  modulesDirectories: ['web_modules', 'node_modules', 'less', './src/components', './src'],
  extensions: ['', '.js', '.less', '.json']
};

module.exports = {
  name: 'server',
  target: 'node',
  context: path.join(__dirname, '..'),
  externals: /^[a-z\-0-9]+$/,

  entry: [
    'babel-polyfill',
    './src/server'
  ],

  output: {
    path: 'dist',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  resolve,

  module: {
    loaders: [
      {
        test: /\.json$/, loaders: ["json"]
      },
      {
        test: /\.jsx?/,
        loader: 'babel',
        query: {
          presets: ["react", "es2015"],
          babelrc: false
        }
      },
      {
        test: /\.less$/,
        loader: 'null'
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
			React: 'react'
		})
  ]
};
