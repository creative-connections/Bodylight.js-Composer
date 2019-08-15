const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
          use: 'babel-loader',
        }, {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
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
        '@enum': path.resolve(__dirname, 'src/helpers/enum/'),
        '@actions': path.resolve(__dirname, 'src/actions/'),
        '@exceptions': path.resolve(__dirname, 'src/exceptions/'),
        '@runtime': path.resolve(__dirname, 'src/runtime/'),
        '@reducers': path.resolve(__dirname, 'src/reducers/'),
        '@src': path.resolve(__dirname, 'src/')
      }
    },
    optimization: {
      minimize: false,
      concatenateModules: false
    },
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
      overlay: {
        warnings: true,
        errors: true
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Composer - Bodylight.js',
        template: './src/template.hbs'
      }),
      new CopyWebpackPlugin([
        { from: 'node_modules/plotly.js/dist/plotly.min.js', to: 'lib/' },
        { from: 'lib/createjs-2015.11.26.min.js', to: 'lib/' },
      ]),
      new webpack.DefinePlugin({
        '__BUILD_DATE__': JSON.stringify((new Date()).getTime()),
      })
    ]
  }
}
