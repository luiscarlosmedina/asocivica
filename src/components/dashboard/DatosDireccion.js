import React from "react";

const DatosDireccion = props => {
  return (
    <div onKeyDown={props.handleKeyDown}>
      <h1 className="py-2">Datos direccion:</h1>
      <div className="form-group">
        <label htmlFor="">Calle:</label>
        <input
          type="text"
          name="calle"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.calle}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Colonia:</label>
        <input
          type="text"
          name="colonia"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.colonia}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Ciudad:</label>
        <input
          type="text"
          name="ciudad"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.ciudad}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Estado:</label>
        <input
          type="text"
          name="estado"
          className="form-control"
          onChange={props.handleInputChange}
          value={props.valores.estado}
        />
      </div>

      <div className="text-right">
        <button
          className="btn btn-primary m-2 px-4"
          onClick={props.pasoAnterior}
        >
          Atras
        </button>
        <button className="btn btn-primary m-2" onClick={props.pasoSiguiente}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DatosDireccion;