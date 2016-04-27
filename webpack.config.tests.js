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

module.exports = webpackConfigTests;