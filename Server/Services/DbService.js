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
          // Aquí debes comparar la contraseña proporcionada con storedPassword (usando bcrypt o algún otro método seguro)
          // Si coinciden, devuelve true; de lo contrario, devuelve false.
          // No compares directamente con la contraseña en texto plano.
          // ...
          if (storedPassword === password) {
            return true;
          }
        } else {
          // Usuario no encontrado
          return false;
        }
      })
      .catch((e) => {
        console.log(e);
        // Maneja el error (por ejemplo, envía una respuesta HTTP con un código de error)
        return false;
      });
  };

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
          console.log('Data for cookie:', dataForCookie); // Agrega esta línea
          return dataForCookie;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return { crearUsuario, autenticarUsuario, grapDataFromUser };
};

module.exports = {
  databaseService,
};
