import React, { useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


function AEmple(props) {
  const { handleInputChange, valores, siguientePaso, } = props;
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [mostrarContraseña, setMostrarContraseña] = useState(false);


  /*const validar_Exis = () => {
    const elementosDocumento = document.getElementsByName("documento");

    if (elementosDocumento.length > 0) {
      const id_emple = elementosDocumento[0].value;
      console.log(id_emple);
      // Resto de tu lógica aquí
    } else {
      console.error("No se encontró ningún elemento con el nombre 'documento'");
    }
  };*/

  const cancelar = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Si cancelas, perderás los cambios no guardados.",
      icon: "warning",
      buttons: ["Cancelar", "Sí, salir"],
      dangerMode: true,
    })
      .then((willCancel) => {
        if (willCancel) {
          navigate("/inicio");
        }
      });
  };


  const VerContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  const validarcampos = () => {
    let campos = ["documento", "id_doc", "n_em", "a_em", "eml_em", "passw" ];
    let documentosValidos = true;
  
    campos.forEach((campo) => {

      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      siguientePaso();
    }

  
    return documentosValidos;
  };

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {

      case "documento":
        if (!valorCampo.trim()) {
          nuevosErrores.documento =
            "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 14) {
          nuevosErrores.documento =
            "El campo debe tener entre 2 y 14 caracteres"
        } else {
          delete nuevosErrores.documento;
        }
        break;

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
        
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
              valorCampo
            )
          ) {
            nuevosErrores.passw =
              "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial";
          } 
          
        else {
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
                type="text"
                readOnly
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
              <label className="form-label">Nombres</label>
              <input
                type="text"
                name="n_em"
                className={`form-control ${errores.n_em ? "is-invalid" : valores.n_em ? "is-valid" : ""
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


            <div className="mb-3">
              <label className="form-label">Correo electronico</label>
              <input
                type="email"
                name="eml_em"
    
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

            <div className="mb-3">
              <label className="form-label">
                Contraseña
              </label>
              <input
                type={mostrarContraseña ? "text" : "password"}
                name="passw"
                id="passw"
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
                  onClick={() => {validarcampos();}}
                >
                  Siguiente
                </button>
              </div>

              <div className="float-start ">
                <button
                  className="btnf btn btn-primary"
                  onClick={() => {cancelar();}}
                  
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
