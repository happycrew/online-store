const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const MinCss = require('mini-css-extract-plugin')

module.exports = {
  target: 'web',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true
  },

  entry: path.resolve(__dirname, './src/index.ts'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' }, // добавил правило ts-loader
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MinCss.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(png|mp3|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
      {
        test: /\*.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-formatter-pretty')
        }
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'] // Добавил .ts и .tsx
  },

  plugins: [
    new MinCss(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new EslintPlugin({ extensions: ['ts'] })
  ]
}
