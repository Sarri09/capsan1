require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const { databaseService } = require('./Services/DbService');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,  
}));
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

const dbservice = databaseService();

require('./routes')(app, dbservice);

app.listen(5000, () => {
    console.log(`App escuchando en el puerto 5000!`)
});
