const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.jsx', '.jsx', '.json'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
};

