var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var client = require('./webpack.client.config');
var server = require('./webpack.server.config');

client.debug = server.debug = false;
client.devtool = server.devtool = false;

client.output.filename = 'client-[hash].js';
client.output.sourceMapFilename = 'client-[hash].map';
client.entry.shift();
client.plugins.shift();
client.module.loaders = client.module.loaders.map((item) => {
  if(item.id === 'less'){
    item.loader = ExtractTextPlugin.extract('style-loader', 'css!postcss!less');
  }

  return item;
});

client.plugins = client.plugins.concat([
  function() {
    this.plugin('done', function(stats) {
      require('fs').writeFileSync(
        path.join(__dirname, '..', 'dist', 'stats.json'),
        JSON.stringify(stats.toJson().assets));
    });
  },
  new ExtractTextPlugin('client-[hash].css'),
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
