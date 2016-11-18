var webpack =             require('webpack');
var HtmlWebpackPlugin =   require('html-webpack-plugin');
var ExtractTextPlugin =   require('extract-text-webpack-plugin');
var helpers =             require('./helpers');
var path =                require('path');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.component\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw', 'sass']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|app)/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  sassLoader: {
    includePaths: ['./src/sass', './node_modules/bootstrap/scss']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
