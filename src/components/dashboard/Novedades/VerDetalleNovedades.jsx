import React, { useEffect, useState } from "react";
import Editar from './editar';
import { Link } from 'react-router-dom';
import Sede from "../Empresa/sede";
import Novedades from "./Novedades";


export default function VerDetalleNovedades() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const back = useNavigate()

  const handlePostData = async () => {

    const response = await fetch(
      "api-novedad",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    const data = await response.json();
    setData(data.contenido);
  };

  useEffect(() => {
    handlePostData();
  }, [id]);

  return (
    <div>
      {Array.isArray(data) ? (
        data.map(item => (
          <div key={item.id_e} >
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <h3>Datos registrados</h3>
              </div>
              <div>
                <button type="button" className="btn btn-link" onClick={() => back(-1)}>Salir</button>
                <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editar" data-bs-whatever="@mdo"> Editar </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="editar"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Editar novedad
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
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.ID_Nov} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-envelope-fill text-primary">Direccion</i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Dic_Nov} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-telephone-fill text-primary"></i>Descripcion</span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.Des_Nov} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-currency-dollar text-primary"></i></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.id_evi} />
                </div>
              </div>
              <div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default"></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.id_em} />
                </div>
                <div className="input-group mb-3 align-items-center">
                  <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default"></span>
                  <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={item.ID_S} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Encontramos la informacion que buscas</p>
      )}
    </div>
  );
}
