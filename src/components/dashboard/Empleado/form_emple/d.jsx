import React from "react";
import "../../../../style/Empleado/form-emple/d.css";

const D_emple = (props) => {
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
                <div className="box1">
                  <label for="validationDefault02" className="form-label">
                    Nombre 
                  </label>
                  <input
                    type="Text"
                    class="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div className="box1">
                  <label for="validationDefault02" className="form-label">
                    consaguinidad 
                  </label>
                  <input
                    type="Text"
                    class="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Telefono Celular
                  </label>
                  <input
                    type="text"
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

export default D_emple;


/*
        <section className="secundary-box">
          <div className="container">
            <form className="box-main">
              <div className="box-main2">
                <div className="box1">
                  <label for="validationDefault02" className="form-label">
                    Nombre de contacto 1
                  </label>
                  <input
                    type="Text"
                    class="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Telefono Celular
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationBarriot02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div className="box2">
                  <label for="validationDefault02" className="form-label">
                    Telefono fijo
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
                    Nombre de contacto 2
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
                    Telefono Celular
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
                    Telefono fijo
                  </label>
                  <input
                    type="text"
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