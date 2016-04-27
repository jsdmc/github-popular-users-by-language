var webpackConfigDev = require('./webpack.config.dev');
var webpack = require('webpack');
var argv = require('optimist').argv;

var webpackConfigTests = webpackConfigDev;
// value - "mocha!" for tests in browser
var rootLoader = argv.rootLoader || '';

webpackConfigTests.entry = rootLoader + './tests/testsRoot.js';

webpackConfigTests.externals = {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

webpackConfigTests.output = {
  path: 'tests/build/',
  filename: 'bundle.js',
  publicPath: '/tests'
};

webpackConfigTests.module.loaders.forEach(function (item){
  // remove react-hmre which wraps rendered component with <RedBox />
  // we don't neeed this in tests, lets see all errors in mocha reporter
  if (item.loader === 'babel') {
    delete item.query.env;
  }
});

module.exports = webpackConfigTests;