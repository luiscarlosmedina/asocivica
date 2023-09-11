import React from "react";
import "../../../../style/Empleado/form-emple/e.css";

const E_emple = (props) => {
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
                    Link Tipo de contrato
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="file example"
                    onChange={props.handleInputChange}
                    required
                  />
                 
                </div>

                <div className=" float-end ">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.siguientePaso}
                  >
                    siguiente
                  </button>
                </div>

                <div className=" float-start">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.anteriorPaso}
                  >
                    anterior
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

export default E_emple;


/*

 <section className="secundary-box">
          <div className="container">
            <form className="box-main">
              <div className="box-main2">
                <div>
                  <label for="validationDefault02" className="form-label">
                    Tipo de contrato
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
                      Contrato a término Fijo
                    </option>
                    <option select value="">
                      Contrato a término indefinido
                    </option>
                    <option select value="">
                      Contrato de obra o labor
                    </option>
                    <option select value="">
                      Contrato civil por prestación de servicios
                    </option>
                    <option select value="">
                      Contrato de aprendizaje
                    </option>
                    <option select value="">
                      Contrato ocasional, accidental o transitorio de trabajo
                    </option>
                  </select>
                </div>
                <div class="box1">
                  <label for="validationDefault02" className="form-label">
                    {" "}
                    Descripcion del contrato{" "}
                  </label>
                  <input
                    type="Text"
                    class="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="validationDefault02" className="form-label">
                    {" "}
                    Archivo decontrato
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    aria-label="file example"
                    onChange={props.handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Example invalid form file feedback
                  </div>
                </div>

                <div className=" float-end ">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.siguientePaso}
                  >
                    siguiente
                  </button>
                </div>

                <div className=" float-start">
                  <button
                    className="btn btn-primary m-2"
                    onClick={props.anteriorPaso}
                  >
                    anterior
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        */