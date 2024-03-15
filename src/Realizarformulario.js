import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const RealizarFormulario = ({ formulario: formData }) => {
  const [formularioState, setFormularioState] = useState(null);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const cookies = new Cookies();

  useEffect(() => {
    setFormularioState(formData);
    // Reiniciar las respuestas seleccionadas y las respuestas correctas al cambiar el formulario
    setRespuestasSeleccionadas([]);
    setRespuestasCorrectas(0);
  }, [formData]);

  const handleRespuestaSeleccionada = (preguntaIndex, respuestaIndex) => {
    const nuevasRespuestasSeleccionadas = [...respuestasSeleccionadas];
    nuevasRespuestasSeleccionadas[preguntaIndex] = respuestaIndex;
    setRespuestasSeleccionadas(nuevasRespuestasSeleccionadas);
  };

  const handleEnviarFormulario = () => {
    // Calcular el total de respuestas correctas
    let totalCorrectas = 0;
    formularioState.preguntas.forEach((pregunta, index) => {
      if (pregunta.respuestacorrecta === respuestasSeleccionadas[index]) {
        totalCorrectas++;
      }
    });
    setRespuestasCorrectas(totalCorrectas);

    // Obtener el correo electrónico del tercer elemento del array userData en la cookie
    const dotcom_user_cookie = cookies.get('dotcom_user');
    const userData = dotcom_user_cookie ? JSON.parse(dotcom_user_cookie) : null;
    const correoElectronico = userData ? userData[2] : null;

    // Enviar el puntaje a la API junto con el correo electrónico
    const puntaje = `${totalCorrectas}/${formularioState.preguntas.length}`;
    enviarPuntaje(puntaje, correoElectronico);
  };

  const enviarPuntaje = (puntaje, correoElectronico) => {
    if (correoElectronico) {
      // La cookie y el correo electrónico están disponibles, enviar la solicitud con el correo electrónico
      fetch('http://localhost:5000/guardarnota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `dotcom_user=${cookies.get('dotcom_user')}`,
        },
        body: JSON.stringify({ puntaje, correoElectronico, nombreFormulario: formularioState.nombre }), // Incluir nombre del formulario en el cuerpo
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar el puntaje');
        }
        console.log('Puntaje guardado correctamente');
      })
      .catch(error => console.error('Error al guardar el puntaje:', error));
    } else {
      console.error('La cookie dotcom_user o el correo electrónico no están disponibles');
    }
  };

  return (
    <div>
      {formularioState ? (
        <div>
          <h2>{formularioState.nombre}</h2>
          {formularioState.preguntas.map((pregunta, preguntaIndex) => (
            <div key={preguntaIndex}>
              <h3>Pregunta {preguntaIndex + 1}: {pregunta.pregunta}</h3>
              <ul>
                {pregunta.respuestas.map((respuesta, respuestaIndex) => (
                  <li key={respuestaIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`respuesta-${preguntaIndex}`}
                        value={respuestaIndex}
                        checked={respuestasSeleccionadas[preguntaIndex] === respuestaIndex}
                        onChange={() => handleRespuestaSeleccionada(preguntaIndex, respuestaIndex)}
                      />
                      {respuesta.respuesta}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleEnviarFormulario}>Enviar</button>
          {respuestasCorrectas >= 0 && (
            <p>Puntaje: {respuestasCorrectas}/{formularioState.preguntas.length}</p>
          )}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default RealizarFormulario;
