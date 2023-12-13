import React, { useState, useEffect } from "react";
import swal from 'sweetalert';


export default function Validador(props) {
    const { handleInputChange, valores, siguientePaso } = props;
    const [errores, setErrores] = useState({});

    
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


    const validarcampos = () => {
        let campos = ["documento", "id_doc"];
        let documentosValidos = true;
        campos.forEach((campo) => {
            if (documentosValidos) {
                documentosValidos = validarCampo(campo, valores[campo]);
            }
        });

        if (documentosValidos) {
            fetchDataValidacion();

        } else {
            swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
        }
        return documentosValidos;
    };

    const fetchDataValidacion = () => {
        fetch(`http://localhost/api_sisinov/public/api/readverificarempleado/${valores.id_doc}/${valores.documento}`) 
            .then((response) => response.json())
            .then((respuesta) => {
                if (respuesta.encontrado) {
                    swal("¡Empleado existente!", "El empleado ya existe en el sistema.", "error");
                } else {
                    siguientePaso();
                }
            })
            .catch((error) => {
                console.log(error);
                swal("¡Error en el sistema!", "Hubo un error al validar en el sistema. Por favor, inténtalo de nuevo.", "error");
            });
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
                        "El campo debe tener entre 2 y 14 caracteres";
                } else if (!/^\d+$/.test(valorCampo)) {
                    nuevosErrores.documento =
                        "Ingrese solo números para el campo documento";
                } else {
                    delete nuevosErrores.documento;
                }
                break;


            case "id_doc":
                const valorNumeroDoc = parseInt(valorCampo, 10);
                const tiposDeDocValidos = tipoDocumentoOptions.map(doc => doc.ID_Doc);
              
                if (!tiposDeDocValidos.includes(valorNumeroDoc)) {
                  nuevosErrores.id_doc = "Por favor, seleccione un tipo de documento válido";
                } else {
                  delete nuevosErrores.id_doc;
                }
                break;
              


            default:
                break;
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    return (<div>
        <section className="secundary-box">
            <div className="container">
                <div className="box-main">
                    <div className="box-main2">
                        <div>
                            <label className="form-label">Numero de Documento: </label>
                            <input
                                type="Number"
                                name="documento"
                                placeholder="Ej. 1234567890"
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
                            <label className="form-label">Tipo de Documento: </label>
                            <select
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
                                <option value="" disabled selected>Seleccione un tipo de documento</option>
                                {tipoDocumentoOptions.map((doc) => (
                                    <option key={doc.ID_Doc} value={doc.ID_Doc}>
                                        {doc.Nombre_documento}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errores.id_doc}</div>
                        </div>

                        <blockquote class="blockquote ">
                            <p className="title_validacion">¡Recuerda!
                            </p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            <cite title="Título fuente">"Antes de agregar un nuevo empleado al sistema, ten en cuenta validar cuidadosamente la información del usuario para garantizar la precisión y autenticidad de los datos. Contribuye a mantener la integridad y seguridad de nuestro entorno laboral digital."</cite>
                        </figcaption>
                        <div className="espbots">
                            <div className="float-end">
                                <button
                                    className="btnfs btn btn-primary"
                                    onClick={() => { validarcampos(); }}
                                >
                                    Validar en el sistema
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>)

}
