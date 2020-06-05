const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = (env = {}) => {
  return {
    entry: {
      main: './index.tsx'
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ IS_LOCAL: env.NODE_ENV === 'local' }),
      new HtmlWebpackPlugin({
        templateContent: '<div id="chatApp"></div>',
        title: 'Chat!',
        favicon: './public/assets/sun.svg',
        meta: {
          viewport: {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1'
          },
          charset: 'utf-8',
          author: 'soldeplatadeveloper@gmail.com'
        }
      })
    ],
    resolve: {
      modules: [__dirname, 'src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  }
}
