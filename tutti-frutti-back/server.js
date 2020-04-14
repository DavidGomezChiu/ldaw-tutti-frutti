// Imports
const express = require('express');

// Express app creation
const app = express();

// Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Configurations
const appConfig = require('./configs/app');

/**
 * SOCKETS BEGIN
 */

const { v4: uuidv4 } = require('uuid');
const peopleNames = require('people-names');
const namedColors = require('color-name-list');
const fruitList = require('./public/data/fruits.json');
let connectedClients = 0;
let activePlayers = 0;
let gameInProgress = false;
let sockets = [];
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));

let responesNames = [];
let responesColors = [];
let responesFruits = [];

let grades = [];

let colors = [];

namedColors.forEach(color => {
  colors.push(color.name.toUpperCase())
});

let fruits = [];

fruitList.fruits.forEach(fruit => {
  fruits.push(fruit.toUpperCase())
});

io.on('connection', (socket) => {
  connectedClients++;

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
    sockets.push({token:token,animal:animal});
    io.sockets.emit('connected-clients',activePlayers);
    callback(token,{connectedClients:activePlayers});
  })

  socket.on('player-waiting', token => {
    socket.join('waiting-room');
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
      },1000);
    }
    callback();
  });
  
  socket.on('done-waiting',(callback) => {
    socket.leave('waiting-room');
    socket.join('gaming-players');
    callback();
    if(!io.sockets.adapter.rooms['waiting-room']){
      setTimeout(() => {
        gameInProgress = true;
      },1000);
    }
  });

  socket.on('create-letter',(callback) => {
    responesNames = [];
    responesColors = [];
    responesFruits = [];
    grades = [];
    setTimeout(() => {
      callback(randomLetter);
    },1000)
  });

  socket.on('grade-me', (name,color,fruit, token,callback) => {
    name = name.toUpperCase();
    color = color.toUpperCase();
    fruit = fruit.toUpperCase();

    responesNames.push(name);
    responesColors.push(color);
    responesFruits.push(fruit);

    var grade = 0;

    if(name !== ''){
      if(name[0] == randomLetter){
        if(peopleNames.isPersonName(name)){

          let count = 0;

          responesNames.forEach(nameInArray => {
            if(nameInArray == name){
              count++;
            }
          });

          count--;

          grade += 10 - count;
        }
      }
    }
    if(color !== ''){
      if(color[0] == randomLetter){
        if(colors.includes(color)){

          let count = 0;

          responesColors.forEach(colorInArray => {
            if(colorInArray == color){
              count++;
            }
          });

          count--;

          grade += 10 - count;

        }
      }
    }
    if(fruit !== ''){
      if(fruit[0] == randomLetter){
        fruits.forEach(existingFruit => {
          if(existingFruit == fruit){
            
            let count = 0;
    
            responesFruits.forEach(fruitInArray => {
              if(fruitInArray == fruit){
                count++;
              }
            });
    
            count--;
    
            grade += 10 - count;

          }
        });
      }
    }
    grades.push({token:token, grade:grade});
    callback(grade);
  });

  socket.on('send-winners', callback => {
    let winners = [];
    let best = -1;
    grades.forEach(player => {
      let playerAnimal = '';

      sockets.forEach(s => {
        if(s.token == player.token){
          playerAnimal = s.animal;
        }
      });

      if (player.grade > best){
        winners = [];
        best = player.grade;
        winners.push({token:player.token,animal:playerAnimal});
      }else{
        if(player.grade == best){
          winners.push({token:player.token,animal:playerAnimal})
        }
      }
    });
    callback(winners);
  });
  
  socket.on('end-game',(ready) => {
    if(gameInProgress){
      var countdown = 10;
      var interval = setInterval(() => {
        if(countdown >= 0){
          io.sockets.in('gaming-players').emit('countdown',countdown);
          countdown--;
        }else{
          gameInProgress = false;
          io.sockets.in('gaming-players').emit('game-ended');
          if(io.sockets.adapter.rooms['gaming-players']){
            io.of('/').in('gaming-players').clients((error, socketIds) => {
              if (error) throw error;
            
              socketIds.forEach(socketId => io.sockets.sockets[socketId].leave('gaming-players'));
            
            });
          }
          io.sockets.emit('game-has-finished',true);
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
