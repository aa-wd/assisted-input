const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.config');

const prodPlugins = base.plugins.concat([
  new MiniCssExtractPlugin({
    filename: '[name].css',
  })
]);

module.exports = Object.assign({}, base, {
  mode: 'production',
  plugins: prodPlugins,
});
