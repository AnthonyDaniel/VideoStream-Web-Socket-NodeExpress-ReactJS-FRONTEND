const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const sio = require('socket.io');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express(),
  options = { 
    //OBLIGATORIO, SINO NO FUNCIONA
    key: fs.readFileSync(__dirname + '/rtc-video-room-key.pem'),
    cert: fs.readFileSync(__dirname + '/rtc-video-room-cert.pem')
  },
  port = process.env.PORT || 3000,
  server = process.env.NODE_ENV === 'production' ?
    http.createServer(app).listen(port) :
    https.createServer(options, app).listen(port), //RTC NO FUNCIONA SIN LOS CERTIFICADOS, AUNQUE ESTOS NO SEAN VALIDOS
  io = sio(server);

// Basicamente  usamos el build de react, para inyectarlo a node js
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res) => res.sendFile(__dirname + '/build/index.html'));
app.use(favicon('./build/favicon.ico'));

// Switch off the default 'X-Powered-By: Express' header
app.disable('x-powered-by');

//Hacemos conexión io.sockets
io.sockets.on('connection', socket => {
  
  console.log("Se ha creado la conexión");

  let room = '';
  
  // Envío a todas las clientes en la sala (canal) excepto remitente
  socket.on('message', message => {
    socket.broadcast.to(room).emit('message', message);
    console.log(message);
  });

  socket.on('find', () => {
    const url = socket.request.headers.referer.split('/');
    room = url[url.length - 1];
    const sr = io.sockets.adapter.rooms[room];
    if (sr === undefined) {
      // No se encontro una sala, así que por favor crearlos
      socket.join(room);
      socket.emit('create');
    } else if (sr.length === 1) {
      socket.emit('join');
    } else { // Maximo solo dos sesiones a la vez
      socket.emit('full', room);
    }
  });

  socket.on('auth', data => {
    data.sid = socket.id;
    // Envío a todas las clientes en la sala (canal) excepto remitente
    socket.broadcast.to(room).emit('approve', data);
  });

  socket.on('accept', id => {
    io.sockets.connected[id].join(room);
    // enviando a todos los clientes en la sala de 'juegos' (canal), incluye remitente
    io.in(room).emit('bridge');
  });

  socket.on('reject', () => {  
    socket.emit('full')
  });

  socket.on('leave', () => {
    // Envío a todos los clientes en la sala (canal) excepto remitente
    socket.broadcast.to(room).emit('hangup');
    socket.leave(room);});
});
