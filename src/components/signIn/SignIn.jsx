import React from "react";
import Logo from "../../img/logosf.png";
import "../../style/signIn/formSignIn.css";
import Fondo from "../../img/corporativolg.jpg";

export default function SignIn() {
  return (
    <div className="contenedor-formulario">
    <div className="imagen-formulario">
      <div className="logo">

      </div>
    </div>
    <form method="POST" className="formulario">
      <div className="texto-formulario imgform">
        <h2>Bienvenido</h2>
        <img src={Logo} alt="logo-asocivica"/>
      </div>
      <div className="input">
        <label for="InputCorreo">Usuario:</label>
        <input id="InputCorreo" placeholder="Documento" type="number" autofocus/>
      </div>
      <div className="input">
        <label for="InputPassword">Contraseña:</label>
        <input id="InputPassword" placeholder="Contraseña" type="password"/>
      </div>
      <div className="password-olvidada">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="input">
        <input type="submit" value="Ingresar" onclick="validar_logueo()"/>
      </div>
    </form>
  </div>
  );
}
