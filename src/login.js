import React, { useState } from "react";
import Cookies from "universal-cookie";

function Login () {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const usrCookie = new Cookies(null, { path: '/', maxAge: 2592000 });

    usrCookie.set("usr", false);
    usrCookie.set("dotcom_user", /*aqui quiero agregar en la cookie el valor del nombre ligado al correo del usuario*/);

    const sendData = async (event) => {
        event.preventDefault();

        console.log("enviando: "+ JSON.stringify({ mail: mail, password: password }) );

        const response = await window.fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                mail : mail,
                password : password
            })
        });

        if (response.ok) {
            //console.log("bienvenido");
            usrCookie.set("usr", true);
            window.location.reload(false);
        } else {
            console.log("Usuario o contraseña no coinciden")
        }
    }
    return (
        <>
            <form onSubmit={sendData}>
                <div>
                <label>
                    Correo Electronico
                </label>
                </div>
                <input 
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <div>
                <label>
                    Contraseña
                </label>
                </div>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div>
                    <button type="submit">Iniciar Sesion</button>
                </div>
                
            </form>
        </>
    );
}

export default Login;