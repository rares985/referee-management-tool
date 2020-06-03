const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env')
}).parsed;

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => {
  const envKeys = Object.keys(dotenv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(dotenv[next]);
    return prev;
  }, {});

  return {
    /* Entry point  */
    entry: './src/index.jsx',
  
    /* Where the bundle.js file will be created */
    output: {
      path: __dirname + '/dist',
      // publicPath: '/',
      filename: 'bundle.js',
    },
  
    module: {
      rules: [
        /* Transpile To <= ES5 */
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
            /* Relative to output path */
            outputPath: 'assets/',
          },
        },
      ],
    },
  
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true,
          },
          sourceMap: true,
        }),
      ],
    },
  
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
  
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        /* Relative to output path: */
        filename: 'index.html',
        template: 'src/index.html',
      }),
      // new BundleAnalyzerPlugin(),
    ],

  }
};
