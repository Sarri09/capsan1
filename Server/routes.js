const { request, response } = require('express');

module.exports = function(app, databaseService) {
    //registro
    app.post('/register', (req, res) => {
        const data = req.body;
        console.log(data);

        //AGARRA LO QUE ESTA PASANDO POR EL BODY Y MANDALO A EL SERVICIO QUE GESTIONA LA BASE DE DATOS EN UNA
        //FUNCION QUE INSERTE DATOS EN LA TABLA ()agregarusuario (data)
        databaseService.crearUsuario(data)
        .then(() => {
            res.json({"mensaje" : "Usuario registrado con exito"});
        }).catch(e => {
            res.status(500).json(e);
        })
        //res.json({"mensaje" : "Usuario registrado con exito"});
    });

    app.post('/login', (req, res) => {
        const data = req.body;
        console.log("recibiendo usuario: \n"+data+"\n para verificacion");
    
        Promise.all([databaseService.autenticarUsuario(data), databaseService.grapDataFromUser(data.email)])
        .then(([isAuthenticated, userData]) => {
            if(isAuthenticated) {
                res.json({ isAuthenticated: true, userData: JSON.stringify(userData) });
            } else {
                res.status(401).json({ "mensaje" : "Correo electronico o contraseña no encontrados" })
            }
        }).catch(e => {
            res.status(500).json(e);
        });
    });
    
}