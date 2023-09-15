import React from "react";
import "../../../../../style/Empleado/Reg_empl/options_form_empl/b.css";

function B_emple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div>
              <label for="validationDefault02" className="form-label">
                Tipo de Documento
              </label>
              <input
                type="Number"
                name="id_doc"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.id_doc}
                
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Numero de Documento
              </label>
              <input
                type="Number"
                name="documento"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.documento}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Barrio y localidad
              </label>
              <input
                type="text"
                name="barloc_em"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.barloc_em}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                name="dir_em"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.dir_em}
                
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Telefono
              </label>
              <input
                type="Number"
                name="tel_em"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.tel_em}
                
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                rh
              </label>
              <input
                type="Number"
                name="id_rh"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.id_rh}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div className="float-end">
                <button className="btn btn-primary" onClick={siguientePaso}>
                  siguiente
                </button>
              </div>

              <div className="float-start ">
                <button className="btn btn-primary"onClick={anteriorPaso}>
                  volver
                </button>
              </div>

          </div>
        </form>
      </div>
    </section>
  );
}

export default B_emple;


