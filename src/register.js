import React, { useState } from "react";

function Register () {
    const [nombre, setnombre] = useState("");
    const [apellido, setapellido] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    
    const sendData = async (event) => {
        event.preventDefault();

        console.log({ nombre : nombre, apellido : apellido, email : email, password : password });

        const response = await window.fetch("http://localhost:5000/register", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                nombre: nombre,
                apellido: apellido,
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
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                        required
                    />
                    <div>
                    <label>
                        Apellido
                    </label>
                    </div>
                    <input 
                        typeof="text"
                        value={apellido}
                        onChange={(e) => setapellido(e.target.value)}
                        required
                    />
                    <div>
                    <label>
                        Correo Electronico
                    </label>
                    </div>
                    <input 
                        typeof="email"
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
                        <button type="submit">Registrarse</button>
                    </div>
            </form>
        </>
    );
}

export default Register;