import Express from 'express';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import SocketServer from 'socket.io';

var express = require("express");
var app = new Express();

import webpack from 'webpack';
import config from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}
import serverConfig from './config';
import dummyData from './dummyData';

var io = new SocketServer(serverConfig.socketPort);
io.of(serverConfig.socketURL).on('connection', function (socket) {
    console.log("用户ID:" + socket.client.id + "链接成功");
    socket.emit('new message', {
        message: "Hello World=>" + socket.client.id
    });
    // 当客户端发出“new message”时该监听开始执行
    socket.on('new message', function (data) {
        // socket.broadcast.emit为广播
        // socket.emit为当前链接
        socket.emit('new result', {
            message: "Server Response=>" + socket.client.id
        });
    });
    // 当有客户端断开链接时执行
    socket.on('disconnect', function () {
        console.log("用户ID:" + socket.client.id + "已断开链接");
    });
});

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

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(express.static(__dirname + "/public"));

import project from './api/routes/project.routes';
import channel from './api/routes/channels.routes';
app.use('/api/project', project);
app.use('/api/channels', channel);

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

var server = app.listen(serverConfig.port, (error) => {
    if (!error) {
        var port = server.address().port;
        console.log("App now running on port", port);
    }
});