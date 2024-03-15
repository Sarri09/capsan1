import React, { useState, useEffect } from 'react';

const NotasPage = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/obtenerNotas')
      .then(response => response.json())
      .then(data => {
        setNotas(data);
      })
      .catch(error => console.error('Error al obtener las notas:', error));
  }, []);

  return (
    <div>
      <h1>Tabla de Notas</h1>
      <table>
        <thead>
          <tr>
            <th>Email/User</th>
            <th>Test</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map(nota => (
            <tr key={nota.id}>
              <td>{nota.email_user}</td>
              <td>{nota.testName}</td>
              <td>{nota.Notascol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasPage;
