const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: [
      './src/index.jsx'
    ],
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }, {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: false
              }
            },
            'sass-loader'
          ]
        }, {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ]
        }, { // this rule handles images
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
          use: 'file-loader?name=[name].[ext]?[hash]'
        }, { // the following 3 rules handle font extraction
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }, {
          test: /\.otf(\?.*)?$/,
          use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
        }
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '../../theme.config$': path.join(__dirname, 'src/theme/theme.config'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@scenes': path.resolve(__dirname, 'src/scenes/'),
        '@helpers': path.resolve(__dirname, 'src/helpers/'),
        '@actions': path.resolve(__dirname, 'src/actions/'),
        '@exceptions': path.resolve(__dirname, 'src/exceptions/'),
        '@runtime': path.resolve(__dirname, 'src/runtime/'),
        '@reducers': path.resolve(__dirname, 'src/reducers/'),
        '@src': path.resolve(__dirname, 'src/')
      }
    },
    output: {
      path: __dirname + '/build/',
      filename: 'bundle.[hash].js'
    },
    optimization: {
      minimize: false,
      concatenateModules: false,
      minimizer: [new TerserPlugin({
        sourceMap: true,
        parallel: true,
        cache: './.build_cache/terser',
        exclude: /.*src.*/,
      })]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Composer - Bodylight.js',
        template: './src/template.hbs'
      }),
      new Dotenv({
        path: './.env.prod',
        safe: true,
        systemvars: false,
        silent: false
      }),
      new CleanWebpackPlugin(['build/*.js']),
      new CopyWebpackPlugin([
        { from: 'dist/images', to: 'images' }
      ])
    ]
  }
}