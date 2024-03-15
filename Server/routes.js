const { Formulario } = require('./Services/databaseServiceMongo');
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
  app.post('/leerforms', (req, res) => {
    const data = req.body;
    
    data.preguntas.forEach(pregunta => {
      pregunta.respuestas = JSON.parse(pregunta.respuestas);
    });
    
    const nuevoFormulario = new Formulario({
      nombre: data.nombre,
      preguntas: data.preguntas.map(pregunta => ({
        pregunta: pregunta.pregunta,
        respuestas: pregunta.respuestas.map(respuesta => ({
          respuesta: respuesta.respuesta
        })),
        respuestacorrecta: pregunta.respuestacorrecta
      }))
    });
  
    nuevoFormulario.save()
      .then(() => {
        res.json({ message: 'Formulario insertado con éxito en la base de datos' });
      })
      .catch((error) => {
        console.error('Error al insertar el formulario en la base de datos:', error);
        res.status(500).json({ error: 'Error al insertar el formulario en la base de datos' });
      });
  });

// app.post('/leerforms', (req, res) => { 
//     const data = req.body;
//     console.log(data)});

// Ruta para obtener los nombres de los formularios desde MongoDB
app.get('/obtenerformularios', async (req, res) => {
    try {
      const formularios = await Formulario.find({});
      res.json(formularios);
    } catch (error) {
      console.error('Error al obtener los formularios:', error);
      res.status(500).json({ error: 'Error al obtener los formularios' });
    }
  });

  app.get('/obtenerformulario/:nombre', async (req, res) => {
    try {
      const nombreFormulario = req.params.nombre;
      const formulario = await Formulario.findOne({ nombre: nombreFormulario });

      if (!formulario) {
        return res.status(404).json({ error: 'Formulario no encontrado' });
      }

      res.json(formulario);
    } catch (error) {
      console.error('Error al obtener el formulario:', error);
      res.status(500).json({ error: 'Error al obtener el formulario' });
    }
});

// app.post('/guardarnota', (req, res) => { 
//     const data = req.body;

//     console.log(data);
    
// });

app.post('/guardarnota', (req, res) => {
    const data = req.body;

    // Obtener los datos necesarios del cuerpo de la solicitud
    const correoElectronico = data.correoElectronico;
    const nombreFormulario = data.nombreFormulario;
    const puntaje = data.puntaje;
console.log(data.nombreFormulario)
    // Insertar la nota en la base de datos
    databaseService.insertarNota({
        correoElectronico: correoElectronico,
        nombreFormulario: nombreFormulario,
        puntaje: puntaje
    })
    .then(() => {
        res.json({ message: 'Nota guardada correctamente en la base de datos' });
    })
    .catch(error => {
        console.error('Error al guardar la nota en la base de datos:', error);
        res.status(500).json({ error: 'Error al guardar la nota en la base de datos' });
    });
});

app.get('/obtenerNotas', async (req, res) => {
    try {
      // Consultar todos los registros de la tabla de Notas
      const notas = await databaseService.obtenerNotas();
  
      // Enviar los datos de las notas como respuesta
      res.json(notas);
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      res.status(500).json({ error: 'Error al obtener las notas' });
    }
  });

// En el archivo de tu API (app.js, index.js, etc.)

app.get('/notasUsuario/:correoElectronico', (req, res) => {
    const correoElectronico = req.params.correoElectronico;
    databaseService.obtenerNotasUsuario(correoElectronico)
      .then(notas => {
        res.json(notas);
      })
      .catch(error => {
        console.error('Error al obtener las notas del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las notas del usuario' });
      });
  });
  
}