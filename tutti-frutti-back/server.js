// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Session imports
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');

// Express app creation
const app = express();

// Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Session configurations
let sessionStore = new session.MemoryStore;
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());

// Configuraciones de passport
require('./configs/passport');
app.use(passport.initialize());
app.use(passport.session());

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }))

// Static files
app.use('/', express.static(__dirname + '/public'));

// Routes
app.use('/', webRoutes);

/**
 * SOCKETS BEGIN
 */

const { v4: uuidv4 } = require('uuid');
const peopleNames = require('people-names');
let connectedClients = 0;
let activePlayers = 0;
let gameInProgress = false;
let sockets = [];
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));

// Find if socket is in room 'active-players'
// io.sockets.adapter.sids[socket.id]['active-players']

io.on('connection', (socket) => {
  // Count clients
  //console.log('Client '+socket.id+' connected');
  connectedClients++;
  //console.log('Total clients: '+connectedClients);

  // Get active players
  if(io.sockets.adapter.rooms['active-players']){
    activePlayers = io.sockets.adapter.rooms['active-players'].length;
  }else{
    activePlayers = 0;
  }

  // Set active players on socket
  socket.emit('connected-clients',activePlayers);

  // Animal selection trigger
  socket.on('select-animal', (animal,callback) => {
    if(!io.sockets.adapter.sids[socket.id]['active-players']){
      activePlayers++;
      socket.join('active-players');
    }
    let token = uuidv4();
    io.sockets.emit('connected-clients',activePlayers);
    callback(token,{connectedClients:activePlayers});
  })

  socket.on('player-waiting', token => {
    socket.join('waiting-room');
    //if(io.sockets.adapter.rooms['waiting-room']){
    //  console.log('hay '+io.sockets.adapter.rooms['waiting-room'].length+' jugadores esperando');
    //}
  });

  socket.on('game-in-progress', (callback) => {
    callback(gameInProgress);
  });

  socket.on('player-inactive', () => {
    if(io.sockets.adapter.sids[socket.id]['active-players']){
      socket.leave('active-players');
      activePlayers--;
      io.sockets.emit('connected-clients',activePlayers);
    }
  });

  socket.on('player-ready',(callback) => {
    randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    socket.leave('waiting-room');
    socket.join('gaming-players');
    if(!io.sockets.adapter.rooms['waiting-room']){
      setTimeout(() => {
        gameInProgress = true;
        console.log('gameInProgress: '+gameInProgress);
        console.log('game started');
      },1000);
    }
    callback();
  });
  
  socket.on('done-waiting',(callback) => {
    console.log('someone was waiting');
    socket.leave('waiting-room');
    socket.join('gaming-players');
    callback();
    if(!io.sockets.adapter.rooms['waiting-room']){
      setTimeout(() => {
        gameInProgress = true;
        console.log('gameInProgress: '+gameInProgress);
        console.log('game started');
      },1000);
    }
  });

  socket.on('create-letter',(callback) => {
    setTimeout(() => {
      callback(randomLetter);
    },1000)
  });

  socket.on('grade-me', (name,color,fruit,callback) => {
    var grade = 0;
    console.log('Recibí:');
    console.log(name);
    console.log(color);
    console.log(fruit);
    callback(grade);
  });
  
  socket.on('end-game',(ready) => {
    if(gameInProgress){
      var countdown = 10;
      var interval = setInterval(() => {
        if(countdown >= 0){
          io.sockets.in('gaming-players').emit('countdown',countdown);
          console.log(countdown);
          countdown--;
        }else{
          gameInProgress = false;
          if(io.sockets.adapter.rooms['gaming-players']){
            console.log(io.sockets.adapter.rooms['gaming-players']);
          }
          io.sockets.in('gaming-players').emit('game-ended');
          if(io.sockets.adapter.rooms['gaming-players']){
            io.of('/').in('gaming-players').clients((error, socketIds) => {
              if (error) throw error;
            
              socketIds.forEach(socketId => io.sockets.sockets[socketId].leave('gaming-players'));
            
            });
          }
          io.sockets.emit('game-has-finished',true);
          console.log('game has finished');
          console.log('gameInProgress: '+gameInProgress);
          clearInterval(interval);
        }
      },1000);
    }
  });

  // Socket disconnecting
  socket.on('disconnecting', () => {
    if(io.sockets.adapter.sids[socket.id]['active-players']){
      activePlayers--;
    }
  });

  // Socket disconnected
  socket.on('disconnect', () => {
    socket.emit('remove-data','adiós');

    // console.log('Socket '+socket.id+' disconnected');
    connectedClients--;

    io.sockets.emit('connected-clients',activePlayers);
  })
});

/**
 * SOCKETS END
 */

// App init
server.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
