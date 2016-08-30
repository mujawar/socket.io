/**
 * Created by arif on 29/8/16.
 */
var app = require('express')();
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
    fs.readFile('./index.html','utf-8',function(error,content){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(content)
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket,username) {
    console.log('new user connected');
    socket.emit('message','you are connected to server!');

    socket.broadcast.emit('message','Another client has just connected!')


    // As soon as the username is received, it's stored as a session variable
    socket.on('little_newbie', function(username) {
        socket.username = username;
    });

    // When a "message" is received (click on the button), it's logged in the console
    socket.on('message', function (message) {
        // The username of the person who clicked is retrieved from the session variables
        console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);
    });

});

server.listen(5000);
console.log('server is  connected! at 5000');

















/*

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('user is connected')
    socket.on('chat message', function(msg){
        console.log('message: ' +msg);
    });
});



http.listen(5000,function(){
    console.log('sertver is started on 5000 port');
});


*/
