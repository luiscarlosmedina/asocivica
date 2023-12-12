import React, { useState } from "react";
import swal from 'sweetalert';


export default function Validador(props) {
    const { handleInputChange, valores, siguientePaso } = props;
    const [errores, setErrores] = useState({});

    const tipoDocumentoOptions = {
        "": 'seleccione Tipo de documento',
        1: 'Tarjeta de Identidad',
        2: 'Cédula de Ciudadanía',
        3: 'Tarjeta de Extranjería',
        4: 'Cédula de Extranjería',
        5: 'Pasaporte',
        6: 'Nit',
    };

    const validarcampos = () => {
        let campos = ["documento", "id_doc"];
        let documentosValidos = true;
        campos.forEach((campo) => {
            if (documentosValidos) {
                documentosValidos = validarCampo(campo, valores[campo]);
            }
        });

        if (documentosValidos) {
            //siguientePaso();
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
                swal("Error", "Hubo un error al validar en el sistema. Por favor, inténtalo de nuevo.", "error");
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

                if (
                    !["1", "2", "3", "4", "5", "6"].includes(valorCampo)
                ) {
                    nuevosErrores.id_doc =
                        "Por favor, seleccione un tipo de documento válido";
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
                            <label className="form-label">Numero de Documento</label>
                            <input
                                type="Number"
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
                                {Object.entries(tipoDocumentoOptions).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
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
                                    onClick={() => { validarcampos(); /*siguientePaso();*/ }}
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
