import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const NotasUsuario = () => {
  const [notas, setNotas] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const dotcom_user_cookie = cookies.get('dotcom_user');
    const userData = dotcom_user_cookie ? JSON.parse(dotcom_user_cookie) : null;
    const correoElectronico = userData ? userData[2] : null;

    if (correoElectronico) {
      fetch(`http://localhost:5000/notasUsuario/${correoElectronico}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las notas del usuario');
          }
          return response.json();
        })
        .then(data => {
          setNotas(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.error('La cookie dotcom_user o el correo electrónico no están disponibles');
    }
  }, [cookies]); // Ejecutar cada vez que cambia la cookie

  return (
    <div>
      <h2>Notas del Usuario</h2>
      <table>
        <thead>
          <tr>
            <th>Formulario /</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.testName}</td>
              <td>{nota.Notascol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasUsuario;
