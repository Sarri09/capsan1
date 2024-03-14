// conexion a mongo
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://andresmadariaga:123@cluster0.vf6mvzo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

const dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
dbMongo.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// mongo modelo

let formularioModelo = null; // Variable para almacenar el modelo Formulario

const defineFormularioSchema = () => {
  if (!formularioModelo) { // Verifica si el modelo ya está definido
    const respuestaSchema = new mongoose.Schema({
      respuesta: String,
    });
  
    const preguntaSchema = new mongoose.Schema({
      pregunta: String,
      respuestas: [respuestaSchema],
      respuestacorrecta: Number,
    });
  
    const formularioSchema = new mongoose.Schema({
      nombre: String,
      preguntas: [preguntaSchema],
    });
  
    formularioModelo = mongoose.model('Formulario', formularioSchema); // Almacena el modelo en la variable
  }
};

module.exports = {
  defineFormularioSchema,
};

// conexion a mysql
const databaseService = () => {
  const knex = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
    },
  });
  const table = "usuario";

  // crear
  const crearUsuario = ({ email, nombre, apellido, password }) => {
    return knex(table).insert({
      email: email,
      nombre: nombre,
      apellido: apellido,
      password: password,
    });
  };

  // autenticar
  const autenticarUsuario = ({ email, password }) => {
    return knex(table)
      .where({ email: email })
      .select("password")
      .then((rows) => {
        if (rows.length > 0) {
          const storedPassword = rows[0].password;
          // ENCRIPTAR CONTRASEÑAAA
          if (storedPassword === password) {
            return true;
          }
        } else {
          return false;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  // para cookie de nombre y apellido
  const grapDataFromUser = (email) => {
    return knex(table)
      .where({ email: email })
      .select("nombre", "apellido")
      .then(function (result) {
        if (result && result.length > 0) {
          const nombre = result[0].nombre;
          const apellido = result[0].apellido;
          console.log(`Nombre: ${nombre}, Apellido: ${apellido}`);
          const dataForCookie = [nombre, apellido];
          console.log('Data for cookie:', dataForCookie);
          return dataForCookie;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // cookie para verificar admin pero ojo, no utilizar para accesos, es vulnerable
  const verifAdmin = (email) => {
    return knex(table)
      .where({ email: email })
      .select("IsAdmin")
      .then(function (result) {
        if (result && result.length > 0) {
          const isAdmin = result[0].IsAdmin; 
          console.log(`isAdmin?: ${isAdmin}`);
          if (isAdmin === 1) {
            return true;
          } else {
            return false;
          }
        } else {
          return false; 
        }
      })
      .catch(function (error) {
        console.log(error);
        throw error; 
      });
  };

  // Llama a la función defineFormularioSchema aquí
  defineFormularioSchema();

  // Incluye la función defineFormularioSchema en el objeto que exportas
  return { crearUsuario, autenticarUsuario, grapDataFromUser, verifAdmin, defineFormularioSchema };
};

module.exports = {
  databaseService,
};
