import React from "react";
import "../../../../../style/Empleado/Reg_empl/options_form_empl/a.css";

function A_emple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;

  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div>
              <label className="form-label">Estado</label>
              <input
                type="Number"
                name="estado"
                className="form-control"
                id=""
                onChange={handleInputChange}
                value={valores.estado}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Rol
              </label>
              <input
                type="number"
                name="id_rol"
                className="form-control"
                id="validationDefault01"
                onChange={handleInputChange}
                value={valores.id_rol}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                name="n_em"
                className="form-control"
                id=""
                onChange={handleInputChange}
                value={valores.n_em}
               
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                name="a_em"
                className="form-control"
                id=""
                onChange={handleInputChange}
                value={valores.a_em}
              
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Correo electronico
              </label>
              <input
                type="email"
                name="eml_em"
                className="form-control"
                id=""
                onChange={handleInputChange}
                value={valores.eml_em}
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                name="passw"
                className="form-control"
                id=""
                onChange={handleInputChange}
                value={valores.passw}
              />
              <div id="emailHelp" className="form-text">
                aqui un texto por una exclamación
              </div>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                este espacio es para mostrar la contraseña
              </label>
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

export default A_emple;
