import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import FormularioCreator from './FormularioCreator';
import VisualizarFormularios from './VisualizarFormularios';
import NotasPage from './NotasPage';
import NotasUsuario from './NotasUsuario';
import ReactDOM from "react-dom";

function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showFormularioModal, setShowFormularioModal] = useState(false);
  const [showVisualizarFormularios, setShowVisualizarFormularios] = useState(false);
  const [showNotasModal, setShowNotasModal] = useState(false);
  const [showVerMiNotaModal, setShowVerMiNotaModal] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData();
  
        if (response.ok) {
          setIsAdmin(true);
          const dotcomUser = cookies.get('dotcom_user');
          if (dotcomUser) {
            setUserData(JSON.parse(dotcomUser));
          }
        }
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  const fetchUserData = async () => {
    return fetch("http://localhost:5000/ruta-protegida", {
      method: "GET",
      credentials: "include",
    });
  };

  const openFormularioCreator = () => {
    const newWindow = window.open("", "_blank", "width=1200,height=900");
    ReactDOM.render(<FormularioCreator />, newWindow.document.body);
  };

  const openVisualizarFormularios = () => {
    setShowVisualizarFormularios(true);
  };

  const openNotasModal = () => {
    setShowNotasModal(true);
  };

  const openVerMiNotaModal = () => {
    setShowVerMiNotaModal(true);
  };

  const closeFormularioModal = () => {
    setShowFormularioModal(false);
  };

  const closeVisualizarFormularios = () => {
    setShowVisualizarFormularios(false);
  };

  const closeNotasModal = () => {
    setShowNotasModal(false);
  };

  const closeVerMiNotaModal = () => {
    setShowVerMiNotaModal(false);
  };

  const logout = () => {
    // Eliminar todas las cookies
    cookies.remove('dotcom_user');
    cookies.remove('connect.sid');
    cookies.remove('usr');
    cookies.remove('isAdmin');
    // Actualizar el estado del usuario
    setUserData(null);
    setIsAdmin(false);
    window.location.reload(false);
    // Redirigir al usuario a la página de inicio de sesión u otra página
    // window.location.href = '/login';
  };

  return (
    <>
      <h1>Bienvenido/a {userData ? `${userData[0]} ${userData[1]}` : ''}</h1>
      {isAdmin && (
        <>
          <button onClick={openFormularioCreator}>Crear formulario</button>
          <button onClick={openVisualizarFormularios}>Visualizar formularios</button>
          <button onClick={openNotasModal}>Ver notas</button>
        </>
      )}
      {!isAdmin && (
        <>
          <button onClick={openVisualizarFormularios}>Realizar formulario</button>
          <button onClick={openVerMiNotaModal}>Ver mi nota</button>
        </>
      )}

      {/* Botón de logout */}
      <button onClick={logout}>Logout</button>

      {/* Ventanas emergentes */}
      {showFormularioModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeFormularioModal}>&times;</span>
            <FormularioCreator />
          </div>
        </div>
      )}
      {showVisualizarFormularios && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeVisualizarFormularios}>&times;</span>
            <VisualizarFormularios />
          </div>
        </div>
      )}
      {showNotasModal && (
        <NotasPage closeModal={closeNotasModal} />
      )}
      {showVerMiNotaModal && (
        <NotasUsuario closeModal={closeVerMiNotaModal} />
      )}
    </>
  );
}

export default Dashboard;
