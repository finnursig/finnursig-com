var webpack = require('webpack');
var client = require('./webpack.client.config');
var server = require('./webpack.server.config');

client.debug = server.debug = false;
client.devtool = server.devtool = false;

client.entry.shift();
client.plugins.shift();

client.plugins.concat([
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
