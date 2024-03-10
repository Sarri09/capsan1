require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const { databaseService } = require('./Services/DbService');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const dbservice = databaseService();

require('./routes')(app, dbservice);

app.listen(5000, () => {
    console.log(`App escuchando en el puerto 5000!`)
  });