import React, { useState } from "react";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Login () {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

    const usrCookie = new Cookies(null, { path: '/', maxAge: 2592000 });

    usrCookie.set("usr", false);

    const sendData = async (event) => {
        event.preventDefault();

        //console.log("enviando: "+ JSON.stringify({ email: email, password: password }) );

        const response = await window.fetch("http://localhost:5000/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                email : email,
                password : password
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data); 
            if (data.isAuthenticated) {
                usrCookie.set("usr", true);
                usrCookie.set("dotcom_user", JSON.stringify(data.userData));
                usrCookie.set("isAdmin", data.isAdmin);
                window.location.reload(false);
            } else {
                console.log("Usuario o contraseña no coinciden")
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: "Usuario o contraseña incorrectos",
                });
            }
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
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
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