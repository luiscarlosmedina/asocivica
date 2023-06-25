import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import "../../style/signIn/formSignIn.css";
import Fondo from "../../img/corporativolg.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [values, setValues] = useState({
    usuario: "",
    password: ""
  })
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/login", values)
    .then(res => {
      if(res.data.Status === "Success"){
        navigate("/*")
      } else {
        alert("Error")
      }
    }).then(err => console.log(err));
  }
  return (
    <div className="Body">
    <div className="contenedor-formulario">
    <div className="imagen-formulario">
      <div className="logo">
      </div>
    </div>
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="texto-formulario imgform">
        <h2>Bienvenido</h2>
        <img src={Logo} alt="logo-asocivica"/>
      </div>
      <div className="input">
        <label htmlFor="usuario">Usuario:</label>
        <input name="usuario" placeholder="Documento" type="number" autofocus onChange={e => setValues({...values, usuario: e.target.value})} />
      </div>
      <div className="input">
        <label htmlFor="password">Contraseña:</label>
        <input name="password" placeholder="Contraseña" type="password" onChange={e => setValues({...values, password: e.target.value})}/>
      </div>
      <div className="password-olvidada">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="input">
        <input type="submit" value="Ingresar" />
      </div>
    </form>
  </div>
  </div>
  );
}
