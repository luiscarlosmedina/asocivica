import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sede from './sede';
import Editar_e from './editarempresa'

export default function EmpresaVerDetalle() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const back = useNavigate()
  const [empresa, setEmpresa] = useState({
    id_e: "",
    Nit_E: "",
    Nom_E: "",
    Eml_E: "",
    Nom_Rl: "",
    ID_Doc: "",
    CC_Rl: "",
    telefonoGeneral: "",
    Val_E: "",
    Est_E: "",
    Fh_Afi: "",
    fechaFinalizacion: "",
    COD_SE: "",
    COD_AE: ""
  })

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readempresa&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmpresa(data.contenido[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) :(
            <div key={empresa.id_e} >
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h3>Datos Basicos</h3>
                </div>
                <div>
                  <button type="button" className="btn btn-link" onClick={() => back('/consultar-empresas')}>Salir</button>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editarempresa" data-bs-whatever="@mdo"> Editar </button>
                </div>
              </div>
              {/*inicio de modal editar empresa*/}
              <div
                className="modal fade"
                id="editarempresa"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                data-bs-backdrop="static"
              >
                <div className="modal-dialog">
                  <Editar_e id={id} />
                </div>
              </div>
              {/*fin de modal editar empresa*/}
              <hr className='pb-3' />
              <div className='d-flex justify-content-around '>
                <div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-buildings-fill text-primary"></i></span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Nom_E} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-envelope-fill text-primary"></i></span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Eml_E} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-telephone-fill text-primary"></i></span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.telefonoGeneral !== "" ? empresa.telefonoGeneral : "No registra"} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i className="bi bi-currency-dollar text-primary"></i></span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Val_E !== "" ? empresa.Val_E : "No registra"} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text bg-transparent" id="inputGroup-sizing-default"><i class="bi bi-person-fill text-primary"></i></span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Nom_Rl !== "" ? empresa.Nom_Rl : "No registra"} />
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">NIT</span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Nit_E !== "" ? empresa.Nit_E : "No registra"} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Sector</span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.COD_SE !== "" ? empresa.COD_SE : "No registra"} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Actividad</span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.COD_AE !== "" ? empresa.COD_AE : "No registra"} />
                  </div>
                  <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Estado</span>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Est_E === "0" ? "Activo" : empresa.Est_E === "1" ? "En estudio" : "Inactivo"} />
                  </div>
                  {empresa.Est_E === "0" ? (
                    <div className="input-group mb-3 align-items-center">
                      <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Afiliacion</span>
                      <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.Fh_Afi} />
                    </div>
                  ) : (
                    <div className="input-group mb-3 align-items-center">
                      <span className="input-group-text text-primary bg-transparent" id="inputGroup-sizing-default">Desafiliacion</span>
                      <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.fechaFinalizacion} />
                    </div>
                  )}
                  <div className="input-group mb-3 align-items-center">
                    <select className="form-control text-primary bg-transparent" id="inputGroup-sizing-default" value={empresa.ID_Doc} disabled>
                      <option value="1" >Tarjeta Identidad</option>
                      <option value="2" >Cedula Ciudadania</option>
                    </select>
                    <input type="text" className="form-control bg-transparent border border-0 fw-bold" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" disabled value={empresa.CC_Rl} />
                  </div>
                </div>
              </div>
            </div>
        )}
      <Sede id={id} />
    </div>
  );
}
