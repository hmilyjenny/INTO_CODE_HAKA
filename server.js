import Express from 'express';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';

var express = require("express");
var app = new Express();

import webpack from 'webpack';
import config from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}
import serverConfig from './config';
import dummyData from './dummyData';

mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  var conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  conn.once('open', function () {
    var gfs = Grid(conn.db);
    app.set('gridfs', gfs);
  });
  // feed some dummy data in DB.
  dummyData();
});

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(express.static(__dirname + "/public"));

import project from './api/routes/project.routes';
app.use('/api/project',project);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

var server=app.listen(serverConfig.port, (error) => {
  if (!error) {
    var port = server.address().port;
    console.log("App now running on port", port);
  }
});