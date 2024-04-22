import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../autenticate';
import Changepass from './component/changepass';
import swal from 'sweetalert';

export default function Perfil() {
  const { user,token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [empleado, setEmpleado] = useState({
    id_em: user.id_em,
    n_em: "",
    a_em: "",
    eml_em: "",
    dir_em: "",
    lic_emp: "",
    tel_em: "",
    barloc_em: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_sisinov/public/api/readperfil`,{
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({id_em:user.id_em, nToken:token}),
  })
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

  const handleInputChange = (field, value) => {
    setEmpleado({
      nToken: token,
      ...empleado,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost/api_sisinov/public/api/updateperfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.error === false) {
          swal("Buen trabajo!", `Perfil actualizado`, "success");
          setEditing(false);
        } else {
          swal("Error!", `No se actualizo el perfil`, "error");
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        swal("Algo salio mal!", `error ${error}`, "error");
      });
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <div className=' col-5' > <p className="t h3 mb-2 mt-3">Perfil </p></div>
            </div>
            <div>
              {!editing ? (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setEditing(true)}
                >
                  Editar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveChanges}
                >
                  Guardar
                </button>
              )}
            </div>
          </div>
          <div className={`mb-1 mt-1 borsupd border-3 `}></div>
          <div className="row container-fluid">
            <div className='col-10 m-auto'>
              <div className='row box-datos-basicos p-3'>
                <div className='col-6 caja-p'>
                  <span className="t-box">Nombres: </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.n_em}
                      onChange={(e) => handleInputChange('n_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.n_em}</p>
                  )}
                  <span className="t-box">Apellidos: </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.a_em}
                      onChange={(e) => handleInputChange('a_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.a_em}</p>
                  )}
                  <span className="t-box">Barrio y localidad: </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.barloc_em}
                      onChange={(e) => handleInputChange('barloc_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.barloc_em}</p>
                  )}
                  <span className="t-box">Telefono celular: </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.tel_em}
                      onChange={(e) => handleInputChange('tel_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.tel_em}</p>
                  )}
                </div>
                <div className='col-6 caja-p'>
                  <span className="t-box">Email: </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.eml_em}
                      onChange={(e) => handleInputChange('eml_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.eml_em}</p>
                  )}
                  <span className="t-box">Dirección:  </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.dir_em}
                      onChange={(e) => handleInputChange('dir_em', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.dir_em}</p>
                  )}
                  <span className="t-box">Licencia de conducción:  </span>
                  {editing ? (
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={empleado.lic_emp}
                      onChange={(e) => handleInputChange('lic_emp', e.target.value)}
                    />
                  ) : (
                    <p className='i-box mb-2'>{empleado.lic_emp}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row container-fluid my-3">
            <div className='col-10 m-auto'>
              <div className='row box-datos-basicos '>
                <Changepass id={user.id_em} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
