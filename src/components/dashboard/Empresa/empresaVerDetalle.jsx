import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sede from './sede';
import Editar from './editar';

export default function EmpresaVerDetalle() {
  const [data, setData] = useState("");
  const  {id}  = useParams();
  const back = useNavigate()

  useEffect(() => {
    fetchData();
  }, []); // Agregar dataUpdated como dependencia

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempresa&id=${id}`)
      .then((response) => response.json())
      .then((data) => setData(data.contenido))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {Array.isArray(data) ? (
        data.map(item => (
          <div key={item.id_e} >
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <h3>Datos Basicos</h3>
              </div>
              <div>
                <button type="button" className="btn btn-link" onClick={() => back(-1)}>Salir</button>
                <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editar" data-bs-whatever="@mdo"> Editar </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="editar"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Editar empresa
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <Editar />
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
            <hr className='pb-3' />
            <div className='d-flex justify-content-around '>
              <div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-buildings-fill text-primary"></i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Nom_E} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-envelope-fill text-primary"></i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Eml_E} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-telephone-fill text-primary"></i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.telefonoGeneral !== "" ? item.telefonoGeneral : "No registra"} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-currency-dollar text-primary"></i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Val_E !== "" ? item.Val_E : "No registra"} />
                </div>
              </div>
              <div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">NIT</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Nit_E !== "" ? item.Nit_E : "No registra"} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Sector</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.COD_SE !== "" ? item.COD_SE : "No registra"} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Actividad</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.COD_AE !== "" ? item.COD_AE : "No registra"} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Estado</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Est_E === "0" ? "Activo" : "Inactivo"} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Afiliacion</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Fh_Afi} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Desafiliacion</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.fechaFinalizacion} />
                </div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre representante legal</th>
                  <th scope="col">Tipo de documento</th>
                  <th scope="col">N° documento</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td scope="row">{item.Nom_Rl}</td>
                  <td>{item.N_TDoc}</td>
                  <td>{item.CC_Rl}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No Encontramos la informacion que buscas</p>
      )}
      <h3>Sedes y encargados</h3>
    
    </div>
  );
}
