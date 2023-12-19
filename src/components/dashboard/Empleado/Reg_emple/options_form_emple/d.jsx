import React, { useState } from "react";
import swal from 'sweetalert';
import { useAuth } from "../../../../../autenticate";


function DEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});
  const {token} = useAuth();

  const validarcamposd = () => {
    let campos = ["n_coe", "csag", "t_cem"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      fetchDataValidaciontel();
    } else {
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
    }
    return documentosValidos;
  };

  const fetchDataValidaciontel = () => {
    fetch(`https://api.siemnov.com/api/readveritelempleado/${valores.t_cem}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken": token }),
    })
      .then((response) => response.json())
      .then((respuesta) => {
        if (respuesta.encontrado) {
          swal("¡Telefono existente!", "El Teléfono ya existe en el sistema.", "error");
        } else {

          siguientePaso();
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Error", `Hubo un error${error}`, "error");
      });
  };


  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {

      case "n_coe":
        if (!valorCampo.trim()) {
          nuevosErrores.n_coe = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 30) {
          nuevosErrores.n_coe = "El campo debe tener entre 2 y 30 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.n_coe = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.n_coe;
        }
        break;

      case "csag":
        if (!valorCampo.trim()) {
          nuevosErrores.csag = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 25) {
          nuevosErrores.csag = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.csag = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.csag;
        }
        break;

      case "t_cem":
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(valorCampo)) {
          nuevosErrores.t_cem =
            "Por favor, ingrese un número de teléfono válido";
        } else {
          delete nuevosErrores.t_cem;
        }

        break;

      default:

        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  return (
    <section className="secundary-box">
      <div className="container">
        <div className="box-main">
          <div className="box-main2">
            <div className="box1">
              <label className="form-label">Nombre</label>
              <input
                type="Text"
                name="n_coe"
                placeholder="Ingrese el nombre completo"

                className={`form-control ${errores.n_coe ? "is-invalid" : valores.n_coe ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("n_coe", e.target.value);
                }}
                value={valores.n_coe}
              />
              <div className="invalid-feedback">{errores.n_coe}</div>
            </div>
            <div className="box1">
              <label className="form-label">Parentesco o relación de consanguinidad con el empleado</label>
              <input
                type="Text"
                name="csag"
                placeholder="Ej. Madre, Padre, Hermano, etc."

                className={`form-control ${errores.csag ? "is-invalid" : valores.csag ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("csag", e.target.value);
                }}
                value={valores.csag}
              />
              <div className="invalid-feedback">{errores.csag}</div>
            </div>
            <div>
              <label className="form-label">Telefono </label>
              <input
                type="Number"
                name="t_cem"
                placeholder="Ej. Celular: 1234567890, Fijo: 0118234563"
                className={`form-control ${errores.t_cem ? "is-invalid" : valores.t_cem ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("t_cem", e.target.value);
                }}
                value={valores.t_cem}
              />
              <div className="invalid-feedback">{errores.t_cem}</div>
            </div>
            <div className="espbots">
              <div className="float-end">
                <button className="btnfs btn btn-primary" onClick={() => { validarcamposd();  /*siguientePaso();*/ }}>
                  siguiente
                </button>
              </div>
              <div className="float-start ">
                <button className="btnfa btn btn-primary" onClick={() => { anteriorPaso(); }}>
                  volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DEmple;
