const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { getWebpackPath } = require('./get-dev-path');

const isDev = process.env.NODE_ENV === 'development';
const publicPath = `${getWebpackPath()}/`;

module.exports = {
  entry: {
    'main': './src/index.ts',
  },
  output: {
    publicPath: isDev ? publicPath : '/',
    path: path.resolve(__dirname, './dist'),
    library: 'assistedInput',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  plugins: [

  ],
  resolve: {
    extensions: ['.js', '.ts',],
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
        use: [
          isDev ?
            'style-loader':
            MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        include: [
          path.resolve(__dirname, './src')
        ],
      },
    ]
  }
}
