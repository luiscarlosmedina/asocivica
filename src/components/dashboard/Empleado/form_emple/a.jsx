import React from "react";
import "../../../../style/Empleado/form-emple/a.css";

const A_emple = (props) => {
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
                  <label className="form-label">
                    Estado
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="validationDefault01"
                    required
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
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault02"
                    onChange={props.handleInputChange}
                    required
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
                    className="form-control"
                    id="validationDefault02"
                    onChange={props.handleInputChange}
                    required
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
                    className="form-control"
                    id="exampleInputEmail1"
                    onChange={props.handleInputChange}
                    aria-describedby="emailHelp"
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
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={props.handleInputChange}
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

export default A_emple;


/*

        <section className="secundary-box">
          <div className="container">
            <form className="box-main">
              <div className="box-main2">
                <div>
                  <label for="validationDefault02" className="form-label">
                    Estado
                  </label>
                  <select
                    className="form-select"
                    id="validationDefault04"
                    required
                    onChange={props.handleInputChange}
                  >
                    <option select value="">
                      Seleccione una opción{" "}
                    </option>
                    <option select value="">
                      Activo
                    </option>
                    <option select value="">
                      Inactivo
                    </option>
                  </select>
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Rol
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault01"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label for="validationDefault02" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationDefault02"
                    onChange={props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Correo electronico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    onChange={props.handleInputChange}
                    aria-describedby="emailHelp"
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
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={props.handleInputChange}
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
                    Mostrar contraseña
                  </label>
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