import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate


function AEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;

  const navigate = useNavigate();


  const [errores, setErrores] = useState({});
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const VerContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "estado":
        if (valorCampo !== "0" && valorCampo !== "1") {
          nuevosErrores.estado = "Por favor, seleccione un estado válido";
        } else {
          delete nuevosErrores.estado;
        }
        break;

      case "id_rol":
        if (
          valorCampo !== "1" &&
          valorCampo !== "2" &&
          valorCampo !== "3" &&
          valorCampo !== "4"
        ) {
          nuevosErrores.id_rol = "Por favor, seleccione un rol válido";
        } else {
          delete nuevosErrores.id_rol;
        }

        break;

      case "n_em":
        if (!valorCampo.trim()) {
          nuevosErrores.n_em = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
          nuevosErrores.n_em = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.n_em = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.n_em;
        }
        break;

      case "a_em":
        if (!valorCampo.trim()) {
          nuevosErrores.a_em = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
          nuevosErrores.a_em = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.a_em = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.a_em;
        }
        break;

      case "eml_em":
        if (!valorCampo.trim()) {
          nuevosErrores.eml_em = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 5 || valorCampo.length > 40) {
          nuevosErrores.eml_em = "El campo debe tener entre 5 y 40 caracteres";
        } else if (
          !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(valorCampo)
        ) {
          nuevosErrores.eml_em = "Ingrese una dirección de correo válida";
        } else {
          delete nuevosErrores.eml_em;

        }
        break;

      case "passw":
        if (!valorCampo.trim()) {
          nuevosErrores.passw = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 8) {
          nuevosErrores.passw =
            "Una contraseña segura debe tener al menos 8 caracteres";
        } else if (valorCampo.length > 20) {
          nuevosErrores.passw =
            "La contraseña puede tener como máximo 20 caracteres";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
            valorCampo
          )
        ) {
          nuevosErrores.passw =
            "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial";
        } else {
          delete nuevosErrores.passw;
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
              <label className="form-label">Estado</label>
              <select
                type="Number"
                name="estado"
                className={`form-control ${
                  errores.estado
                    ? "is-invalid"
                    : valores.estado
                    ? "is-valid"
                    : ""
                }`}
                id="estado"
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("estado", e.target.value);
                }}
                value={valores.estado}
              >
                <option value="">Seleccione un estado</option>
                <option value="0">Activo</option>
                <option value="1">Desactivo</option>
              </select>
              <div className="invalid-feedback">{errores.estado}</div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Rol
              </label>
              <select
                type="number"
                name="id_rol"
                className={`form-control ${
                  errores.id_rol
                    ? "is-invalid"
                    : valores.id_rol
                    ? "is-valid"
                    : ""
                }`}
                id="id_rol"
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_rol", e.target.value);
                }}
                value={valores.id_rol}
              >
                <option value="">seleccione un Rol</option>
                <option value="1">Administrador</option>
                <option value="2">Radio operador</option>
                <option value="3">Motorizado</option>
                <option value="4">Empresa</option>
              </select>

              <div className="invalid-feedback">{errores.id_rol}</div>
            </div>
            <div>
              <label className="form-label">Nombres</label>
              <input
                type="text"
                name="n_em"
                className={`form-control ${
                  errores.n_em ? "is-invalid" : valores.n_em ? "is-valid" : ""
                }`}
                id="n_em"
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("n_em", e.target.value);
                }}
                value={valores.n_em}
              />

              <div className="invalid-feedback">{errores.n_em}</div>
            </div>
            <div>
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                name="a_em"
                className={`form-control ${
                  errores.a_em ? "is-invalid" : valores.a_em ? "is-valid" : ""
                }`}
                id="a_em"
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("a_em", e.target.value);
                }}
                value={valores.a_em}
              />

              <div className="invalid-feedback">{errores.a_em}</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electronico</label>
              <input
                type="email"
                name="eml_em"
                className={`form-control ${
                  errores.eml_em
                    ? "is-invalid"
                    : valores.eml_em
                    ? "is-valid"
                    : ""
                }`}
                id="eml_em"
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("eml_em", e.target.value);
                }}
                value={valores.eml_em}
              />

              <div className="invalid-feedback">{errores.eml_em}</div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Contraseña
              </label>
              <input
                type={mostrarContraseña ? "text" : "password"}
                name="passw"
                id="passw"
                className={`form-control  type="text" ${
                  errores.passw ? "is-invalid" : valores.passw ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("passw", e.target.value);
                }}
                value={valores.passw}
              />

              <div className="invalid-feedback">{errores.passw}</div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="mostrarContraseñaCheckbox"
                onChange={VerContraseña}
              />
              <label
                className="form-check-label"
                htmlFor="mostrarContraseñaCheckbox"
              >
                Mostrar Contraseña
              </label>
            </div>

            <div className="espbots">
              <div className="float-end">
                <button
                  className="btnf btn btn-primary"
                  onClick={() => {
                    siguientePaso();
                  }}
                >
                  Siguiente
                </button>
              </div>

              <div className="float-start ">
              <button
                className="btnf btn btn-primary"
                onClick={() => {
                  navigate("/inicio"); // Utiliza navigate dentro de una función de flecha
                }}
              >
                volver
              </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AEmple;
