import React from "react";

const DatosUsuario = props => {
  return (
    <div onKeyDown={props.handleKeyDown}>
      <h1 className="py-2">Datos personales</h1>
      <div className="form-group">
        <label htmlFor="">Nombre:</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.nombre}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Apellido:</label>
        <input
          type="text"
          name="apellido"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.apellido}
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-left">
          Usuario:
        </label>
        <input
          type="text"
          name="usuario"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.usuario}
        />
      </div>
      <div className="text-right">
        <button className="btn btn-primary m-2" onClick={props.pasoSiguiente}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default DatosUsuario;