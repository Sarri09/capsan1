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
    .select("nombre", "apellido", "email")
    .then(function (result) {
      if (result && result.length > 0) {
        const nombre = result[0].nombre;
        const apellido = result[0].apellido;
        const correo = result[0].email;
        return [nombre, apellido, correo];
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

  const notasTable = "Notas";

  const insertarNota = async ({ correoElectronico, nombreFormulario, puntaje }) => {
    try {
      await knex(notasTable).insert({
        email_user: correoElectronico,
        testName: nombreFormulario,
        Notascol: puntaje,
      });
      console.log('Datos insertados correctamente en la tabla Notas');
    } catch (error) {
      console.error('Error al insertar datos en la tabla Notas:', error);
      throw error;
    }
  };

  const obtenerNotas = async () => {
    try {
      const notas = await knex(notasTable).select('*');
      return notas;
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      throw error;
    }
  };

  const obtenerNotasUsuario = async (correoElectronico) => {
    try {
      const notas = await knex(notasTable)
        .where('email_user', correoElectronico)
        .select('*');
      return notas;
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      throw error;
    }
  };
  

  return { crearUsuario, autenticarUsuario, grapDataFromUser, verifAdmin, insertarNota, obtenerNotas, obtenerNotasUsuario };
};

module.exports = {
  databaseService,
};
