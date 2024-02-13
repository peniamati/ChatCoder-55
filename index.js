const express = require('express');
const handlebars = require('express-handlebars');
const homeRouter = require('./routes/home.router');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const PORT = 8080 || process.env.PORT;

let arrMessages = [];

//SERVER HTTP
const server = http.createServer(app);

//PUBLIC
app.use(express.static(__dirname + "/public"));

//ENGINE
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//ROUTES
app.use('/home', homeRouter);

//SOCKET SERVER
const io = new Server(server);
io.on('connection', (socket) => {
  console.log("Hola Nuevo Cliente")
  socket.emit('welcome', 'Bienvenido Cliente Nuevo');

  socket.on('new-message', (data) => {
    arrMessages.push(data);
    socket.emit('message-all', arrMessages);
  })
});

server.listen(PORT, () => {
  console.log("Server run on port " + PORT);
})