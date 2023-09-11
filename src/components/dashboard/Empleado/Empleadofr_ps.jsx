import React, { useState } from 'react';

function Empleado_ps({ onDataUpdate }) {
  const [empleadoData, setEmpleadoData] = useState({
    id_doc: '',
    documento: '',
    n_em: '',
    a_em: '',
    eml_em: '',
    f_em: '',
    dir_em: '',
    lic_emp: '',
    lib_em: '',
    tel_em: '',
    contrato: '',
    barloc_em: '',
    id_pens: '',
    id_eps: '',
    id_arl: '',
    id_ces: '',
    id_rh: '',
    id_rol: '',
    estado: '',
    passw: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleadoData({
      ...empleadoData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    fetch('http://localhost/API/api.php?apicall=createempleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage('Error al crear el empleado');
        } else {
          setMessage('Empleado creado correctamente');
          // Limpia el formulario después de un registro exitoso
          setEmpleadoData({
            id_doc: '',
            documento: '',
            n_em: '',
            a_em: '',
            eml_em: '',
            f_em: '',
            dir_em: '',
            lic_emp: '',
            lib_em: '',
            tel_em: '',
            contrato: '',
            barloc_em: '',
            id_pens: '',
            id_eps: '',
            id_arl: '',
            id_ces: '',
            id_rh: '',
            id_rol: '',
            estado: '',
            passw: '',
          });
          onDataUpdate(); // Llama a la función de actualización de datos proporcionada como prop
        }
      })
      .catch((error) => {
        setMessage('Error en la solicitud');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Agregar un empleado</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id_doc">Tipo de Documento</label>
          <input
            type="text"
            id="id_doc"
            name="id_doc"
            value={empleadoData.id_doc}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="documento">Documento</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={empleadoData.documento}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="n_em">Nombre</label>
          <input
            type="text"
            id="n_em"
            name="n_em"
            value={empleadoData.n_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="a_em">Apellido</label>
          <input
            type="text"
            id="a_em"
            name="a_em"
            value={empleadoData.a_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eml_em">Correo Electrónico</label>
          <input
            type="email"
            id="eml_em"
            name="eml_em"
            value={empleadoData.eml_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="f_em">Foto</label>
          <input
            type="text"
            id="f_em"
            name="f_em"
            value={empleadoData.f_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dir_em">Dirección</label>
          <input
            type="text"
            id="dir_em"
            name="dir_em"
            value={empleadoData.dir_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lic_emp">Licencia</label>
          <input
            type="text"
            id="lic_emp"
            name="lic_emp"
            value={empleadoData.lic_emp}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lib_em">Libreta</label>
          <input
            type="text"
            id="lib_em"
            name="lib_em"
            value={empleadoData.lib_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tel_em">Teléfono</label>
          <input
            type="text"
            id="tel_em"
            name="tel_em"
            value={empleadoData.tel_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contrato">Contrato</label>
          <input
            type="text"
            id="contrato"
            name="contrato"
            value={empleadoData.contrato}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="barloc_em">Barrio y Localidad</label>
          <input
            type="text"
            id="barloc_em"
            name="barloc_em"
            value={empleadoData.barloc_em}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_pens">Tipo de Pensión</label>
          <input
            type="text"
            id="id_pens"
            name="id_pens"
            value={empleadoData.id_pens}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_eps">EPS</label>
          <input
            type="text"
            id="id_eps"
            name="id_eps"
            value={empleadoData.id_eps}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_arl">ARL</label>
          <input
            type="text"
            id="id_arl"
            name="id_arl"
            value={empleadoData.id_arl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_ces">Cesantías</label>
          <input
            type="text"
            id="id_ces"
            name="id_ces"
            value={empleadoData.id_ces}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_rh">RH</label>
          <input
            type="text"
            id="id_rh"
            name="id_rh"
            value={empleadoData.id_rh}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="id_rol">Rol</label>
          <input
            type="text"
            id="id_rol"
            name="id_rol"
            value={empleadoData.id_rol}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            name="estado"
            value={empleadoData.estado}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passw">Contraseña</label>
          <input
            type="password"
            id="passw"
            name="passw"
            value={empleadoData.passw}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Registrar Empleado</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Empleado_ps;












