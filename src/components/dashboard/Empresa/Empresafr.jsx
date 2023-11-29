import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

function Empresafr({ nit, est, resetForm }) {
    const fecha = new Date()
    const hoy = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
    const [doc, setDoc] = useState([])

    //llamar los tipos de documentos
    const fetchDataDoc = () => {
        fetch(
            `http://20.106.206.47/api_sisinov/public/api/tdoc`
        )
            .then((response) => response.json())
            .then((doc) => {
                setDoc(doc.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDataDoc();
    }, []);
    //definir la estructura del json que se envia a la api
    const [empresa, setEmpresa] = useState({
        Nit_E: "",
        Nom_E: "",
        Eml_E: "",
        Nom_Rl: "",
        ID_Doc: "",
        CC_Rl: "",
        telefonoGeneral: "",
        Val_E: "",
        Est_E: "",
        Fh_Afi: hoy,
        fechaFinalizacion: hoy,
        COD_SE: "",
        COD_AE: "",
        sedes: [
            {
                Dic_S: "",
                Sec_V: "",
                encargados: [
                    {
                        N_En: "",
                        tel1: "",
                        tel2: "",
                        tel3: "",
                        Est_en: "0"
                    }
                ]
            }
        ]
    });

    const [errors, setErrors] = useState({});

    //validar sede
    const validateSedeField = (sedeIndex, fieldName, value) => {
        const regexPatterns = {
            Dic_S: /^[A-Za-z0-9\s#áéíóúÁÉÍÓÚñÑ,.-]{5,}$/, //direcciones colombianas
            Sec_V: /^\d+$/, // Puedes ajustar el patrón según sea necesario
        };


        const errorsCopy = { ...errors };

        if (fieldName in regexPatterns) {
            const regex = regexPatterns[fieldName];
            if (!regex.test(value)) {
                errorsCopy[`sede_${sedeIndex}_${fieldName}`] = `El campo no es válido`;
            } else {
                delete errorsCopy[`sede_${sedeIndex}_${fieldName}`];
            }
        }

        setErrors(errorsCopy);
    };

    //valida encargados
    const validateEncargadoField = (sedeIndex, encargadoIndex, fieldName, value) => {
        const regexPatterns = {
            N_En: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            tel1: /^\d{10}$/,
            tel2: /^\d{10}$/,
            tel3: /^\d{10}$/,
        };

        const errorsCopy = { ...errors };

        if (fieldName in regexPatterns) {
            const regex = regexPatterns[fieldName];
            if (!regex.test(value)) {
                errorsCopy[`encargado_${sedeIndex}_${encargadoIndex}_${fieldName}`] = `El campo no es válido`;
            } else {
                delete errorsCopy[`encargado_${sedeIndex}_${encargadoIndex}_${fieldName}`];
            }
        }

        setErrors(errorsCopy);
    };
    //pendiente de cambios en empresa
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresa({ ...empresa, [name]: value });
    };
    //pendiente de cambios en sede
    const handleSedeChange = (sedeIndex, field, value) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[sedeIndex][field] = value;
        setEmpresa({ ...empresa, sedes: updatedSedes });

        validateSedeField(sedeIndex, field, value);
    };

    //pendiente de cambios encargados
    const handleEncargadoChange = (sedeIndex, encargadoIndex, field, value) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[sedeIndex].encargados[encargadoIndex][field] = value;
        setEmpresa({ ...empresa, sedes: updatedSedes });

        validateEncargadoField(sedeIndex, encargadoIndex, field, value);
    };

    //valida campos de empresa
    const validateField = (fieldName, value) => {
        const regexPatterns = {
            Nit_E: /^\d{9}-\d{1}$/, // Validacion para el campo Nit_E con - despues del 8 numero
            Nom_E: /^.{1,100}$/, // Validacion para el campo Nom_E (máximo 100 caracteres)
            Eml_E: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, // Validacion para el campo Eml_E (correo electrónico)
            Nom_Rl: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, //solo texto
            CC_Rl: /^(?:[A-Za-z0-9]+|[0-9]{6,10})$/, //formato para numero cc colombiana o pasaporte
            telefonoGeneral: /^\d{10}$/, // 7 a 10 numeros 
            Val_E: /^(?:[1-9]\d{0,6}|10000000)$/, //maximo de 10 000 000
            COD_SE: /^\d{1,4}$/, //maximo 4 digitos 
            COD_AE: /^\d{1,4}$/, //maximo 4 digitos 
        };

        const errorsCopy = { ...errors };

        if (fieldName in regexPatterns) {
            const regex = regexPatterns[fieldName];
            if (!regex.test(value)) {
                errorsCopy[fieldName] = `El campo no es válido`;
            } else {
                delete errorsCopy[fieldName];
            }
        }

        setErrors(errorsCopy);
    };

    //esta atento a cambio entre inputs
    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    //eliminar un bloque de sede
    const handleRemoveSede = (sedeIndex) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes.splice(sedeIndex, 1); // Elimina la sede en la posición sedeIndex
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };

    //eliminar un bloque de encargados
    const handleRemoveEncargado = (sedeIndex, encargadoIndex) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[sedeIndex].encargados.splice(encargadoIndex, 1); // Elimina el encargado en la posición encargadoIndex
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };


    //validacion, envio de datos y respuesta del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //validaciones
        if (empresa.sedes.length === 0) {
            swal("Error", "Debes ingresar al menos una sede", "error");
            return;
        }

        // Verificar que todos los campos de las sedes estén completos
        for (const sede of empresa.sedes) {
            if (!sede.Dic_S || !sede.Sec_V) {
                swal("Error", "Todos los campos de las sedes deben estar completos", "error");
                return;
            }

            for (const encargado of sede.encargados) {
                if (!encargado.N_En || !encargado.tel1) {
                    swal("Error", "Todos los campos de los encargados deben estar completos", "error");
                    return;
                }
            }
        }

        // Si existen errores no haga el post
        if (Object.keys(errors).length > 0) {
            swal("Error", "Por favor, corrige los errores antes de enviar el formulario", "error");
            return;
        }
        // Crear un objeto para enviar los datos
        const data = {
            Nit_E: nit,
            Nom_E: empresa.Nom_E,
            Eml_E: empresa.Eml_E,
            Nom_Rl: empresa.Nom_Rl,
            ID_Doc: empresa.ID_Doc,
            CC_Rl: empresa.CC_Rl,
            telefonoGeneral: empresa.telefonoGeneral,
            Val_E: empresa.Val_E,
            Est_E: est,
            Fh_Afi: hoy,
            fechaFinalizacion: hoy,
            COD_SE: empresa.COD_SE,
            COD_AE: empresa.COD_AE,
            sedes: empresa.sedes,
        };

        // Realizar la solicitud POST
        fetch("http://20.106.206.47/api_sisinov/public/api/empresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.error === false) {
                    swal("Buen trabajo!", `Creacion exitosa ${responseData.message}`, "success");
                    resetForm();
                } else {
                    swal("Error!", `No se pudo crear la empresa ${responseData.message}`, "error");
                }

                console.log("Respuesta de la API:", responseData);
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
                swal("Algo salio mal!", `error ${error}`, "error");
            });

        // Limpia el formulario después de enviar
        setEmpresa({
            Nit_E: "",
            Nom_E: "",
            Eml_E: "",
            Nom_Rl: "",
            ID_Doc: "",
            CC_Rl: "",
            telefonoGeneral: "",
            Val_E: "",
            Est_E: "",
            Fh_Afi: "",
            fechaFinalizacion: "",
            COD_SE: "",
            COD_AE: "",
            sedes: [
                {
                    Dic_S: "",
                    Sec_V: "",
                    encargados: [
                        {
                            N_En: "",
                            tel1: "",
                            tel2: "",
                            tel3: "",
                            Est_en: ""
                        }
                    ]
                }
            ]
        });


    };

    //agrega array de sede a empresa
    // const handleAddSede = () => {
    //     const updatedSedes = [...empresa.sedes, { Dic_S: "", Sec_V: "", encargados: [{ N_En: "", tel1: "", tel2: "", tel3: "", Est_en: "0" }] }];
    //     setEmpresa({ ...empresa, sedes: updatedSedes });
    // };

    // //agrega encargados a sede
    // const handleAddEncargado = (sedeIndex) => {
    //     const updatedSedes = [...empresa.sedes];
    //     updatedSedes[sedeIndex].encargados.push({ N_En: "", tel1: "", tel2: "", tel3: "", Est_en: "0" });
    //     setEmpresa({ ...empresa, sedes: updatedSedes });
    // };
    const getError = (fieldName) => {
        return errors[fieldName] || "";
    };

    return (
        <div>
            <div className="col-0">
                <p className="t h2 mb-4 mt-3">Registrar empresa</p>
            </div>
            <div className={`mb-1 mt-1 borsupd border-3 `}></div>
            <form onSubmit={handleSubmit} className='my-3'>
                {/* Campos para la Empresa */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="nit" className="form-label">
                                Nit
                            </label>
                            <input
                                type="text"
                                id="nit"
                                placeholder='123456789-0'
                                className={`form-control ${getError("Nit_E") && "is-invalid"}`}
                                name="Nit_E"
                                value={nit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                            />
                            <div className="invalid-feedback">{getError("Nit_E")} debe contener - mas el caracter verificador</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="Est_E" className="form-label">
                                Estado
                            </label>
                            <select
                                name="Est_E"
                                className="form-select"
                                value={est}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled
                            >
                                <option value="0" selected>Activo</option>
                                <option value="1">En estudio</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="nombre">Nombre empresa</label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder='Mi empresa S.A.S'
                            className={`form-control ${getError("Nom_E") && "is-invalid"}`}
                            name="Nom_E"
                            value={empresa.Nom_E}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">{getError("Nom_E")}</div>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="correo">Correo</label>
                        <input
                            type="email"
                            id="correo"
                            placeholder='miempresa@dominio.com'
                            className={`form-control ${getError("Eml_E") && "is-invalid"}`}
                            name="Eml_E"
                            value={empresa.Eml_E}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">{getError("Eml_E")} debe contener @ segido un domino ejemplo.com</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="rep">Nombre representante legal</label>
                        <input
                            type="text"
                            id="rep"
                            placeholder='Gabriel Garcia Marquez'
                            className={`form-control ${getError("Nom_Rl") && "is-invalid"}`}
                            name="Nom_Rl"
                            value={empresa.Nom_Rl}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <div className="invalid-feedback">{getError("Nom_Rl")} ingresa solo texto</div>
                    </div>
                    <div className='col-md-6'>
                        <label
                            htmlFor="ID_DOC"
                            className="col-form-label"
                        >
                            Documento representante
                        </label>
                        <div className="input-group mb-2">
                            <select name="ID_Doc" value={empresa.ID_Doc} onChange={handleChange}>
                                <option selected disabled value="">
                                    Tipo de documento
                                </option>
                                {doc.map((item) => (
                                    <option key={item.ID_Doc} value={item.ID_Doc}>
                                        {item.N_TDoc}
                                    </option>
                                ))}
                            </select>
                            <input type="text" placeholder="Numero documento" name="CC_Rl" value={empresa.CC_Rl} onChange={handleChange}
                                onBlur={handleBlur} className={`form-control ${getError("CC_Rl") && "is-invalid"}`} aria-label="Text input with segmented dropdown button" />
                            <div className="invalid-feedback">Ingresa numero de documento valido</div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="telefono">Telefono empresa</label>
                        <input
                            type="text"
                            id="telefono"
                            placeholder='1234567'
                            className={`form-control ${getError("telefonoGeneral") && "is-invalid"}`}
                            name="telefonoGeneral"
                            value={empresa.telefonoGeneral}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <div className="invalid-feedback">telefono invalido minimo 7 numeros</div>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="valor">Valor / Cuota</label>
                        <input
                            type="text"
                            id="valor"
                            placeholder='100000'
                            className={`form-control ${getError("Val_E") && "is-invalid"}`}
                            name="Val_E"
                            value={empresa.Val_E}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <div className="invalid-feedback">Solo numero sin separacion de miles ni decimales</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="sector">Sector economico</label>
                        <input
                            type="text"
                            id="sector"
                            placeholder='1234'
                            className={`form-control ${getError("COD_SE") && "is-invalid"}`}
                            name="COD_SE"
                            value={empresa.COD_SE}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <div className="invalid-feedback">Maximo 4 numeros</div>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="actividad">Actividad economica</label>
                        <input
                            type="text"
                            id="actividad"
                            placeholder='1234'
                            className={`form-control ${getError("COD_AE") && "is-invalid"}`}
                            name="COD_AE"
                            value={empresa.COD_AE}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                        <div className="invalid-feedback">maximo 4 numeros</div>
                    </div>
                </div>
                {/* Campos para Sedes */}
                <hr />
                <div className="m-4 pt-4">
                    <h4>Sedes</h4>
                    {empresa.sedes.map((sede, index) => (
                        <div key={index} className="border p-3 mb-3">
                            {index !== 0 ? <button
                                type="button"
                                className="btn "
                                onClick={() => handleRemoveSede(index)} // Esta función debe eliminarse
                            >
                                <i className="bi bi-x text-danger"></i>
                            </button> : ""}
                            <div className="row">
                                <div className="col-md-8">
                                    <label htmlFor={`Dic_S_${index}`}>Dirección Sede</label>
                                    <input
                                        type="text"
                                        id={`Dic_S_${index}`}
                                        placeholder='Cl. 17 #22-26, Los Mártires, Bogotá'
                                        className={`form-control ${getError(`sede_${index}_Dic_S`) && "is-invalid"}`}
                                        name={`Dic_S_${index}`}
                                        value={sede.Dic_S}
                                        onChange={(e) => handleSedeChange(index, "Dic_S", e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <div className="invalid-feedback">Ingrese una direccion valida</div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor={`Sec_V_${index}`}>Sector de vigilancia</label>
                                    <select
                                        id={`Sec_V_${index}`}
                                        name={`Sec_V_${index}`}
                                        className="form-select"
                                        value={sede.Sec_V}
                                        onChange={(e) => handleSedeChange(index, "Sec_V", e.target.value)}
                                        onBlur={handleBlur}
                                    >
                                        <option value="" selected>Seleccione un sector</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                            <h4>Encargados</h4>
                            {sede.encargados.map((encargado, encargadoIndex) => (
                                <div key={encargadoIndex} className="border p-3 mb-3 row">
                                    <div className="col-md-3">
                                        <label htmlFor={`N_En_${index}_${encargadoIndex}`}>Nombre Encargado</label>
                                        <input
                                            type="text"
                                            id={`N_En_${index}_${encargadoIndex}`}
                                            placeholder='Camilo Torres'
                                            className={`form-control ${getError(`encargado_${index}_${encargadoIndex}_N_En`) && "is-invalid"}`}
                                            name={`N_En_${index}_${encargadoIndex}`}
                                            value={encargado.N_En}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "N_En", e.target.value)}
                                            onBlur={handleBlur}
                                        />
                                        <div className="invalid-feedback">Ingrese un nombre valido</div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor={`tel1_${index}_${encargadoIndex}`}>Teléfono 1</label>
                                        <input
                                            type="text"
                                            id={`tel1_${index}_${encargadoIndex}`}
                                            placeholder='1234567'
                                            className={`form-control ${getError(`encargado_${index}_${encargadoIndex}_tel1`) && "is-invalid"}`}
                                            name={`tel1_${index}_${encargadoIndex}`}
                                            value={encargado.tel1}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel1", e.target.value)}
                                            onBlur={handleBlur}
                                        />
                                        <div className="invalid-feedback">Ingrese un numero valido</div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor={`tel2_${index}_${encargadoIndex}`}>Teléfono 2</label>
                                        <input
                                            type="text"
                                            id={`tel2_${index}_${encargadoIndex}`}
                                            placeholder='3109998877'
                                            className={`form-control ${getError(`encargado_${index}_${encargadoIndex}_tel2`) && "is-invalid"}`}
                                            name={`tel2_${index}_${encargadoIndex}`}
                                            value={encargado.tel2}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel2", e.target.value)}
                                            onBlur={handleBlur}
                                        />
                                        <div className="invalid-feedback">Ingrese un numero valido</div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor={`tel3_${index}_${encargadoIndex}`}>Teléfono 3</label>
                                        <input
                                            type="text"
                                            id={`tel3_${index}_${encargadoIndex}`}
                                            placeholder='3109998877'
                                            className={`form-control ${getError(`encargado_${index}_${encargadoIndex}_tel3`) && "is-invalid"}`}
                                            name={`tel3_${index}_${encargadoIndex}`}
                                            value={encargado.tel3}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel3", e.target.value)}
                                            onBlur={handleBlur}
                                        />
                                        <div className="invalid-feedback">Ingrese un numero valido</div>
                                    </div>
                                    <div className="col-md-1">
                                        {encargadoIndex !== 0 ? <button
                                            type="button"
                                            className="btn "
                                            onClick={() => handleRemoveEncargado(index)} // Esta función debe eliminarse
                                        >
                                            <i className="bi bi-x text-danger"></i>
                                        </button> : ""}
                                    </div>
                                </div>
                            ))}
                            {/* <button type="button" className="btn btn-link text-warning" onClick={() => handleAddEncargado(index)}>
                                Agregar Encargado
                            </button> */}
                        </div>
                    ))}
                    {/* <button type="button" className="btn btn-link text-warning" onClick={handleAddSede}>
                        Agregar Sede
                    </button> */}
                </div>
                <div className='d-grid gap-2'>
                    <button type="submit" className="btn btn-primary">
                        Registrar Empresa
                    </button>
                    <button type="submit" className="btn btn-secondary" onClick={resetForm}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Empresafr;