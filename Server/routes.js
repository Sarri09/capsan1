const { request, response } = require('express');

module.exports = function(app) {
    app.post('/', (req, res) => {
        const newusr = req.body;
        console.log(newusr);

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