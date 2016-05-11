var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
          'webpack-hot-middleware/client?reload=true',
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
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loaders:[
          'style-loader?sourceMap',
          'css'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins:[
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
}
