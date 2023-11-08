import React, { useState } from "react";

function DEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;

  const [errores, setErrores] = useState({});

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "n_coe":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.n_coe = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.n_coe;
        }
        break;

      case "csag":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.csag = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.csag;
        }

        break;
      case "t_cem":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.t_cem = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.t_cem;
        }

        break;

      default:
        // No se realiza ninguna validación para otros campos
        break;
    }

    setErrores(nuevosErrores);
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
              <button className="btnf btn btn-primary" onClick={siguientePaso}>
                siguiente
              </button>
            </div>

            <div className="float-start ">
              <button className="btnf btn btn-primary" onClick={anteriorPaso}>
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
