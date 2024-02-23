const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './src'), 
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      context: ['/**'],
      target: 'http://localhost:3000/',
      secure: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /\node_modules/,
        use: {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vacation App',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
};
