var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: 'source-map',
  entry: 'mocha!./src/test/testRoot.js',
  resolve : {
    extensions : ['', '.js', '.jsx', '.json'],
    alias: {
      'containers' : path.resolve(ROOT_PATH, './src/containers'),
      'components' : path.resolve(ROOT_PATH, './src/components'),
      'redux-base' : path.resolve(ROOT_PATH, './src/redux-base'),
      'utils' : path.resolve(ROOT_PATH, './src/utils'),
      'config' : path.resolve(ROOT_PATH, './src/config')
    }
  },
  externals: {
    jsdom: 'window',
    // cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  },
  output: {
    path: 'dist/',
    filename: 'bundle.js',
    publicPath: '/tests'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: path.resolve(ROOT_PATH, 'src')
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.json$/,
        loader: 'null-loader'
      }
    ]
  }
};
