const CopyWebpackPlugin = require('copy-webpack-plugin');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const Dotenv = require('dotenv-webpack');

const hubspotConfig = ({ portal, autoupload } = {}) => {
  return {
    target: 'web',
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
          use: {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'webfonts',
                  publicPath: '../webfonts',
              },
          }
      },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },

    plugins: [
      new HubSpotAutoUploadPlugin({
        portal,
        autoupload,
        src: 'dist',
<<<<<<< Updated upstream
        dest: 'CartCards',
=======
        dest: 'CartCardsV2',
>>>>>>> Stashed changes
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        {
          from: 'src/modules',
          to: 'modules',
        },
      ]),
      new Dotenv({
        allowEmptyValues: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
    ],
  };
};

module.exports = [hubspotConfig];
