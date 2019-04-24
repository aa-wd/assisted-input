const webpack = require('webpack');

const base = require('./webpack.config');
const { webpackPort } = require('./settings.json');

const devPlugins = base.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
]);

module.exports = Object.assign({}, base, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: webpackPort,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  plugins: devPlugins,
});
