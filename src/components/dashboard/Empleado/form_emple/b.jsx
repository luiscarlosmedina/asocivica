import React from "react";
import "../../../../style/Empleado/form-emple/b.css";

const B_emple = (props) => {
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
                    Tipo de Documento
                  </label>
                 <input
                    type="Number"
                    className="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required

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
                    className="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
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
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
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
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
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
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                   <div id="emailHelp" className="form-text">
                    aqui un texto por una exclamación
                  </div>
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

export default B_emple;


/* <section className="secundary-box">
          <div className="container">
            <form className="box-main">
              <div className="box-main2">
                <div>
                  <label for="validationDefault02" className="form-label">
                    Tipo de Documento
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
                      Cedula de ciudadania
                    </option>
                    <option select value="">
                      Cedula de estrangeria
                    </option>
                    <option select value="">
                      Targeta de indentidad
                    </option>
                  </select>
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Numero de Documento
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Barrio
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
                  <label for="validationDefault02" className="form-label">
                    Dirección
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
                  <label for="validationDefault02" className="form-label">
                    Telefono celular
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Telefono fijo
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


        */