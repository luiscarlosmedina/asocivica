import React, { useState } from "react";
import swal from 'sweetalert';


function DEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});

  const validarcamposd = () => {
    console.log("di")
    let campos = ["n_coe", "csag", "t_cem"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      siguientePaso();
  } else{
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
  }
    return documentosValidos;
  };


  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {

      case "n_coe":
        if (!valorCampo.trim()) {
          nuevosErrores.n_coe = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
          nuevosErrores.n_coe = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.n_coe = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.n_coe;
        }
        break;

      case "csag":
        if (!valorCampo.trim()) {
          nuevosErrores.csag = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
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
              <label className="form-label">consaguinidad</label>
              <input
                type="Text"
                name="csag"
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
              <label className="form-label">Telefono Celular</label>
              <input
                type="Number"
                name="t_cem"
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
            <button className="btnfs btn btn-primary"  onClick={() => { validarcamposd(); }}>
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
