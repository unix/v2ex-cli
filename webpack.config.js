const fs = require('fs')
const webpack = require('webpack')
const path = require('path')
const promisify = require('util').promisify
const readDir = promisify(fs.readdir)
const manifest = require('./package.json')

const externals = Object.keys(manifest.dependencies).reduce((pre, next) =>
  Object.assign({}, pre, { [next]: `require('${next}')`}), {})

module.exports = (async() => {
  const entries = await readDir('./bin')
  const entriesMap = entries.reduce((pre, next) => Object.assign({},
    pre, { [next.split('.js')[0]]: path.resolve(__dirname, `./bin/${next}`) }), {})
  
  return {
    target: 'node',
    
    externals: externals,
    
    entry: entriesMap,
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    
    module: {
      rules: [{
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2017'],
          compact: false,
        },
      }],
    },
    
    plugins: [
      new webpack.BannerPlugin({
        raw: true,
        banner: '#!/usr/bin/env node',
      }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['vendor', 'manifest'],
      // }),
    ],
  }
})()
