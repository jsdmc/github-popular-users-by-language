var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './src/index'
    ]
  },
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias: {
      'containers' : path.resolve(ROOT_PATH, './src/containers'),
      'components' : path.resolve(ROOT_PATH, './src/components'),
      'redux-base' : path.resolve(ROOT_PATH, './src/redux-base'),
      'utils' : path.resolve(ROOT_PATH, './src/utils'),
      'config' : path.resolve(ROOT_PATH, './src/config')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    //"entry" keys will be a bundle names
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'src'),
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [
          path.resolve(ROOT_PATH, 'src'),
          path.resolve(ROOT_PATH, 'test')
        ],
        query: {
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      }
    ]
  }
};
