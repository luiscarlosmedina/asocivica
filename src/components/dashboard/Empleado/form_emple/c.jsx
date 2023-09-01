import React from "react";
import "../../../../style/Empleado/form-emple/c.css";

const C_emple = (props) => {
  return (
    <div>
      <div className="main-box">
        <header className="primary-box">
          <div className="box-menu">
            <button className="sub-menu">
              <div className="box-options">
                <div>Información empresa</div>
                <div className="circle-options">
                  <i className="bi bi-check-circle-fill"></i>
                  <i className="bi bi-x-circle-fill"></i>
                </div>
              </div>
            </button>
            <button className="sub-menu">
              <div className="box-options">
                <div>Información empleados 1</div>
                <div className="circle-options">
                  <i className="bi bi-check-circle-fill"></i>
                  <i className="bi bi-x-circle-fill"></i>
                </div>
              </div>
            </button>
            <button className="sub-menu">
              <div className="box-options">
                <div>Información personal 2</div>
                <div className="circle-options">
                  <i className="bi bi-check-circle-fill"></i>
                  <i className="bi bi-x-circle-fill"></i>
                </div>
              </div>
            </button>

            <button className="sub-menu">
              <div className="box-options">
                <div>Contactos emergencia</div>
                <div className="circle-options">
                  <i className="bi bi-check-circle-fill"></i>
                  <i className="bi bi-x-circle-fill"></i>
                </div>
              </div>
            </button>
            <button className="sub-menu">
              <div className="box-options">
                <div>Contrato empleado</div>
                <div className="circle-options">
                  <i className="bi bi-check-circle-fill"></i>
                  <i className="bi bi-x-circle-fill"></i>
                </div>
              </div>
            </button>
          </div>
        </header>
        <section className="secundary-box">
          <div className="container">
            <form className="box-main">
              <div className="box-main2">
                <div>
                  <label for="validationDefault02" className="form-label">
                    Tipo de libreta militar
                  </label>
                  <select
                    className="form-select"
                    id="validationDefault04"
                    onChange={props.handleInputChange}
                    required
                  >
                    <option select value="">
                      Seleccione una opción{" "}
                    </option>
                    <option select value="">
                      Libreta de primera clase
                    </option>
                    <option select value="">
                      Libreta de segunda clase{" "}
                    </option>
                    <option select value="">
                      Targeta de indentidad
                    </option>
                  </select>
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Tipo de licencia de conducción
                  </label>
                  <select
                    className="form-select"
                    id="validationDefault04"
                    onChange={props.handleInputChange}
                    required
                  >
                    <option select value="">
                      Seleccione una opción{" "}
                    </option>
                    <option select value="">
                      A1
                    </option>
                    <option select value="">
                      A2
                    </option>
                    <option select value="">
                      B1
                    </option>
                    <option select value="">
                      B2
                    </option>
                    <option select value="">
                      B3
                    </option>
                    <option select value="">
                      C1
                    </option>
                    <option select value="">
                      C2
                    </option>
                  </select>
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Eps
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Fondo pensional
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Fondo de cesantias{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" class="form-label">
                    Arl
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div className=" float-start">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.anteriorPaso}
                  >
                    anterior
                  </button>
                </div>

                <div className=" float-end ">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.siguientePaso}
                  >
                    siguiente
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default C_emple;
