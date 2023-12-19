import React, { useState, useEffect } from "react";
import swal from 'sweetalert';
import { useAuth } from "../../../../../autenticate";

function BEmple(props) {
  const { handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});
  const {token} = useAuth();

  // variables para selects
  const [tprol, setTprol] = useState([]);
  const [tipoRhOptions, setTipoRhOptions] = useState([]);

  // variables para selects

  useEffect(() => {
    fetchDataTproles();
    fetchDataTprh();
  }, []);

  // ROL ------------------------------------------------------------------------------
  const fetchDataTproles = () => {
    fetch("https://api.siemnov.com/api/rol", {
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
        } else if (Array.isArray(data.data)) {
          setTprol(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);

      });
  };
  // ROL ------------------------------------------------------------------------------

  // RH  ------------------------------------------------------------------------------
  const fetchDataTprh = () => {
    fetch("https://api.siemnov.com/api/rh", {
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
          setTipoRhOptions(data.data);
        } else {
          console.error("El contenido de la respuesta no es un array");
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // RH  ------------------------------------------------------------------------------

   
  //validacion telefono -----------------------------------------------------------------------------------------------
  const fetchDataValidaciontelagg = () => {
    fetch(`https://api.siemnov.com/api/readveritelaggempleado/${valores.tel_em}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken":token }),
    })
      .then((response) => response.json())
      .then((respuesta) => {
        if (respuesta.encontrado) {
          swal("¡Telefono existente!", "El Teléfono ya existe en el sistema.", "error");
        } else {
         siguientePaso();
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Error", "Hubo un error al validar en el sistema. Por favor, inténtalo de nuevo.", "error");
      });
  };


  const validarcamposb = () => {
    let campos = ["id_rol", "barloc_em", "dir_em", "tel_em", "eml_em", "id_rh"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      fetchDataValidaciontelagg();
    } else {
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
    }
    return documentosValidos;
  };

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {

      case "id_rol":
        const valorNumerorol = parseInt(valorCampo, 10);
        const idsDerol = tprol.map(rol => rol.ID_rol);
      
        if (!idsDerol.includes(valorNumerorol)) {
          nuevosErrores.id_rol = "Por favor, seleccione un rol válido";
        } else {
          delete nuevosErrores.id_rol;
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
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(valorCampo)) {
          nuevosErrores.tel_em =
            "Por favor, ingrese un número de teléfono válido";
        } else {
          delete nuevosErrores.tel_em;
        }
        break;


        case "id_rh":
          const valorNumeroRh = parseInt(valorCampo, 10);
          const idsDeRh = tipoRhOptions.map(rh => rh.ID_RH);
        
          if (!idsDeRh.includes(valorNumeroRh)) {
            nuevosErrores.id_rh = "Por favor, seleccione un tipo de documento válido";
          } else {
            delete nuevosErrores.id_rh;
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
            <div >
              <label className="form-label">
                Rol en el sistema:
              </label>
              <select
                type="number"
                name="id_rol"
                className={`form-control ${errores.id_rol
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
                <option value="" disabled selected>Seleccione un tipo rol</option>
                {tprol.map((rol) => (
                  <option key={rol.ID_rol} value={rol.ID_rol}>
                    {rol.N_rol}
                  </option>
                ))}
              </select>

              <div className="invalid-feedback">{errores.id_rol}</div>
            </div>

            <div>
              <label className="form-label">Localidad y Barrio:</label>
              <input
                type="text"
                name="barloc_em"
                placeholder="Ej. Localidad, Barrio "
                className={`form-control ${errores.barloc_em
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
                placeholder="Ingrese una direccion valida"
                className={`form-control ${errores.dir_em
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
              <label className="form-label">Teléfono</label>
              <input
                type="Number"
                name="tel_em"
                placeholder="Ej. Celular: 1234567890, Fijo: 0118234563"
                className={`form-control ${errores.tel_em ? "is-invalid" : valores.tel_em ? "is-valid" : ""}`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("tel_em", e.target.value);
                }}
                value={valores.tel_em}
              />
              <div className="invalid-feedback">{errores.tel_em}</div>
            </div>

            <div className="">
              <label className="form-label">Grupo sanguineo</label>
              <select
                type="Number"
                name="id_rh"
                className={`form-control ${errores.id_rh ? "is-invalid" : valores.id_rh ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("id_rh", e.target.value);
                }}
                value={valores.id_rh}
              >
                <option value="" disabled selected>Seleccione un tipo de rh</option>
                {tipoRhOptions.map((rh) => (
                  <option key={rh.ID_RH} value={rh.ID_RH}>
                    {rh.T_RH}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_rh}</div>

              <div className="espbots">
                <div className="float-end">
                  <button className="btnfs btn btn-primary" onClick={() => { validarcamposb();   }}>
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
      </div>
    </section>
  );
}

export default BEmple;
