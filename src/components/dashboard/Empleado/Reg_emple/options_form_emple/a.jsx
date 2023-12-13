import React, { useState, useEffect } from "react";
import swal from 'sweetalert';

function AEmple(props) {
  const { handleInputChange, valores, siguientePaso, resetearPasos, resetEmpleadoData } = props;
  const [errores, setErrores] = useState({});
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
  useEffect(() => {
    fetchDataTpdoc();
  }, []);
  // read Roles ------------------------
  const fetchDataTpdoc = () => {
    fetch("http://localhost/api_proyecto.github.io/api.php?apicall=readtpdocu")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error en la respuesta de la API:", data.message);
          // Puedes manejar el error de alguna manera si es necesario
        } else if (Array.isArray(data.contenido)) {
          setTipoDocumentoOptions(data.contenido);
        } else {
          console.error("El contenido de la respuesta no es un array:", data.contenido);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Puedes manejar el error de alguna manera si es necesario
      });
  };
  // read Roles ------------------------

  const cancelar = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Si cancelas, perderás los cambios no guardados.",
      icon: "warning",
      buttons: ["Cancelar", "Si, salir"],
      dangerMode: true,
    })
      .then((willCancel) => {
        if (willCancel) {
          resetearPasos();
          resetEmpleadoData();
        } else {
          swal("¡Un error le pasa a cualquiera!", "", "success");
        }
      });
  };

  const VerContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };


  const validarcamposa = () => {
    let campos = ["n_em", "a_em", "eml_em", "passw"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      fetchDataValidacion();
    } else {
      swal("¡Completa los campos!", "Por favor, verifica los campos para continuar con el proceso.", "error");
    }

    return documentosValidos;
  };

  const fetchDataValidacion = () => {

      fetch(`http://localhost/api_sisinov/public/api/readveriemlempleado/${valores.eml_em}`) 
      .then((response) => response.json())
      .then((respuesta) => {
        if (respuesta.data) {
          swal("Correo existente!", "El correo suministrado ya existe en el sistema.", "error");
        } else {
          siguientePaso();
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Error", "Hubo un error al validar en el sistema. Por favor, inténtalo de nuevo.", "error");
      });
  };

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {



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
          nuevosErrores.passw = "Una contraseña segura debe tener al menos 8 caracteres";
        } else if (valorCampo.length > 20) {
          nuevosErrores.passw = "La contraseña puede tener como máximo 20 caracteres";
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
              <label className="form-label">Numero de Documento</label>
              <input
                disabled
                type="text"
                name="documento"
                className={`form-control ${errores.documento
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
              <label className="form-label">Tipo de Documento</label>
              <select
                disabled
                type="Number"
                name="id_doc"
                className={`form-control ${errores.id_doc
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
                {tipoDocumentoOptions.map((doc) => (
                  <option key={doc.ID_Doc} value={doc.ID_Doc}>
                    {doc.Nombre_documento}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errores.id_doc}</div>
            </div>

            <div>
              <label className="form-label">Nombres</label>
              <input
                type="text"
                name="n_em"
                className={`form-control ${errores.n_em ? "is-invalid" : valores.n_em ? "is-valid" : ""
                  }`}
                id="n_em"
                placeholder="Ingrese los nombres completos"
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
                placeholder="Ingrese los apellidos completos"
                className={`form-control ${errores.a_em ? "is-invalid" : valores.a_em ? "is-valid" : ""
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


            <div className="">
              <label className="form-label">Correo electronico</label>
              <input
                type="email"
                name="eml_em"
                placeholder="Ej. ejemplo@email.com"
                className={`form-control ${errores.eml_em
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

            <div >
              <label className=" form-label">
                Contraseña
              </label>
              <input
                type={mostrarContraseña ? "text" : "password"}
                name="passw"
                id="passw"
                placeholder="Ingrese una contraseña segura"
                className={`form-control  type="text" ${errores.passw ? "is-invalid" : valores.passw ? "is-valid" : ""
                  }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("passw", e.target.value);
                }}
                value={valores.passw}
              />

              <div className="invalid-feedback">{errores.passw}</div>
            </div>

            <div className="mt-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="mostrarContraseñaCheckbox"
                onChange={VerContraseña}
              />
              <label
                className="form-check-label"

              >
                Mostrar Contraseña
              </label>
            </div>

            <div className="espbots">
              <div className="float-end">
                <button
                  className="btnfs btn btn-primary"
                  onClick={() => { validarcamposa(); }}
                >
                  Siguiente
                </button>
              </div>

              <div className="float-start ">
                <button
                  className="btnfa btn btn-primary"
                  onClick={() => { cancelar(); }}
                >
                  cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AEmple;
