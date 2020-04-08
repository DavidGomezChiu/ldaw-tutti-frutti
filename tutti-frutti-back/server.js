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

const { v4: uuidv4 } = require('uuid');
let connectedClients = 0;
io.on('connection', (socket) => {
  console.log('Client '+socket.id+' connected');
  connectedClients++;
  console.log('Total clients: '+connectedClients);

  io.sockets.emit('connected-clients',connectedClients);

  socket.on('select-animal', (animal,callback) => {
    console.log('animal-selected: '+animal);
    callback(uuidv4(),{connectedClients:connectedClients});
  })

  socket.on('disconnect', () => {
    console.log('Socket '+socket.id+' disconnected');
    connectedClients--;
    console.log('Total clients: '+connectedClients);
    io.sockets.emit('connected-clients',connectedClients);
  })
})

// App init
server.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
