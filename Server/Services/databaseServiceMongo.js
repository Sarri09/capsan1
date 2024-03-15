const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://amadariagaa09:8XvffNyecfsfjuvr@cluster01.u8yvidd.mongodb.net/FormularioDB?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });


const formularioSchema = new mongoose.Schema({
  nombre: String,
  preguntas: [{
    pregunta: String,
    respuestas: [{ respuesta: String }],
    respuestacorrecta: Number
  }]
});

const Formulario = mongoose.model('Formulario', formularioSchema);

module.exports = { Formulario };
