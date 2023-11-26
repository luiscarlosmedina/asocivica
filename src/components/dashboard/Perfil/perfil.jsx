import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../autenticate';
import Changepass from './component/changepass';

export default function Perfil() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [empleado, setEmpleado] = useState({
    id_em: "",
    documento: "",
    n_em: "",
    a_em: "",
    eml_em: "",
    f_em: "",
    dir_em: "",
    lic_emp: "",
    lib_em: "",
    tel_em: "",
    contrato: "",
    barloc_em: "",
    id_doc: "",
    id_pens: "",
    id_eps: "",
    id_arl: "",
    id_ces: "",
    id_rh: "",
    estado: ""
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempleado&id=${user.id_em}`)
      .then((response) => response.json())
      .then((data) => {
        setEmpleado(data.contenido[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <div className=' col-5' > <p className="t h3 mb-2 mt-3">Perfil </p></div>
        </div>
        <div>
          <button type="button" className="btn btn-outline-primary"> Editar </button>
        </div>
      </div>
      <hr className="mb-3 mt-2 border border-2 border-primary opacity-75" />
      <div className="row container-fluid">
        <div className='col-10 m-auto'>
          <div className='row box-datos-basicos p-3'>
            <div className='col-6 caja-p'>
              <span className="t-box">Nombres y apellidos: </span>
              <p className='i-box mb-2'>{empleado.n_em + ' ' + empleado.a_em}</p>
              <span className="t-box">Barrio y localidad: </span>
              <p className='i-box mb-2'>{empleado.barloc_em}</p>
              <span className="t-box">Telefono celular: </span>
              <p className='i-box mb-2'>{empleado.tel_em}</p>
            </div>
            <div className='col-6 caja-p'>
              <span className="t-box">Email: </span>
              <p className='i-box mb-2'>{empleado.eml_em}</p>
              <span className="t-box">Dirección:  </span>
              <p className='i-box mb-2'>{empleado.lib_em}</p>
              <span className="t-box">Licencia de conducción:  </span>
              <p className='i-box mb-2'>{empleado.lic_emp}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row container-fluid my-3">
        <div className='col-10 m-auto'>
          <div className='row box-datos-basicos '>
            <Changepass id={user.id_em}/>
          </div>
        </div>
      </div>
    </div>
  )
}
