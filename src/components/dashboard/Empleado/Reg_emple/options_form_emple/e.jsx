import React, { useState } from "react";


function EEmple(props) {
  const {
    handleInputChange, valores, siguientePaso, anteriorPaso } = props;

  const [errores, setErrores] = useState({});

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "contrato":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.contrato = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.contrato;
        }
        break;

      case "f_em":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.f_em = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.f_em;
        }
        break;

      default:

        break;
    }

    setErrores(nuevosErrores);
  };
  return (
    <section className="secundary-box">
      <div className="container">
        <div className="box-main">
          <div className="box-main2">
            <div>
              <label for="validationDefault02" className="form-label">
                Contrato
              </label>
              <input
                type="file"
                name="contrato"
                className={`form-control ${
                  errores.contrato ? "is-invalid" : valores.contrato ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("contrato", e.target.value);
                }}
                value={valores.contrato}
              />
              <div className="invalid-feedback">{errores.contrato}</div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Foto
              </label>
              <input
                type="file"
                name="f_em"
                className={`form-control ${
                  errores.f_em ? "is-invalid" : valores.f_em ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("f_em", e.target.value);
                }}
                value={valores.f_em}
              />
              <div className="invalid-feedback">{errores.f_em}</div>
            </div>

            <div className="espbots">
            <div className="float-end">
              <button
                className="btnf btn btn-primary"
                onClick={() => {
                  siguientePaso();
                }}
              >
                validar
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

export default EEmple;
