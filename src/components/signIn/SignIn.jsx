import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import { useAuth } from "../../autenticate";
import "../../style/signIn/formSignIn.css";
import RememberPass from "./rememberPass";

export default function SignIn() {
  const { login, error } = useAuth();
  const [doc, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    await login(doc, password);
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
            <label htmlFor="use">Usuario:</label>
            <input
              placeholder="123456789"
              type="number"
              name="doumento"
              id="use"
              value={doc}
              onChange={(e) => setDoc(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="pass">Contraseña:</label>
            <input
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="pass"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
            <div className="input-group-append">
              <div className="text-white d-flex align-items-center">
                <input
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ margin: '0', padding: '0', width: '20px', height: '20px',}}
                />
                <span className="ml-3">Mostrar contraseña</span>
              </div>
            </div>
          </div>
          <div className="bg-white my-2">
            <p className="error-message text-red m-auto px-1">{Error}</p>
            <p className="error-message text-red m-auto px-1">{error}</p>
          </div>
          <div className="password-olvidada">
            <button type="button" data-bs-toggle="modal" data-bs-target="#olvidepass" data-bs-whatever="@mdo"> ¿Olvidaste la contraseña?</button>
          </div>
          <div className="input">
            <input type="submit" value="Ingresar" />
          </div>
        </div>
      </form>
      <div
            className="modal fade"
            id="olvidepass"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
          >
            <div className="modal-dialog">
              <RememberPass />
            </div>
          </div>
    </div>
  );
}
