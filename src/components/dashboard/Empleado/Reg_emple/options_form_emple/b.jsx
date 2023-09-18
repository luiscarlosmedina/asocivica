import React, { useState } from "react";

function BEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;

  const [errores, setErrores] = useState({});

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "id_doc":
        if (
          valorCampo !== "1" &&
          valorCampo !== "2" &&
          valorCampo !== "3" &&
          valorCampo !== "4" &&
          valorCampo !== "5" &&
          valorCampo !== "6"
        ) {
          nuevosErrores.id_doc =
            "Por favor, seleccione un tipo de documento válido";
        } else {
          delete nuevosErrores.id_doc;
        }
        break;

      case "documento":
        if (!valorCampo.trim()) {
          nuevosErrores.documento =
            "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 14) {
          nuevosErrores.documento =
            "El campo debe tener entre 2 y 14 caracteres";
        } else {
          delete nuevosErrores.documento;
        }
        break;

      case "barloc_em":
        if (!valorCampo.trim()) {
          nuevosErrores.barloc_em =
            "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 50) {
          nuevosErrores.barloc_em =
            "El campo debe tener entre 2 y 50 caracteres";
        } else {
          delete nuevosErrores.barloc_em;
        }

        break;

      case "dir_em":
        if (!valorCampo.trim()) {
          nuevosErrores.dir_em = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 50) {
          nuevosErrores.dir_em = "El campo debe tener entre 2 y 50 caracteres";
        } else {
          delete nuevosErrores.dir_em;
        }

        break;

      case "tel_em":
        const telefonoRegex = /^[0-9]{7,15}$/;

        if (!telefonoRegex.test(valorCampo)) {
          nuevosErrores.tel_em =
            "Por favor, ingrese un número de teléfono válido";
        } else {
          delete nuevosErrores.tel_em;
        }
        break;

      case "id_rh":
        if (
          valorCampo !== "1" &&
          valorCampo !== "2" &&
          valorCampo !== "3" &&
          valorCampo !== "4" &&
          valorCampo !== "5" &&
          valorCampo !== "6" &&
          valorCampo !== "7" &&
          valorCampo !== "8"
        ) {
          nuevosErrores.id_rh =
            "Por favor, seleccione un tipo de documento válido";
        } else {
          delete nuevosErrores.id_rh;
        }

        break;

      default:
        // No se realiza ninguna validación para otros campos
        break;
    }

    setErrores(nuevosErrores);
  };
  return (
    <section className="secundary-box">
      <div className="container">
        <form className="box-main">
          <div className="box-main2">
            <div>
              <label className="form-label">Tipo de Documento</label>
              <select
                type="Number"
                name="id_doc"
                className={`form-control ${
                  errores.id_doc
                    ? "is-invalid"
                    : valores.id_doc
                    ? "is-valid"
                    : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_doc", e.target.value);
                }}
                value={valores.id_doc}
              >
                <option value="">seleccione un tipo de documento </option>
                <option value="1">Tarjeta de Identidad</option>
                <option value="2">Cédula de Ciudadanía</option>
                <option value="3">Tarjeta de Extranjería</option>
                <option value="4">Cédula de Extranjería</option>
                <option value="5">Pasaporte</option>
                <option value="6">Nit</option>
              </select>
              <div className="invalid-feedback">{errores.id_doc}</div>
            </div>
            <div>
              <label className="form-label">Numero de Documento</label>
              <input
                type="Number"
                name="documento"
                className={`form-control ${
                  errores.documento
                    ? "is-invalid"
                    : valores.documento
                    ? "is-valid"
                    : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("documento", e.target.value);
                }}
                value={valores.documento}
              />
              <div className="invalid-feedback">{errores.documento}</div>
            </div>
            <div>
              <label className="form-label">Barrio y localidad</label>
              <input
                type="text"
                name="barloc_em"
                className={`form-control ${
                  errores.barloc_em
                    ? "is-invalid"
                    : valores.barloc_em
                    ? "is-valid"
                    : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("barloc_em", e.target.value);
                }}
                value={valores.barloc_em}
              />
              <div className="invalid-feedback">{errores.barloc_em}</div>
            </div>
            <div>
              <label className="form-label">Dirección</label>
              <input
                type="text"
                name="dir_em"
                className={`form-control ${
                  errores.dir_em
                    ? "is-invalid"
                    : valores.dir_em
                    ? "is-valid"
                    : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("dir_em", e.target.value);
                }}
                value={valores.dir_em}
              />
              <div className="invalid-feedback">{errores.dir_em}</div>
            </div>
            <div>
              <label className="form-label">Telefono</label>
              <input
                type="Number"
                name="tel_em"
                className={`form-control ${
                  errores.tel_em
                    ? "is-invalid"
                    : valores.tel_em
                    ? "is-valid"
                    : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("tel_em", e.target.value);
                }}
                value={valores.tel_em}
              />
              <div className="invalid-feedback">{errores.tel_em}</div>
            </div>
            <div className="">
              <label className="form-label">rh</label>
              <select
                type="Number"
                name="id_rh"
                className={`form-control ${
                  errores.id_rh ? "is-invalid" : valores.id_rh ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_rh", e.target.value);
                }}
                value={valores.id_rh}
              >
                <option value="">Seleccione un tipo de rh</option>
                <option value="1">A+</option>
                <option value="2">A-</option>
                <option value="3">B+</option>
                <option value="4">B-</option>
                <option value="5">AB+</option>
                <option value="6">AB-</option>
                <option value="7">O+</option>
                <option value="8">O-</option>
              </select>
              <div className="invalid-feedback">{errores.id_rh}</div>

              <div className="espbots">
                <div className="float-end">
                  <button className="btn btn-primary" onClick={siguientePaso}>
                    siguiente
                  </button>
                </div>

                <div className="float-start ">
                  <button className="btn btn-primary" onClick={anteriorPaso}>
                    volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default BEmple;
