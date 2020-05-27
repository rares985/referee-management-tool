const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /* Entry point  */
  entry: './src/index.jsx',

  /* Where the bundle.js file will be created */
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/',
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

      /* Load SCSS, then CSS */
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      /* Load images and fonts */
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          /* Relative to output-folder */
          outputPath: 'assets/',
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  devServer: {
    inline: true,
    contentBase: 'dist/',
    disableHostCheck: true,
    open: 'chrome',
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
};
