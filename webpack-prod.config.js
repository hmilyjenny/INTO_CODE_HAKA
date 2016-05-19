var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
          './client/src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module:{
    loaders:[
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loaders:[
          'style-loader?sourceMap',
          'css'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|ico)([\?]?.*)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins:[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
}
