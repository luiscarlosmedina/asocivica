import React, { useState } from 'react';
import swal from 'sweetalert';

function Empresarapidofr({ nit, est }) {
    const fecha = new Date();
    const hoy = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();

    const [empresa, setEmpresa] = useState({
        Nit_E: "",
        Nom_E: "",
        Eml_E: "",
        Est_E: "",
        Fh_Afi: hoy,
        fechaFinalizacion: hoy,
        COD_SE: "",
        COD_AE: "",
        Dic_S: "",
        Sec_V: "",
        N_En: "",
        tel1: "",
    });

    const [errors, setErrors] = useState({});

    const validateField = (fieldName, value, regex) => {
        const errorsCopy = { ...errors };

        if (!regex.test(value)) {
            errorsCopy[fieldName] = `El campo no es válido`;
        } else {
            delete errorsCopy[fieldName];
        }

        setErrors(errorsCopy);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresa({ ...empresa, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        const regexPatterns = {
            Nom_E: /^.{1,100}$/, // Validación para el campo Nom_E (máximo 100 caracteres)
            COD_SE: /^\d{1,4}$/, // Máximo 4 dígitos
            COD_AE: /^\d{1,4}$/, // Máximo 4 dígitos
            Dic_S: /^[A-Za-z0-9\s#áéíóúÁÉÍÓÚñÑ,.-]{5,}$/, // Direcciones colombianas
            Sec_V: /^\d+$/, // Puedes ajustar el patrón según sea necesario
            N_En: /^[A-Za-z\s]+$/,
            tel1: /^\d{7,10}$/,
        };

        const errorsCopy = {};

        for (const fieldName in regexPatterns) {
            if (fieldName in empresa) {
                const regex = regexPatterns[fieldName];
                if (!regex.test(empresa[fieldName])) {
                    errorsCopy[fieldName] = `El campo no es válido`;
                }
            }
        }

        if (Object.keys(errorsCopy).length > 0) {
            setErrors(errorsCopy);
            swal("Error", "Por favor, corrige los errores antes de enviar el formulario", "error");
            return;
        }

        // Crear un objeto para enviar los datos
        const data = {
            Nit_E: nit,
            Nom_E: empresa.Nom_E,
            Eml_E: empresa.Eml_E,
            Est_E: est,
            Fh_Afi: hoy,
            fechaFinalizacion: hoy,
            COD_SE: empresa.COD_SE,
            COD_AE: empresa.COD_AE,
            Dic_S: empresa.Dic_S,
            Sec_V: empresa.Sec_V,
            N_En: empresa.N_En,
            tel1: empresa.tel1,
        };
        console.log(data);

        // Realizar la solicitud POST
        fetch("http://localhost/api_proyecto.github.io/api.php?apicall=createfastempresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.error === false) {
                    swal("Buen trabajo!", `Creación exitosa: ${responseData.message}`, "success");
                } else {
                    swal("Error!", `Error: ${responseData.message}`, "error");
                }

                console.log("Respuesta de la API:", responseData);
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
                swal("Algo salió mal!", `Error: ${error}`, "error");
            });

        setEmpresa({
            Nit_E: "",
            Nom_E: "",
            Eml_E: "",
            Est_E: est,
            Fh_Afi: hoy,
            fechaFinalizacion: hoy,
            COD_SE: "",
            COD_AE: "",
            Dic_S: "",
            Sec_V: "",
            N_En: "",
            tel1: "",
        });
    };

    const getError = (fieldName) => {
        return errors[fieldName] || "";
    };

    return (
        <div>
            <div className="mb-1 border-bottom border-primary border-3 row justify-content-between">
                <div className="col-0">
                    <p className="text-primary h2">Registrar Empresa</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='my-3'>
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
                                name="Nit_E"
                                value={nit}
                                onChange={handleChange}
                                disabled
                            />
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
                                disabled
                            >
                                <option value="0">Activo</option>
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
                            onBlur={() => validateField("Nom_E", empresa.Nom_E, /^.{1,100}$/)}
                        />
                        <div className="invalid-feedback">{getError("Nom_E")} (máximo 100 caracteres)</div>
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
                            onBlur={() => validateField("Eml_E", empresa.Eml_E, /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*$/)}
                        />
                        <div className="invalid-feedback">{getError("Eml_E")} debe contener un correo válido</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="sector">Sector económico</label>
                        <input
                            type="text"
                            id="sector"
                            placeholder='1234'
                            className={`form-control ${getError("COD_SE") && "is-invalid"}`}
                            name="COD_SE"
                            value={empresa.COD_SE}
                            onChange={handleChange}
                            onBlur={() => validateField("COD_SE", empresa.COD_SE, /^\d{1,4}$/)}
                        />
                        <div className="invalid-feedback">Máximo 4 dígitos</div>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="actividad">Actividad económica</label>
                        <input
                            type="text"
                            id="actividad"
                            placeholder='1234'
                            className={`form-control ${getError("COD_AE") && "is-invalid"}`}
                            name="COD_AE"
                            value={empresa.COD_AE}
                            onChange={handleChange}
                            onBlur={() => validateField("COD_AE", empresa.COD_AE, /^\d{1,4}$/)}
                        />
                        <div className="invalid-feedback">Máximo 4 dígitos</div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor={`Dic_S`}>Dirección Sede</label>
                            <input
                                type="text"
                                id={`Dic_S`}
                                placeholder='Cl. 17 #22-26, Los Mártires, Bogotá'
                                className={`form-control ${getError("Dic_S") && "is-invalid"}`}
                                name={`Dic_S`}
                                value={empresa.Dic_S}
                                onChange={handleChange}
                                onBlur={() => validateField("Dic_S", empresa.Dic_S, /^[A-Za-z0-9\s#áéíóúÁÉÍÓÚñÑ,.-]{5,}$/)}
                            />
                            <div className="invalid-feedback">Ingrese una dirección válida</div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor={`Sec_V`}>Sector de vigilancia</label>
                            <select
                                id={`Sec_V`}
                                name={`Sec_V`}
                                className="form-select"
                                value={empresa.Sec_V}
                                onChange={handleChange}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-8">
                            <label htmlFor={`N_En`}>Nombre Encargado</label>
                            <input
                                type="text"
                                id={`N_En`}
                                placeholder='Camilo Torres'
                                className={`form-control ${getError("N_En") && "is-invalid"}`}
                                name={`N_En`}
                                value={empresa.N_En}
                                onChange={handleChange}
                                onBlur={() => validateField("N_En", empresa.N_En, /^[A-Za-z\s]+$/)}
                            />
                            <div className="invalid-feedback">Ingrese un nombre válido</div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor={`tel1`}>Teléfono</label>
                            <input
                                type="text"
                                id={`tel1`}
                                placeholder='1234567'
                                className={`form-control ${getError("tel1") && "is-invalid"}`}
                                name={`tel1`}
                                value={empresa.tel1}
                                onChange={handleChange}
                                onBlur={() => validateField("tel1", empresa.tel1, /^\d{7,10}$/)}
                            />
                            <div className="invalid-feedback">Ingrese un número válido</div>
                        </div>
                    </div>
                </div>
                <div className='d-grid gap-2'>
                    <button type="submit" className="btn btn-primary">
                        Registrar Empresa
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Empresarapidofr;
