import React, { useState } from "react";
import swal from 'sweetalert';

function CEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});

  const epsOptions = {

    "": 'Selecione un tipo de eps',
    1: 'COOSALUD EPS-S',
    2: 'NUEVA EPS',
    3: 'MUTUAL SER',
    4: 'ALIANSALUD EPS',
    5: 'SALUD TOTAL EPS S.A.',
    6: 'EPS SANITAS',
    7: 'EPS SURA',
    8: 'FAMISANAR',
    9: 'SERVICIO OCCIDENTAL DE SALUD EPS SOS',
    10: 'SALUD MIA',
    11: 'COMFENALCO VALLE',
    12: 'COMPENSAR EPS',
    13: 'EPM - EMPRESAS PUBLICAS DE MEDELLIN',
    14: 'FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES...',
    15: 'CAJACOPI ATLANTICO',
    16: 'CAPRESOCA',
    17: 'COMFACHOCO',
    18: 'COMFAORIENTE',
    19: 'EPS FAMILIAR DE COLOMBIA',
    20: 'ASMET SALUD',
    21: 'EMSSANAR E.S.S.',
    22: 'CAPITAL SALUD EPS-S',
    23: 'SAVIA SALUD EPS',
    24: 'DUSAKAWI EPSI',
    25: 'ASOCIACION INDIGENA DEL CAUCA EPSI',
  };

  const penOptions = {
    "": 'Selecione un fondo de pension',
    1: 'COLFONDOS',
    2: 'PORVENIR',
    3: 'PROTECCIÓN',
    4: 'SKANDIA',
    5: 'COLPENSIONES',
  };

  const cesOptions = {
    "": 'Selecione un fondo de cesantias',
    1: 'COLFONDOS',
    2: 'PORVENIR',
    3: 'PROTECCIÓN',
    4: 'SKANDIA',
    5: 'FONDO NACIONAL DEL AHORRO',
  };

  const arlOptions = {
    "": 'Selecione un tipo de arl',
    1: 'ARL POSITIVA',
    2: 'SEGUROS BOLÍVAR S.A',
    3: 'SEGUROS DE VIDA AURORA S.A',
    4: 'LIBERTY SEGUROS DE VIDA',
    5: 'MAPFRE COLOMBIA VIDA SEGUROS S.A.',
    6: 'RIESGOS LABORALES COLMENA',
    7: 'SEGUROS DE VIDA ALFA S.A',
    8: 'SEGUROS DE VIDA COLPATRIA S.A',
    9: 'SEGUROS DE VIDA LA EQUIDAD ORGANISMO C.',
    10: 'SURA - CIA. SURAMERICANA DE SEGUROS DE VIDA',

  };


  const validarcamposc = () => {
    //console.log("prueba si pasa")
    let campos = ["lib_em", "lic_emp", "id_eps", "id_pens", "id_ces", "id_arl"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      siguientePaso();
    } else {
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
        if (
          valorCampo !== "A1" &&
          valorCampo !== "A2" &&
          valorCampo !== "En proceso" &&
          valorCampo !== "No aplica"
        ) {
          nuevosErrores.lib_em =
            "Por favor, seleccione una opcion válida";
        } else {
          delete nuevosErrores.lic_emp;
        }
        break;

      case "id_eps":
        const valorNumero = parseInt(valorCampo, 10);
        if (!(valorNumero in epsOptions)) {
          nuevosErrores.id_eps = "Por favor, seleccione un tipo de EPS válido";
        } else {
          delete nuevosErrores.id_eps;
        }
        break;

        case "id_pens":
          const valorNumeroPens = parseInt(valorCampo, 10);
          if (!(valorNumeroPens in penOptions)) {
            nuevosErrores.id_pens = "Por favor, seleccione un fondo de pensión válido";
          } else {
            delete nuevosErrores.id_pens;
          }
          break;
        

          case "id_ces":
            const valorNumeroCes = parseInt(valorCampo, 10);
            if (!(valorNumeroCes in cesOptions)) {
              nuevosErrores.id_ces = "Por favor, seleccione un fondo de cesantías válido";
            } else {
              delete nuevosErrores.id_ces;
            }
            break;
          

            case "id_arl":
              const valorNumeroArl = parseInt(valorCampo, 10);
              if (!(valorNumeroArl in arlOptions)) {
                nuevosErrores.id_arl = "Por favor, seleccione un tipo de ARL válido";
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
              <select
                type="Text"
                name="lic_emp"
                className={`form-control ${errores.lic_emp ? "is-invalid" : valores.lic_emp ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("lic_emp", e.target.value);
                }}
                value={valores.lic_emp}
              >
                <option value="">seleccione una opción </option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="En proceso">En proceso</option>
                <option value="No aplica">No aplica</option>
              </select>
              <div className="invalid-feedback">{errores.lic_emp}</div>
            </div>
            <div>
              <label className="form-label">Entidad Promotora de Salud (EPS): </label>
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
                {Object.entries(epsOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <div className="invalid-feedback">{errores.id_eps}</div>
            </div>
            <div>
              <label className="form-label">Fondo pensional: </label>
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
                {Object.entries(penOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_pens}</div>
            </div>

            <div>
              <label className="form-label">Fondo de cesantias: </label>
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
                {Object.entries(cesOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_ces}</div>
            </div>
            <div>
              <label className="form-label">Administradoras de Riesgos Laborales (ARL):</label>
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
                {Object.entries(arlOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_arl}</div>
            </div>

            <div className="espbots">
              <div className="float-end">
                <button className="btnfs btn btn-primary" onClick={() => { validarcamposc();  /*siguientePaso();*/ }}>
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
