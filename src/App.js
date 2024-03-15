import React from "react";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import FormularioCreator from "./FormularioCreator";
import VisualizarFormularios from "./VisualizarFormularios";
import RealizarFormulario from "./Realizarformulario";
import NotaUsuario from "./NotasUsuario";
import NotasPage from "./NotasPage"
import Cookies from "universal-cookie";

function App() {
  const usrCookie = new Cookies();
  
  const SessionExist = () => {
    if (usrCookie.get("usr")){
      return true;
    } else {
      return false;
    }
  };

  return (
   <>
    {SessionExist() ? <Dashboard/> : <Login/>
    }
    
   </>
  );
}

export default App;
