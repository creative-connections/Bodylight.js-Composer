const path = require('path')

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
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
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'src/theme/theme.config'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@scenes': path.resolve(__dirname, 'src/scenes/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@actions': path.resolve(__dirname, 'src/actions/'),
      '@exceptions': path.resolve(__dirname, 'src/exceptions/')
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
