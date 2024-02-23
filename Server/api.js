const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

app.listen(5000, () => {
    console.log(`App escuchando en el puerto 5000!`)
  });