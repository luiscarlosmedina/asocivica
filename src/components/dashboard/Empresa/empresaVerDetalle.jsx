import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sede from './sede';
import EditarE from './editarempresa'
import { useAuth } from '../../../autenticate';

export default function EmpresaVerDetalle() {
  const [loading, setLoading] = useState(true);
  const { empresaid } = useParams();
  const back = useNavigate();
  const { user } = useAuth();
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
  const [doc, setDoc] = useState([])

  //llamar los tipos de documentos
  const fetchDataDoc = () => {
    fetch(
      `http://localhost/api_sisinov/public/api/tdoc`
    )
      .then((response) => response.json())
      .then((doc) => {
        setDoc(doc.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDataDoc();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_sisinov/public/api/empresa/${empresaid}`)
      .then((response) => response.json())
      .then((data) => {
        setEmpresa(data.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //transformar el formato de fecha
  const date = (fechaCompleta) => {
    const fecha = new Date(fechaCompleta);
    const soloFecha = fecha.toISOString().split('T')[0];
    return soloFecha;
  }
  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div key={empresa.id_e} >
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <p className="t h2 mb-4 mt-3">Datos Basicos</p>
            </div>
            <div>
              {user.ID_rol !== 3 ? <button type="button" className="btnfa btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarempresa" data-bs-whatever="@mdo"> Editar </button> : ""}
              <button type="button" className="btn-close m-3" onClick={() => back('/consultar-empresas')}></button>
            </div>
          </div>
          {/*inicio de modal editar empresa*/}
          <div
            className="modal fade"
            id="editarempresa"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
          >
            <div className="modal-dialog">
              <EditarE id={empresaid} onUpdate={fetchData} />
            </div>
          </div>
          {/*fin de modal editar empresa*/}
          <div className={`mb-1 mt-1 borsupd border-3 `}></div>
          <div className='m-auto row'>
            <div className='col'>
              <div className='row box-datos-basicos '>
                <div className='col-6 caja-input  '>
                  <span className="t-box">NIT: </span>
                  <p className='i-box mb-2'>{empresa.Nit_E}</p>
                  <span className="t-box">Nombre empresa:</span>
                  <p className='i-box mb-2'>{empresa.Nom_E}</p>
                  <span className="t-box">Email: </span>
                  <p className='i-box mb-2'>{empresa.Eml_E !== "" ? empresa.Eml_E : "No registra"}</p>
                  <span className="t-box">Telefono: </span>
                  <p className='i-box mb-2'>{empresa.telefonoGeneral !== "" ? empresa.telefonoGeneral : "No registra"}</p>
                  <span className="t-box">Cuota: </span>
                  <p className='i-box mb-2'>{empresa.Val_E !== "" ? empresa.Val_E : "No registra"}</p>
                  <span className="t-box">Nombre representante legal: </span>
                  <p className='i-box mb-2'>{empresa.Nom_Rl !== "" ? empresa.Nom_Rl : "No registra"}</p>
                </div>

                <div className='col-6 caja-input'>
                  <span className="t-box">Sector economico: </span>
                  <p className='i-box mb-2'>{empresa.COD_SE !== "" ? empresa.COD_SE : "No registra"}</p>
                  <span className="t-box">Actividad economica:  </span>
                  <p className='i-box mb-2'>{empresa.COD_AE !== "" ? empresa.COD_AE : "No registra"}</p>
                  <span className="t-box">Estado:  </span>
                  <p className='i-box mb-2'>{empresa.Est_E === "0" ? "Activo" : empresa.Est_E === "1" ? "En estudio" : "Inactivo"}</p>
                  {empresa.Est_E === "0" ?
                    <div>
                      <span className="t-box">Afiliacion:  </span>
                      <p className='i-box mb-2'>{date(empresa.Fh_Afi)}</p>
                    </div>
                    :
                    <div>
                      <span className="t-box">Desafiliacion:</span>
                      <p className='i-box mb-2'>{date(empresa.fechaFinalizacion)}</p>
                    </div>
                  }
                  <span className="t-box">
                    {doc.map((item) => (item.ID_Doc === empresa.ID_Doc ?
                      <div>
                        {item.N_TDoc}
                      </div>
                      : ""
                    ))}</span>
                  <p className='i-box mb-2'>{empresa.CC_Rl !== "" ? empresa.CC_Rl : "No registra"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sede id={empresaid} />
    </div>
  );
}
