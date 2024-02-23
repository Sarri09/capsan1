import React from "react";

function Login () {
    return (
        <>
            <form>
                <div>
                <label>
                    Correo Electronico
                </label>
                </div>
                <input 
                    type="email"
                />
                <div>
                <label>
                    Contraseña
                </label>
                </div>
                <input 
                    type="password"
                />
                <div>
                    <button>Iniciar Sesion</button>
                </div>
            </form>
        </>
    );
}

export default Login;