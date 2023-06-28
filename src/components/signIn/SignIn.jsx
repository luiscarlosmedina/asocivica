import React, { useState } from "react";
import Logo from "../../img/logosf.png";
import "../../style/signIn/formSignIn.css";
import Fondo from "../../img/corporativolg.jpg";
import axios from 'axios';
import {Link} from 'react-router-dom'


export default function SignIn() {
  const [body, setBody] = useState({ ID_Em: "", passw: "" });

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value
    });
  };

  const onSubmit = () => {
    axios.post('http://localhost:3001/api/login',body)
    .then(({data})=> 
    {console.log(data)})
    .catch(({response})=>
    {
      console.log(response.data)
    })
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
          <div className="input">
            <label>Usuario:</label>
            <input
              placeholder="Documento"
              type="number"
              value={body.ID_Em}
              onChange={inputChange}
              name="ID_Em"
            />
          </div>
          <div className="input">
            <label>Contraseña:</label>
            <input
              placeholder="Contraseña"
              type="password"
              value={body.passw}
              onChange={inputChange}
              name="passw"
            />
          </div>
          <div className="password-olvidada">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="input">
            <input type="submit" value="Ingresar" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
