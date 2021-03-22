const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['./src/main.js', './src/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                  useBuiltIns: 'usage',
                  corejs: { version: 3, proposals: true },
                },
              ],
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
