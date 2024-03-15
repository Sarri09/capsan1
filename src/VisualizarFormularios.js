import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import RealizarFormulario from "./Realizarformulario";

const VisualizarFormularios = () => {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/obtenerformularios')
      .then(response => response.json())
      .then(data => setFormularios(data))
      .catch(error => console.error('Error al obtener los formularios:', error));
  }, []);

  const handleOpenFormulario = (nombreFormulario) => {
    fetch(`http://localhost:5000/obtenerformulario/${encodeURIComponent(nombreFormulario)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Formulario no encontrado');
        }
        return response.json();
      })
      .then(data => {
        const newWindow = window.open("", "_blank", "width=1200,height=900");
        
        newWindow.document.body.innerHTML = `
          <div id="root"></div>
        `;
        ReactDOM.render(<RealizarFormulario formulario={data} />, newWindow.document.getElementById('root'));
      })
      .catch(error => console.error('Error al obtener el formulario:', error));
  };
  


  return (
    <div>
      <h1>Formularios disponibles</h1>
      <ul>
        {formularios.map(formulario => (
          <li key={formulario._id}>
            <a
              href="#"
              onClick={() => handleOpenFormulario(formulario.nombre)}
            >
              {formulario.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisualizarFormularios;
