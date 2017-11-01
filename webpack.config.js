const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.babelrc = true;

  webpackConfig.babel.plugins.push('transform-runtime');

  webpackConfig.babel.plugins.push(['import', {
    style: 'css',  // if true, use less
    libraryName: 'antd-mobile',
  }]);

  webpackConfig.module.loaders[12] =
  {
    test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
    loader: 'url-loader?limit=8192&name=img/[name].[ext]'
  };
  webpackConfig.plugins.push(new CopyWebpackPlugin([{
    from: __dirname + '/favicon.ico',
    to: __dirname + '/build/invoice-m/'
  },
    {
      from: __dirname + '/MP_verify_c8WjLMHlkPeW5ZkX.txt',
      to: __dirname + '/build/invoice-m/'
    },{
      from: __dirname + '/MP_verify_RcHQBSU00nuj9TWP.txt',
      to: __dirname + '/build/invoice-m/'
    }]));

  return webpackConfig;
};
