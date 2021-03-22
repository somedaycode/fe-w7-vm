var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js'); //상대 경로
var compiler = webpack(webpackConfig);
const express = require('express');
const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    //compiler 웹팩이 미들웨어 api호출
    publicPath: webpackConfig.output.publicPath, //
  })
);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(PORT, console.log('run server!'));
