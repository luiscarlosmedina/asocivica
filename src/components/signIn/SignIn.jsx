import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import { useNavigate } from "react-router-dom";
import "../../style/signIn/formSignIn.css";

export default function SignIn() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const navegate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    fetch("http://localhost/api_proyecto.github.io/api.php?apicall=login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"passw":password, "documento":user}),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error === false) {
          setUser("")
          setPassword("")
          navegate("/inicio")
          console.log("bien");
        } else {
          console.log("mal");
        }

        console.log("Respuesta de la API:", responseData);
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });

  }

  return (
    <div className="Body">
      <form className="contenedor-formulario" onSubmit={handleLogin}>
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
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Contraseña:</label>
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password-olvidada">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="input">
            <input type="submit" value="Ingresar"/>
          </div>
        </div>
      </form>
    </div>
  );
}
