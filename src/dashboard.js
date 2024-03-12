import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const cookies = new Cookies();

    useEffect(() => {
      const dotcomUser = cookies.get('dotcom_user');
        if (dotcomUser) {
          setUserData(JSON.parse(dotcomUser));
        }
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/ruta-protegida", {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      {/*console.log("este es el estado del admin "+isAdmin)*/
         <h1>Bienvenido/a {userData ? `${userData[0]} ${userData[1]}` : ''}</h1>
      }
      {isAdmin && (
        <>
          <button>Crear formulario</button>
          <button>Calificar</button>
        </>
      )}
      {!isAdmin && (
        <>
          <button>Realizar formulario</button>
          <button>Ver calificaciones</button>
        </>
      )}
    </>
  );
}

export default Dashboard;
