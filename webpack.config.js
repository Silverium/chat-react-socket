const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = env => {
  const { NODE_ENV } = env
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
      NODE_ENV === 'prod' ? new CleanWebpackPlugin() : () => {},
      new HtmlWebpackPlugin({
        template: './index.html'
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
