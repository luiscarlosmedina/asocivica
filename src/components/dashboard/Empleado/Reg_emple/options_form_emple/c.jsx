import React, { useState, useEffect } from "react";
import swal from 'sweetalert';
import { useAuth } from "../../../../../autenticate";

function CEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});
  const {token} = useAuth();

  //TIPO EPS  ---------------------------------------------------------------------------------------
  const [epsOptions, setepsOptions] = useState([]);
  useEffect(() => {
    fetchDataTpeps();
  }, []);
  // read eps ------------------------
  const fetchDataTpeps = () => {
    fetch("https://api.siemnov.com/api/eps", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken":token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error en la respuesta de la API:", data.message);
          // Puedes manejar el error de alguna manera si es necesario
        } else if (Array.isArray(data.data)) {
          setepsOptions(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // read eps ------------------------
  //TIPO EPS  ---------------------------------------------------------------------------------------


  //TIPO CESANTIAS ---------------------------------------------------------------------------------------
  const [cesOptions, setcesOptions] = useState([]);
  useEffect(() => {
    fetchDataTpces();
  }, [])
  // read ces ------------------------
  const fetchDataTpces = () => {
    fetch("https://api.siemnov.com/api/cesantias", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken":token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error en la respuesta de la API:", data.message);
          // Puedes manejar el error de alguna manera si es necesario
        } else if (Array.isArray(data.data)) {
          setcesOptions(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // read ces ------------------------
  //TIPO CESANTIAS  ---------------------------------------------------------------------------------------

  //TIPO PENSIONES ---------------------------------------------------------------------------------------
  const [penOptions, setPenOptions] = useState([]);
  useEffect(() => {
    fetchDataTpen();
  }, [])
  // read pens ------------------------
  const fetchDataTpen = () => {
    fetch("https://api.siemnov.com/api/pensiones", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken":token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error en la respuesta de la API:", data.message);
          // Puedes manejar el error de alguna manera si es necesario
        } else if (Array.isArray(data.data)) {
          setPenOptions(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // read pens ------------------------
  //TIPO PENSIONES  ---------------------------------------------------------------------------------------



  //TIPO ARL  ---------------------------------------------------------------------------------------
  const [arlOptions, setArlOptions] = useState([]);
  useEffect(() => {
    fetchDataTparl();
  }, [])
  // read arls ------------------------
  const fetchDataTparl = () => {
    fetch("https://api.siemnov.com/api/arl", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken":token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error en la respuesta de la API:", data.message);
          // Puedes manejar el error de alguna manera si es necesario
        } else if (Array.isArray(data.data)) {
          setArlOptions(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // read arls ------------------------
  //TIPO ARL  ---------------------------------------------------------------------------------------




  const validarcamposc = () => {
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
            "Por favor, seleccione un tipo de libreta militar válido";
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
          nuevosErrores.lic_emp =
            "Por favor, seleccione una opción válida";
        } else {
          delete nuevosErrores.lic_emp;
        }
        break;


      case "id_eps":
        const valorNumeroEPS = parseInt(valorCampo, 10);
        const idsDeEPS = epsOptions.map(eps => eps.ID_eps);

        if (!idsDeEPS.includes(valorNumeroEPS)) {
          nuevosErrores.id_eps = "Por favor, seleccione un tipo de EPS válido";
        } else {
          delete nuevosErrores.id_eps;
        }
        break;


      case "id_pens":
        const valorNumeroPens = parseInt(valorCampo, 10);
        const idsDePensiones = penOptions.map(pension => pension.ID_pens);

        if (!idsDePensiones.includes(valorNumeroPens)) {
          nuevosErrores.id_pens = "Por favor, seleccione un fondo de pensión válido";
        } else {
          delete nuevosErrores.id_pens;
        }
        break;


      case "id_ces":
        const valorNumeroCes = parseInt(valorCampo, 10);
        const idsDeCesantias = cesOptions.map(ces => ces.ID_ces);

        if (!idsDeCesantias.includes(valorNumeroCes)) {
          nuevosErrores.id_ces = "Por favor, seleccione un fondo de cesantías válido";
        } else {
          delete nuevosErrores.id_ces;
        }
        break;


      case "id_arl":
        const valorNumeroArl = parseInt(valorCampo, 10);
        const idsDeArl = arlOptions.map(arl => arl.ID_arl);

        if (!idsDeArl.includes(valorNumeroArl)) {
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
                <option value="">Seleccione una opción </option>
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
                <option value="">Seleccione una opción </option>
                <option value="A1">A1 Motocicletas con cilindrada hasta de 125 c.c</option>
                <option value="A2">A2 Motocicletas con cilindrada mayor a 125 c.c.</option>
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
                <option value="" disabled selected>Seleccione un tipo de eps</option>
                {epsOptions.map((eps) => (
                  <option key={eps.ID_eps} value={eps.ID_eps}>
                    {eps.N_eps}
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
                <option value="" disabled selected>Seleccione un tipo de fondo</option>
                {penOptions.map((pen) => (
                  <option key={pen.ID_pens} value={pen.ID_pens}>
                    {pen.N_pens}
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
                <option value="" disabled selected>Seleccione un tipo de fondo</option>
                {cesOptions.map((ces) => (
                  <option key={ces.ID_ces} value={ces.ID_ces}>
                    {ces.N_ces}
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
                <option value="" disabled selected>Seleccione un tipo de Adminitradora</option>
                {arlOptions.map((arl) => (
                  <option key={arl.ID_arl} value={arl.ID_arl}>
                    {arl.N_arl}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_arl}</div>
            </div>

            <div className="espbots">
              <div className="float-end">
                <button className="btnfs btn btn-primary" onClick={() => { validarcamposc(); }}>
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
