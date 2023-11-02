import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import { useAuth } from "../../autenticate";
import "../../style/signIn/formSignIn.css";

export default function SignIn() {
  const { login, error } = useAuth();
  const [doc, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (doc.trim() === "" || password.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    } else {
      setError("");
    }

    // Validación de documento
    if (!/^\d+$/.test(doc)) {
      setError("El documento debe contener solo números.");
      return;
    } else {
      setError("");
    }

    // Validación de contraseña
    if (!/^[a-zA-Z0-9!@#$%^&*+=._-]{8,}$/.test(password)) {
      setError("La contraseña no es valida");
      return;
    } else {
      setError("");
    }
    // Si ambas validaciones pasan, puedes proceder a realizar el inicio de sesión.
    login(doc, password);

    //configura errores del api
    if (error) {
      setError(error);
    }
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
            <h2>Bienvenido a SINOV</h2>
            <img src={Logo} alt="logo-asocivica" />
          </div>
          <div className="input">
            <label>Usuario:</label>
            <input
              placeholder="Documento solo numeros"
              type="number"
              name="ID_Em"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
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
            <div className="bg-white my-2">
              <p className="error-message text-red m-auto px-1">{Error}</p>
              <p className="error-message text-red m-auto px-1">{error}</p>
            </div>
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
