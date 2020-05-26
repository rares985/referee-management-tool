const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /* Entry point  */
  entry: './src/index.jsx',

  /* Where the bundle.js file will be created */
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      /* transpile To <= ES5, then lint */
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['babel-loader', 'eslint-loader'],
      },

      /* Load CSS */
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      /* Load images and fonts */
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './dist/assets/',
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    inline: true,
    contentBase: 'dist/',
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
};
