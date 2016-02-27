var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var client = require('./webpack.client.config');
var server = require('./webpack.server.config');

client.debug = server.debug = false;
client.devtool = server.devtool = false;

client.entry.shift();
client.plugins.shift();
client.module.loaders = client.module.loaders.map((item) => {
  if(item.id === 'less'){
    item.loader = ExtractTextPlugin.extract('style-loader', 'css!postcss!less');
  }

  return item;
});

client.plugins = client.plugins.concat([
  new ExtractTextPlugin('client.css'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
]);

module.exports = [server, client];
