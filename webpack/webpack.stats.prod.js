const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: '',
  entry: ['./src/stats/index.ts'],
  output: {
    publicPath: 'static/stats',
    path: path.resolve(__dirname, '../dist/stats'),
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].[contenthash].bundle.js'
        }
      }
    },
    minimizer: [
      new TerserPlugin({ extractComments: 'all' })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/stats/index.html'
    })
  ]
}
