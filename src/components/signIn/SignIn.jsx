import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import "../../style/signIn/formSignIn.css";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onDataUpdate }) {
  const navigate = useNavigate();
  const [passw, setPassw] = useState("");
  const [documento, setDocumento] = useState("");
  const [message, setMessage] = useState("");
  const [LogIn, setLogIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const login = {
      passw,
      documento,
    };

    fetch("http://localhost/api_proyecto.github.io/api.php?apicall=login", {
      method: "POST",
      headers: {
        "content-Type": "aplication/json",
      },
      body: JSON.stringify(login),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage("Error al ingresar");
        } else {
          setMessage("Ingreso al sistema correctamente");
          setPassw("");
          setDocumento("");
          setMessage("");
          onDataUpdate();
        }
      })
      .catch((error) => {
        setMessage("Ingresso Correcto");
        console.log(error);
        setLogIn(!LogIn);
      });
    if (LogIn === true) {
      navigate("/dashboard", {
        replace: true,
        state: {
          logged: true,
        },
      });
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="input">
              <label htmlFor="documento">Usuario:</label>
              <input
                placeholder="Documento"
                type="number"
                id="documentdo"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="passw">Contraseña:</label>
              <input
                placeholder="Contraseña"
                type="text"
                id="passw"
                value={passw}
                onChange={(e) => setPassw(e.target.value)}
              />
            </div>
            <div className="password-olvidada">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="input">
              <button type="submit">Ingresar</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
