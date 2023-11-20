import React, { useState } from "react";
import swal from 'sweetalert';

function CEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});

  const validarcamposc = () => {
    console.log("si")
    let campos = ["lib_em", "lic_emp", "id_eps", "id_pens", "id_ces", "id_arl"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      siguientePaso();
  } else{
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
  }
    return documentosValidos;
  };


  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "lib_em":
        if (
          valorCampo !== "Primera clase" &&
          valorCampo !== "Segunda clase" &&
          valorCampo !== "En proceso" &&
          valorCampo !== "No aplica"
        ) {
          nuevosErrores.lib_em =
            "Por favor, seleccione un tipo de documento válido";
        } else {
          delete nuevosErrores.lib_em;
        }
        break;

      case "lic_emp":
        if (valorCampo === "" || valorCampo === null) {
          nuevosErrores.lic_emp = "Por favor, este campo no puede estar vacio";
        } else {
          delete nuevosErrores.lic_emp;
        }
        break;

      case "id_eps":
        if (
          valorCampo !== "1" &&
          valorCampo !== "2" &&
          valorCampo !== "3" &&
          valorCampo !== "4" &&
          valorCampo !== "5" &&
          valorCampo !== "6" &&
          valorCampo !== "7" &&
          valorCampo !== "8" &&
          valorCampo !== "7" &&
          valorCampo !== "9" &&
          valorCampo !== "10"
        ) {
          nuevosErrores.id_eps = "Por favor, este campo no puede estar vacio";
        } else {
          delete nuevosErrores.id_eps;
        }

        break;

      case "id_pens":
        if (
          valorCampo !== "1" &&
          valorCampo !== "2" &&
          valorCampo !== "3" &&
          valorCampo !== "4" &&
          valorCampo !== "5" &&
          valorCampo !== "6" &&
          valorCampo !== "7" &&
          valorCampo !== "8" &&
          valorCampo !== "7" &&
          valorCampo !== "9" &&
          valorCampo !== "10"

        ) {
          nuevosErrores.id_pens = "Por favor, este campo no puede estar vacio";
        } else {
          delete nuevosErrores.id_pens;
        }

        break;

      case "id_ces":
        if (valorCampo !== "1" &&
        valorCampo !== "2" &&
        valorCampo !== "3" &&
        valorCampo !== "4" &&
        valorCampo !== "5" &&
        valorCampo !== "6" &&
        valorCampo !== "7" &&
        valorCampo !== "8" &&
        valorCampo !== "7" &&
        valorCampo !== "9" &&
        valorCampo !== "10") {
          nuevosErrores.id_ces =
            "Por favor, este el campo no puede estar vacio";
        } else {
          delete nuevosErrores.id_ces;
        }

        break;

      case "id_arl":
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
          nuevosErrores.id_arl =
            "Por favor, seleccione un tipo de documento válido";
        } else {
          delete nuevosErrores.id_arl;
        }

        break;

      default:

        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  return (
    <section className="secundary-box">
      <div className="container">
        <div className="box-main">
          <div className="box-main2">
            <div>
              <label className="form-label">Tipo de libreta militar</label>
              <select
                type="Text"
                name="lib_em"
                className={`form-control ${errores.lib_em
                    ? "is-invalid"
                    : valores.lib_em
                      ? "is-valid"
                      : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("lib_em", e.target.value);
                }}
                value={valores.lib_em}
              >
                <option value="">seleccione una opción </option>
                <option value="Primera clase">Primera clase</option>
                <option value="Segunda clase">Segunda clase</option>
                <option value="En proceso">En proceso</option>
                <option value="No aplica">No aplica</option>
              </select>
              <div className="invalid-feedback">{errores.lib_em}</div>
            </div>
            <div>
              <label className="form-label">
                Tipo de licencia de conducción
              </label>
              <input
                type="Text"
                name="lic_emp"
                className={`form-control ${
                  errores.lic_emp ? "is-invalid" : valores.lic_emp ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("lic_emp", e.target.value);
                }}
                value={valores.lic_emp}
              />
              <div className="invalid-feedback">{errores.lic_emp}</div>
            </div>
            <div>
              <label className="form-label">Eps</label>
              <select
                type="Text"
                name="id_eps"
                className={`form-control ${errores.id_eps
                    ? "is-invalid"
                    : valores.id_eps
                      ? "is-valid"
                      : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_eps", e.target.value);
                }}
                value={valores.id_eps}
              >
                <option value="">seleccione una opción </option>
                <option value="1">Sura</option>
                <option value="2">Compensar</option>
                <option value="3">Nueva eps</option>
                <option value="4">Sanitas</option>
                <option value="5">Coomeva</option>
                <option value="6">Salud total</option>
                <option value="7">Famisanar</option>
                <option value="8">Asmet salud</option>
                <option value="9">ASMET salud</option>
                <option value="10">Medimas</option>
              </select>

              <div className="invalid-feedback">{errores.id_eps}</div>
            </div>
            <div>
              <label className="form-label">Fondo pensional</label>
              <select
                type="Number"
                name="id_pens"
                className={`form-control ${errores.id_pens
                    ? "is-invalid"
                    : valores.id_pens
                      ? "is-valid"
                      : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_pens", e.target.value);
                }}
                value={valores.id_pens}
              >
                <option value="">seleccione una opción </option>
                <option value="1">Colpensiones</option>
                <option value="2">Porvenir</option>
                <option value="3">Proteccion</option>
                <option value="4">Old mutual</option>
                <option value="5">Fondo nacional del ahorro</option>
                <option value="6">Fondo de pensiones de Antioquia</option>
                <option value="7">Fondo de penciones de Córdoba</option>
                <option value="8">Fondo de penciones de Tolima</option>
                <option value="9">Fondo de penciones de Boyacá</option>
                <option value="10">Fondo de penciones de Nariño</option>
              </select>
              <div className="invalid-feedback">{errores.id_pens}</div>
            </div>

            <div>
              <label className="form-label">Fondo de cesantias </label>
              <select
                type="Number"
                name="id_ces"
                className={`form-control ${errores.id_ces
                    ? "is-invalid"
                    : valores.id_ces
                      ? "is-valid"
                      : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_ces", e.target.value);
                }}
                value={valores.id_ces}
              >
                <option value="">seleccione una opción </option>
                <option value="1">Porvenir S.A.</option>
                <option value="2">Proteccion S.A.</option>
                <option value="3">Colfondos S.A. </option>
                <option value="4">Fondo nacional del ahorro</option>
                <option value="5">Old mundial S.A.</option>
                <option value="6">Skandia Vida S.A.</option>
                <option value="7">Allianz Seguros S.A.</option>
                <option value="8">Seguros Bolívar S.A.</option>
                <option value="9">Liberty Seguros S.A.</option>
                <option value="10">Seguros SURA S.A.</option>
              </select>
              <div className="invalid-feedback">{errores.id_ces}</div>
            </div>
            <div>
              <label className="form-label">Arl</label>
              <select
                type="Number"
                name="id_arl"
                className={`form-control ${errores.id_arl
                    ? "is-invalid"
                    : valores.id_arl
                      ? "is-valid"
                      : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_arl", e.target.value);
                }}
                value={valores.id_arl}
              >
                <option value="">seleccione una opción </option>
                <option value="1">Sura</option>
                <option value="2">Colpatria</option>
                <option value="3">Positiva</option>
                <option value="4">Bolívar</option>
                <option value="5">Seguros sura</option>
                <option value="6">QBE</option>
                <option value="7">Liberty</option>
                <option value="8">Mapfre</option>
              </select>
              <div className="invalid-feedback">{errores.id_arl}</div>
            </div>

            <div className="espbots">
            <div className="float-end">
            <button className="btnfs btn btn-primary"  onClick={() => { validarcamposc(); }}>
                siguiente
              </button>
            </div>
            <div className="float-start ">
            <button className="btnfa btn btn-primary" onClick={() => { anteriorPaso(); }}>
                volver
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CEmple;
