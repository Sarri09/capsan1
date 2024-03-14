import React from "react";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import FormularioCreator from "./Createform";
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
    {//SessionExist() ? <Dashboard/> : <Login/>
      <FormularioCreator/>
    }
    
   </>
  );
}

export default App;
