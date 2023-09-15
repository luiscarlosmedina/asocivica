import React from "react";
import "../../../../../style/Empleado/Reg_empl/options_form_empl/d.css";
function D_emple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div className="box1">
              <label for="validationDefault02" className="form-label">
                Nombre
              </label>
              <input
                type="Text"
                name="n_coe"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.n_coe}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div className="box1">
              <label for="validationDefault02" className="form-label">
                consaguinidad
              </label>
              <input
                type="Text"
                name="csag"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.csag}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Telefono Celular
              </label>
              <input
                type="text"
                name="t_cem"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.t_cem}
               
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

export default D_emple;

