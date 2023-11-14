import React, { useState, useEffect } from "react";

export default function Validador(props) {
    const { handleInputChange, valores, siguientePaso } = props;
    const [errores, setErrores] = useState({});
    const [tpdocumento, setTpdocumento] = useState([]);

    useEffect(() => {
        fetchDataTpdocumento();
      }, []);
    
      const fetchDataTpdocumento = () => {
        fetch("http://localhost/api_proyecto.github.io/api.php?apicall=readtpdocumento")
          .then((response) => response.json())
          .then((tpdocumento) => {
            setTpdocumento(tpdocumento.contenido);
            console.log(tpdocumento.contenido)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      //HACER EL SEGUIMEINTO CON EL CONSOLE LOG PERRO, ANIMO QUE SI SE PUEDE
      
      // Nueva función para manejar el cambio en el select
      const handleSelectChange = (e) => {
        const { name, value } = e.target;
      
        // Encuentra la opción seleccionada en el array tpdocumento
        const selectedOption = tpdocumento.find((item) => item.N_TDoc === value);
      
        
      
       
      // Si se encuentra una opción coincidente, envía su ID a handleInputChange
        
       
      if (selectedOption) {
          handleInputChange({
            target: {
              name: name,
              value: selectedOption.ID_doc, // Envía el valor numérico (ID_doc)
            },
          });
        }
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
                        "El campo debe tener entre 2 y 14 caracteres";
                } else {
                    delete nuevosErrores.documento;
                }
                break;
            case "id_doc":
                console.log("ñero")
                console.log(valores)
                if (
                    !["NIT", "Cédula de Ciudadanía", "Cédula de Extranjería", "Pasaporte", "Tarjeta de Extranjería", "Tarjeta de Identidad"].includes(valorCampo)
                ) {
                    nuevosErrores.id_doc =
                        "Por favor, seleccione un tipo de documento válido";
                } else {
                    delete nuevosErrores.id_doc;

                    props.handleInputChange({
                        target: {
                            name: "id_doc",
                            value: valorCampo,
                        },
                    });
                    console.log("Valor actualizado en empleadoData:", valorCampo);
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
                                    handleSelectChange(e);
                                    validarCampo("id_doc", e.target.value);
                                }}
                                value={valores.id_doc}
                            >
                                <option selected disabled value="">
                                    Seleccione...
                                </option>
                                {tpdocumento.map((item) => (
                                    <option key={item.ID_doc} value={item.ID_doc}>
                                        {item.N_TDoc}
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
                            <cite title="Título fuente">"Antes de agregar un nuevo empleado al sistema, ten en cuenta validar cuidadosamente la información del usuariopara garantizar la precisión y autenticidad de los datos contribuye a mantener la integridad y seguridad de nuestro entorno laboral digital."</cite>
                        </figcaption>

                        <div className="espbots">
                            <div className="float-end">
                                <button
                                    className=" btn btn-primary"
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
