import React, { useState } from "react";
import swal from 'sweetalert';

function EEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "contrato":
        if (!valorCampo || valorCampo.length < 10 || valorCampo.length > 100) {
          nuevosErrores.contrato = "Por favor, verifica la URL del contrato.";
        } else {
          delete nuevosErrores.contrato;
        }
        break;


      default:
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  

  const validarcampose = () => {

    const campos = ["contrato"];
    const documentosValidos = campos.every((campo) => validarCampo(campo, valores[campo]));

    if (documentosValidos) {
      siguientePaso();
      console.log(valores)
      
    } else {
      swal("¡Completa los campos!", "Por favor, verifica los campos para seguir con el proceso...", "error");
    }

    return documentosValidos;
  };

  return (
    <section className="secundary-box">
      <div className="container">
        <div className="box-main">
          <div className="box-main2">
            <div>
              <label  className="form-label">
                Contrato
              </label>
              <input
              placeholder="Enlace al documento del contrato"
                type="text"
                name="contrato"
                className={`form-control ${errores.contrato ? "is-invalid" : valores.contrato ? "is-valid" : ""}`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("contrato", e.target.value);
                }}
                value={valores.contrato}
              />
              <div className="invalid-feedback">{errores.contrato}</div>
            </div>
            <div className="espbots">
              <div className="float-end">
                <button className="btnfs btn btn-primary" onClick={validarcampose}>
                  Validar
                </button>
              </div>

              <div className="float-start">
                <button className="btnfa btn btn-primary" onClick={anteriorPaso}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EEmple;
