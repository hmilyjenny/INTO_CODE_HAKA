import Express from 'express';
import path from 'path';

var express = require("express");
var app = new Express();

//app.use(express.static(__dirname + "/public"));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

var server=app.listen(serverConfig.port, (error) => {
  if (!error) {
    var port = server.address().port;
    console.log("App now running on port", port);
  }
});