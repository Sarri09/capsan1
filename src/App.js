import React from "react";
import Login from "./login";
import Register from "./register";
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
    {SessionExist() ? <Register/> : <Login/>}
   </>
  );
}

export default App;
