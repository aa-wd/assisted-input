const path = require('path');
const webpack = require('webpack');

const { getWebpackPath, getExpressPath } = require('./get-dev-path');
const { webpackPort } = require('./settings.json');

const isDev = process.env.NODE_ENV === 'development';
const publicPath = `${getWebpackPath()}/`;


module.exports = {
  entry: {
    'main': './src/index.ts',
  },
  output: {
    publicPath,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: webpackPort,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts',]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        },
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [
          path.resolve(__dirname, './src')
        ],
      },
    ]
  }
}
