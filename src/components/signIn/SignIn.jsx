import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import { useAuth } from "../../autenticate";
import "../../style/signIn/formSignIn.css";

export default function SignIn() {
  const { login } = useAuth();
  const [doc, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [docError, setDocError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de documento
    if (!/^\d+$/.test(doc)) {
      setDocError("El documento debe contener solo números.");
      return;
    } else {
      setDocError("");
    }

    // Validación de contraseña
    if (!/^[a-zA-Z0-9!@#$%^&*+=._-]{8,}$/.test(password)) {
      setPasswordError("La contraseña no cumple con los requisitos de seguridad.");
      return;
    } else {
      setPasswordError("");
    }

    // Si ambas validaciones pasan, puedes proceder a realizar el inicio de sesión.
    login(doc, password);
    setDoc("");
    setPassword("");
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
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
            />
            <p className="error-message">{docError}</p>
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
            <p className="error-message text-white">{passwordError}</p>
          </div>
          <div className="password-olvidada">
            {/* <a href="#">¿Olvidaste tu contraseña?</a> */}
          </div>
          <div className="input">
            <input type="submit" value="Ingresar" />
          </div>
        </div>
      </form>
    </div>
  );
}
