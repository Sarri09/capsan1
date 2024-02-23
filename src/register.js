import React, { useState } from "react";

function Register () {
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    
    const sendData = async (event) => {
        event.preventDefault();

        console.log({ name : name, lname : lname, mail : mail, password : password });

        const response = await window.fetch("http://localhost:5000", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                lname: lname,
                mail: mail,
                password: password
            }),
        });

        if (response.ok) {
            console.log("Datos enviados con exito");
        } else {
            console.log("Error al enviar los datos");
        }
    };

    return (
        <>
            <form onSubmit={sendData}> 
                <div>
                    <label>
                        Nombre
                    </label>
                    </div>
                    <input 
                        typeof="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div>
                    <label>
                        Apellido
                    </label>
                    </div>
                    <input 
                        typeof="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                    <div>
                    <label>
                        Correo Electronico
                    </label>
                    </div>
                    <input 
                        typeof="mail"
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
                        typeof="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div>
                        <button type="submit">Registrarse</button>
                    </div>
            </form>
        </>
    );
}

export default Register;