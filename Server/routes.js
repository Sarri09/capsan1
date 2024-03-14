const { request, response } = require('express');

module.exports = function(app, databaseService) {
  const checkAuth = (req, res, next) => {
      console.log('Session:', req.session);
      if (req.session.isAuthenticated && req.session.isAdmin) {
          next();
      } else {
          res.status(401).send('Acceso no autorizado');
      }
  };
  
  app.post('/register', (req, res) => {
      const data = req.body;
      console.log(data);

      databaseService.crearUsuario(data)
          .then(() => {
              res.json({ "mensaje": "Usuario registrado con éxito" });
          }).catch(e => {
              res.status(500).json(e);
          });
  });

  app.post('/login', (req, res) => {
      const data = req.body;
      console.log("recibiendo usuario: \n" + data + "\n para verificación");

      Promise.all([
          databaseService.autenticarUsuario(data),
          databaseService.grapDataFromUser(data.email),
          databaseService.verifAdmin(data.email)
      ])
      .then(([isAuthenticated, userData, isAdmin]) => {
          if (isAuthenticated) {
              req.session.isAuthenticated = true;
              req.session.userData = userData;
              req.session.isAdmin = isAdmin;

              res.json({
                  isAuthenticated: true,
                  userData: JSON.stringify(userData),
                  isAdmin: !!isAdmin, 
              });            
          } else {
              res.status(401).json({ "mensaje": "Correo electrónico o contraseña no encontrados" });
          }
      })
      .catch(e => {
          res.status(500).json(e);
      });
  });

  app.get('/ruta-protegida', checkAuth, (req, res) => {
      console.log('Autenticado:', req.session.isAuthenticated);
      console.log('Admin:', req.session.isAdmin);
      res.json({ message: 'Bienvenido, administrador' });
  });  
  
  // app.post('/leerforms', (req, res) => {
  //     const data = req.body;

  //     databaseService.defineFormularioSchema(data)
  //         .then(() => {
  //             res.json({ message: 'Formulario insertado con éxito en la base de datos' });
  //         })
  //         .catch((error) => {
  //             console.error('Error al insertar el formulario en la base de datos:', error);
  //             res.status(500).json({ error: 'Error al insertar el formulario en la base de datos' });
  //         });
  // });

  app.post('/leerforms', (req, res) => {
    const data = req.body;

    console.log(data);
  });
}