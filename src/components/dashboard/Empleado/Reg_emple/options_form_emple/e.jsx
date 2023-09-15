import React from "react";
import "../../../../../style/Empleado/Reg_empl/options_form_empl/e.css";

function E_emple(props) {
  const {
    handleInputChange,
    valores,
    almacenarDatos,
    siguientePaso,
    anteriorPaso,
  } = props;
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
                className="form-control"
                aria-label="file example"
                onChange={handleInputChange}
                value={valores.contrato}
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Link Foto
              </label>
              <input
                type="text"
                name="f_em"
                className="form-control"
                aria-label="file example"
                onChange={handleInputChange}
                value={valores.f_em}
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
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
        </form>
      </div>
    </section>
  );
}

export default E_emple;
