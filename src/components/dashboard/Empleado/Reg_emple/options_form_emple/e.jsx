import React, { useState } from "react";


function EEmple(props) {
  const {
    handleInputChange, valores, almacenarDatos, siguientePaso, anteriorPaso } = props;

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
        // No se realiza ninguna validación para otros campos
        break;
    }

    setErrores(nuevosErrores);
  };
  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div>
              <label for="validationDefault02" className="form-label">
                Link Tipo de contrato
              </label>
              <input
                type="text"
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
                Link Foto
              </label>
              <input
                type="text"
                name="f_em"
                className={`form-control ${
                  errores.f_em ? "is-invalid" : valores.f_em ? "is-valid" : ""
                }`}
                //aria-label="file example"
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
                className="btn btn-primary"
                onClick={() => {
                  siguientePaso();
                  almacenarDatos();
                }}
              >
                siguiente
              </button>
            </div>

            <div className="float-start ">
              <button className="btn btn-primary" onClick={anteriorPaso}>
                volver
              </button>
            </div>
          </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EEmple;
