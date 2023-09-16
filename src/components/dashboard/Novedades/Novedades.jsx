import React from "react";
import "../../../style/novedades.css";
//import { useState } from 'react';

export default function Novedades() {
  const fecha = () => {
    let fecha = new Date();
    let mes = parseInt(fecha.getMonth() + 1);
    let hoy =
      fecha.getFullYear() +
      "-" +
      mes +
      "-" +
      fecha.getDate() +
      " " +
      fecha.getHours() +
      ":" +
      fecha.getMinutes();
    return hoy;
  };
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <div className="container">
      <div className="MainContent">
        <section className="contenido">
          <h3>REGISTRAR NOVEDAD</h3>
          <form>
            <div className="row">
              <div className="col" id="reloj">
                <label>Fecha y hora:</label>
                <p>{fecha()}</p>
              </div>
              <div className="col">
                <label>ID-Radioperador:</label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  placeholder="568923"
                  disabled
                />
              </div>
            </div>

            <form className="row g-3">
              <div className="col-md-6">
                <label for="validationDefault03" className="form-label">
                  ID-Motorizado:
                </label>
                <select
                  className="form-select"
                  id="validationDefault04"
                  required
                >
                  <option selected disabled value="">
                    852369
                  </option>
                  <option>425637</option>
                  <option>895623</option>
                  <option>215487</option>
                </select>
              </div>
              <div className="col-md-3">
                <label for="validationDefault04" className="form-label">
                  Tipo de novedad:
                </label>
                <select
                  className="form-select"
                  id="validationDefault04"
                  required
                >
                  <option selected>Seleccionar tipo</option>
                  <option>ASALTO</option>
                  <option>HURTO</option>
                  <option>ACCIDENTE</option>
                  <option>AMENAZA</option>
                </select>
              </div>
              <div className="col-md-3">
                <label for="validationDefault05" className="form-label">
                  ¿Otro tipo de novedad?
                </label>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#tpnov"
                  data-bs-whatever="@mdo"
                >
                  Nuevo tipo
                </button>
              </div>
              <div
                className="modal fade"
                id="tpnov"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Nuevo tipo de novedad
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label
                            for="recipient-name"
                            className="col-form-label"
                          >
                            Tipo de novedad
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                          />
                        </div>
                        <div className="mb-3">
                          <label for="message-text" className="col-form-label">
                            Descripcion tipo de novedad
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button type="button" className="btn btn-primary">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col">
                <label>Empresa:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  required
                >
                  <option selected>Seleccionar empresa</option>
                  <option>FERRETEROS SAS</option>
                  <option>PALOQUEMAO</option>
                  <option>PUNTO SAN JUAN</option>
                </select>
              </div>

              <div className="col">
                <label for="validationDefault05" className="form-label">
                  ¿No esta registrada?
                </label>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#direccion"
                  data-bs-whatever="@mdo"
                >
                  Agregar direccion
                </button>
              </div>
            </div>
            <div className="con">
              <div
                className="modal fade"
                id="direccion"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Nueva direccion
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label for="recipient-name" className="col-form-label">
                            Ingresa direccion
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipient-name"
                          />
                        </div>
                        <div className="mb-3">{/* colocar api mapa */}</div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button type="button" className="btn btn-primary">
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
            <div className="form-group">
            <form>
              <label for="comment">Descripcion de la novedad:</label>
              <textarea
                className="form-control"
                rows="5"
                id="comment"
                placeholder="Describe lo ocurrido..."
                required
              ></textarea>

              <div className="mb-3">
                <label for="formFile" className="form-label">
                  Evidencia de la novedad:
                </label>
                <input className="form-control" type="file" id="formFile" />
              </div>

              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" type="submit">
                  Enviar registro
                </button>

              </div>
            </form>
            </div>
            </div>
            

            
          </form>
        </section>
      </div>
    </div>
  );
}
