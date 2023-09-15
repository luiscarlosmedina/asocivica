import React from "react";
import "../../../../../style/Empleado/Reg_empl/options_form_empl/c.css";

function C_emple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso  } = props;
  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div>
              <label for="validationDefault02" className="form-label">
                Tipo de libreta militar
              </label>
              <input
                type="Text"
                name="lib_em"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.lib_em}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Tipo de licencia de conducción
              </label>
              <input
                type="Text"
                name="lic_emp"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.lic_emp}
         
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Eps
              </label>
              <input
                type="Number"
                name="id_eps"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.id_eps}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Fondo pensional
              </label>
              <input
                type="Number"
                name="id_pens"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.id_pens}
                
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Fondo de cesantias{" "}
              </label>
              <input
                type="Number"
                name="id_ces"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.id_ces}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Arl
              </label>
              <input
                type="Number"
                name="id_arl"
                className="form-control"
                id="validationBarriot02"
                onChange={handleInputChange}
                value={valores.id_arl}
          
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

export default C_emple;

