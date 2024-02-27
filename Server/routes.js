const { request, response } = require('express');

module.exports = function(app) {
    //registro
    app.post('/', (req, res) => {
        const newusr = req.body;
        console.log(newusr);

        //AGARRA LO QUE ESTA PASANDO POR EL BODY Y MANDALO A EL SERVICIO QUE GESTIONA LA BASE DE DATOS EN UNA
        //FUNCION QUE INSERTE DATOS EN LA TABLA ()agregarusuario (newusr)

        /*.then(() => {
            res.json({"mensaje" : "Usuario registrado con exito"});
        }).catch(e => {
            response.status(500).json(e);
        })*/
        res.json({"mensaje" : "Usuario registrado con exito"});
    });

    app.post('/', (req, res) => {
        const verifusr = req.body;

        console.log("recibiendo usuario: \n"+verifusr+"\n para verificacion");


    });
}