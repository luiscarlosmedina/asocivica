import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import "../../style/signIn/formSignIn.css";



export default function SignIn() {
  const [values, setValues] = useState({
    usuario: "",
    password: ""
  })
  return (
    <div className="Body">
      <div className="contenedor-formulario">
        <div className="imagen-formulario">
          <div className="logo"></div>
        </div>
        <div className="formulario">
          <div className="texto-formulario imgform">
            <h2>Bienvenido</h2>
            <img src={Logo} alt="logo-asocivica" />
          </div>
          <div className="input">
            <label>Usuario:</label>
            <input
              placeholder="Documento"
              type="number"
              name="ID_Em"
            />
          </div>
          <div className="input">
            <label>Contraseña:</label>
            <input
              placeholder="Contraseña"
              type="password"
              name="passw"
            />
          </div>
          <div className="password-olvidada">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="input">
            <input type="submit" value="Ingresar" />
          </div>
        </div>
      </div>
    </div>
  );
}
