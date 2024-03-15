import React, { useState } from 'react';

const FormularioCreator = () => {
  const [nombreFormulario, setNombreFormulario] = useState('');
  const [preguntas, setPreguntas] = useState([{ pregunta: '', respuestas: [{ respuesta: '' }], respuestacorrecta: null }]);

  const handleNombreChange = (event) => {
    setNombreFormulario(event.target.value);
  };

  const handlePreguntaChange = (index, event) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].pregunta = event.target.value;
    setPreguntas(nuevasPreguntas);
  };

  const handleRespuestaChange = (preguntaIndex, respuestaIndex, event) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestas[respuestaIndex].respuesta = event.target.value;
    setPreguntas(nuevasPreguntas);
  };

  const handleRespuestaCorrectaChange = (preguntaIndex, event) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].respuestacorrecta = event.target.value;
    setPreguntas(nuevasPreguntas);
  };

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '', respuestas: [{ respuesta: '' }], respuestacorrecta: null }]);
  };

  const agregarRespuesta = (preguntaIndex) => {
    const nuevasPreguntas = [...preguntas];
    const preguntaActual = nuevasPreguntas[preguntaIndex];
  
    if (preguntaActual.respuestas.length < 4) {
      preguntaActual.respuestas.push({ respuesta: '' }); 
      setPreguntas(nuevasPreguntas);
    }
  };

  const enviarFormulario = () => {
    const formulario = {
      nombre: nombreFormulario,
      preguntas: preguntas.map(pregunta => ({
        ...pregunta,
        respuestas: JSON.stringify(pregunta.respuestas.map(respuesta => respuesta))
      })),
    };
  
    fetch('http://localhost:5000/leerforms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Creador de Formularios</h1>
      <label htmlFor="nombreFormulario">Nombre del Formulario:</label>
      <input type="text" id="nombreFormulario" value={nombreFormulario} onChange={handleNombreChange} />

      {preguntas.map((pregunta, index) => (
        <div key={index}>
          <label htmlFor={`pregunta${index}`}>Pregunta {index + 1}:</label>
          <input
            type="text"
            id={`pregunta${index}`}
            value={pregunta.pregunta}
            onChange={(event) => handlePreguntaChange(index, event)}
          />

          {pregunta.respuestas.map((respuesta, respuestaIndex) => (
            <div key={respuestaIndex}>
              <label htmlFor={`respuesta${index}${respuestaIndex}`}>Respuesta {respuestaIndex + 1}:</label>
              <input
                type="text"
                id={`respuesta${index}${respuestaIndex}`}
                value={respuesta.respuesta} 
                onChange={(event) => handleRespuestaChange(index, respuestaIndex, event)}
              />
            </div>
          ))}

          <label htmlFor={`respuestacorrecta${index}`}>Respuesta Correcta:</label>
          <select
            id={`respuestacorrecta${index}`}
            value={pregunta.respuestacorrecta || ''}
            onChange={(event) => handleRespuestaCorrectaChange(index, event)}
          >
            <option value="" disabled>Seleccionar Respuesta Correcta</option>
            {pregunta.respuestas.map((respuesta, respuestaIndex) => (
              <option key={respuestaIndex} value={respuestaIndex + 1}>{`Respuesta ${respuestaIndex + 1}`}</option>
            ))}
          </select>

          {pregunta.respuestas.length < 4 && (
            <button onClick={() => agregarRespuesta(index)}>Agregar Respuesta</button>
          )}
        </div>
      ))}

      <button onClick={agregarPregunta}>Agregar Pregunta</button>
      <button onClick={enviarFormulario}>Enviar Formulario</button>
    </div>
  );
};

export default FormularioCreator;
