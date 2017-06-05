// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')


var path = require('path');
var OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');

var opts = {
  rootDir: process.cwd(),
  devBuild: process.env.NODE_ENV !== 'production',
};

module.exports = merge(sharedConfig, {
  plugins: [
    new OnlyIfChangedPlugin({
      cacheDirectory: path.join(opts.rootDir, 'tmp/cache'),
      cacheIdentifier: opts, // all variable opts/environment should be used in cache key
    })
  ]
})
