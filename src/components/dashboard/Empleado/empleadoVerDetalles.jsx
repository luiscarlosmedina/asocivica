import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router-dom';
import ContactoEmergencia from './contactoEmergencia';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,

} from "@mui/material";
import { useAuth } from '../../../autenticate';

export default function EmpleadoVerDetalles() {
    const { empleadoid } = useParams();
    const back = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [errores, setErrores] = useState({});
    const [empleadoOriginal, setEmpleadoOriginal] = useState({});

    const [empleado, setEmpleado] = useState({
        id_em: "",
        n_em: "",
        a_em: "",
        eml_em: "",
        id_rh: "",
        id_doc: "",
        documento: "",
        tel_em: "",
        barloc_em: "",
        dir_em: "",
        lib_em: "",
        lic_emp: "",
        contrato: "",
        estado: "",
        id_eps: "",
        id_arl: "",
        id_pens: "",
        id_ces:""
    });

    const tipoRhOptions = {
        1: 'A+',
        2: 'A-',
        3: 'B+',
        4: 'B-',
        5: 'AB+',
        6: 'AB-',
        7: 'O+',
        8: 'O-',
    };

    const tipoDocumentoOptions = {
        1: 'Tarjeta de Identidad',
        2: 'Cédula de Ciudadanía',
        3: 'Tarjeta de Extranjería',
        4: 'Cédula de Extranjería',
        5: 'Pasaporte',
        6: 'Nit',
    };


    var act_ina = empleado.estado
    const usersPhoto = require.context("../../../assets/empleados", true)

    useEffect(() => {
        fetchDataone();
    }, []);

    const fetchDataone = () => {
        fetch(`https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readempleadoone&id=${empleadoid}`)
            .then((response) => response.json())
            .then((data) => {
                setEmpleado(data.contenido[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const fetchDataoneUpdate = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...empleado
            }),
        };

        fetch(`https://20.106.206.47/api_proyecto.github.io/api.php?apicall=updateempleadoinfoone`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                swal("¡Éxito!", "Los datos del empleado se han actualizado correctamente.", "success");
                fetchDataone();
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error al actualizar los datos del empleado:', error);
                swal("Error", "Hubo un problema al actualizar los datos del empleado.", "error");
            });
    };


    const comenzarEdicion = () => {
        setIsEditing(true);
        setEmpleadoOriginal({ ...empleado });
    };

    const caneclarEdicion = () => {
        setIsEditing(false);
        setEmpleado(empleadoOriginal);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEmpleado({
            ...empleado,
            [field]: value,
        });
    };

    const validarcamposprincipal = () => {
        let campos = ["documento", "id_doc", "n_em", "a_em", "eml_em", "passw"];
        let documentosValidos = true;
        campos.forEach((campo) => {
            if (documentosValidos) {
                documentosValidos = validarCampo(campo, empleado[campo]);
            }
        });

        if (documentosValidos) {
            fetchDataoneUpdate();

        } else {
            swal("Campo Inválido", "Por favor, verifica los campos para continuar con el proceso.", "error");
        }

        return documentosValidos;
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


            case "tel_em":
                const telefonoRegex = /^[0-9]{10}$/;
                if (!telefonoRegex.test(valorCampo)) {
                    nuevosErrores.tel_em =
                        "Por favor, ingrese un número de teléfono válido";
                } else {
                    delete nuevosErrores.tel_em;
                }
                break;

            case "contrato":
                if (!valorCampo || valorCampo.length < 10 || valorCampo.length > 100) {
                    nuevosErrores.contrato = "Por favor, verifica la URL del contrato.";
                } else {
                    delete nuevosErrores.contrato;
                }
                break;

            default:
                break;
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };



    return (
        <div className='box-mayor-ver-emple'>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                user.ID_rol !== 3 ? (
                    <div key={empleado.id_em} >
                        <div className={`row `}>
                            <div className=' row col-9 '>
                                <div className=' col-5' >
                                    <p className={`t h3 mb-2 mt-3 `}>Información personal del Empleado </p>

                                </div>
                            </div>
                            <div className='col-2 mt-2' >
                                {isEditing ? (
                                    <div>
                                        <button className="buton-editar btnfs btn btn-primary" onClick={validarcamposprincipal}>
                                            Guardar
                                        </button>
                                        <button className="buton-cancelare1 btnfa btn btn-primary" onClick={caneclarEdicion}>
                                            Cancelar
                                        </button>
                                    </div>
                                ) : (
                                    <button className="buton-editar btnfs btn btn-primary" onClick={comenzarEdicion}>
                                        Editar información Principal
                                    </button>
                                )}
                            </div>
                            <div className='col-1 mt-2' >
                                <button type="button" className="buton-regresar btnfa btn btn-primary " onClick={() => back('/consultar-empleados')}>Regresar</button>
                            </div>
                        </div>
                        <div className=" mt-3 row">

                            <div className={`ud-e col-2  card border-photho`}>

                                <button className={act_ina === 0 ? ' btn btn primary btn-estado-activo' : ' btn btn primary btn-estado-inactivo'} >
                                    {act_ina === 0 ? 'Actualmente: Activo' : 'Actualmente: Inactivo'}
                                </button>
                                <img
                                    src={act_ina === 0 ? usersPhoto('./empleado.png') : usersPhoto('./desactivo.jpeg')}
                                    className="card-img-top img-emple"
                                    
                                />

                                <button className=" buton-contrato btnfa btn btn-primary " href={empleado.contrato} target="_blank" rel="noreferrer">Ver contrato del empleado</button>

                            </div>
                            <div className='col-9-uxin '>
                                <div className={`row  ${isEditing ? 'editing-mode-datos' : 'canceled-mode-datos'}`}>
                                    <div className='col-6 caja-input '>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className="t-box">Nombres:  </span>
                                                {isEditing ? (
                                                    <div>
                                                        <input
                                                            className={`form-control ${errores.n_em ? "is-invalid" : empleado.n_em ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={empleado.n_em}
                                                            onChange={(e) => {
                                                                handleInputChange(e, 'n_em');
                                                                validarCampo("n_em", e.target.value);
                                                            }}
                                                        />
                                                        {errores.n_em && <div className="invalid-feedback">{errores.n_em}</div>}
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.n_em}
                                                    />
                                                )}
                                            </div>
                                            <div className='col-6'>
                                                <span className="t-box">Apellidos: </span>
                                                {isEditing ? (
                                                    <div>
                                                        <input
                                                            className={`form-control ${errores.a_em ? "is-invalid" : empleado.a_em ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={empleado.a_em}
                                                            onChange={(e) => {
                                                                handleInputChange(e, 'a_em');
                                                                validarCampo("a_em", e.target.value);
                                                            }}
                                                        />
                                                        {errores.a_em && <div className="invalid-feedback">{errores.a_em}</div>}
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.a_em}
                                                    />
                                                )}

                                            </div>
                                        </div>
                                        <div>
                                            <span className="t-box">Correo electronico: </span>
                                            {isEditing ? (
                                                <div>
                                                    <input
                                                        className={`form-control ${errores.eml_em ? "is-invalid" : empleado.eml_em ? "is-valid" : ""}`}
                                                        disabled={!isEditing}
                                                        value={empleado.eml_em}
                                                        onChange={(e) => {
                                                            handleInputChange(e, 'eml_em');
                                                            validarCampo("eml_em", e.target.value);
                                                        }}
                                                    />
                                                    {errores.eml_em && <div className="invalid-feedback">{errores.eml_em}</div>}
                                                </div>
                                            ) : (
                                                <input
                                                    className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                    disabled={!isEditing}
                                                    value={empleado.eml_em}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <span className="t-box">Tipo de RH:  </span>
                                            {isEditing ? (
                                                <select
                                                    className={`form-control ${errores.id_rh ? "is-invalid" : empleado.id_rh ? "is-valid" : ""}`}
                                                    value={empleado.id_rh}
                                                    onChange={(e) => handleInputChange(e, 'id_rh')}
                                                >
                                                    {Object.entries(tipoRhOptions).map(([value, label]) => (
                                                        <option key={value} value={value}>
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    className='i-box form-control'
                                                    disabled
                                                    value={tipoRhOptions[empleado.id_rh]}
                                                />
                                            )}
                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className="t-box"> Numero de documento:</span>
                                                {isEditing ? (
                                                    <div>
                                                        <input
                                                            className={`form-control ${errores.documento ? "is-invalid" : empleado.documento ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={empleado.documento}
                                                            onChange={(e) => {
                                                                handleInputChange(e, 'documento');
                                                                validarCampo("documento", e.target.value);
                                                            }}
                                                        />
                                                        {errores.documento && <div className="invalid-feedback">{errores.documento}</div>}
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.documento}
                                                    />
                                                )}
                                            </div>
                                            <div className='col-6'>
                                                <span className="t-box"> Tipo de documento:</span>
                                                {isEditing ? (
                                                    <select
                                                        className={`form-control ${errores.id_rh ? "is-invalid" : empleado.id_rh ? "is-valid" : ""}`}
                                                        value={empleado.id_doc}
                                                        onChange={(e) => handleInputChange(e, 'id_doc')}
                                                    >
                                                        {Object.entries(tipoDocumentoOptions).map(([value, label]) => (
                                                            <option key={value} value={value}>
                                                                {label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        className='i-box form-control'
                                                        disabled
                                                        value={tipoDocumentoOptions[empleado.id_doc]}
                                                    />
                                                )}



                                            </div>
                                        </div>

                                    </div>

                                    <div className='col-6 caja-input'>

                                        <span className="t-box">Telefono celular: </span>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    className={`form-control ${errores.tel_em ? "is-invalid" : empleado.tel_em ? "is-valid" : ""}`}
                                                    disabled={!isEditing}
                                                    value={empleado.tel_em}
                                                    onChange={(e) => {
                                                        handleInputChange(e, 'tel_em');
                                                        validarCampo("tel_em", e.target.value);
                                                    }}
                                                />
                                                {errores.tel_em && <div className="invalid-feedback">{errores.tel_em}</div>}
                                            </div>
                                        ) : (
                                            <input
                                                className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                disabled={!isEditing}
                                                value={empleado.tel_em}
                                            />
                                        )}


                                        <div className='row' >
                                            <div className='col-6'>
                                                <span className="t-box"> Barrio y localidad: </span>
                                                {isEditing ? (
                                                    <div>
                                                        <input
                                                            className={`form-control ${errores.barloc_em ? "is-invalid" : empleado.barloc_em ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={empleado.barloc_em}
                                                            onChange={(e) => {
                                                                handleInputChange(e, 'barloc_em');
                                                                validarCampo("barloc_em", e.target.value);
                                                            }}
                                                        />
                                                        {errores.barloc_em && <div className="invalid-feedback">{errores.barloc_em}</div>}
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.barloc_em}
                                                    />
                                                )}

                                            </div>

                                            <div className='col-6'>
                                                <span className="t-box">Dirección: </span>
                                                {isEditing ? (
                                                    <div>
                                                        <input
                                                            className={`form-control ${errores.dir_em ? "is-invalid" : empleado.dir_em ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={empleado.dir_em}
                                                            onChange={(e) => {
                                                                handleInputChange(e, 'dir_em');
                                                                validarCampo("dir_em", e.target.value);
                                                            }}
                                                        />
                                                        {errores.dir_em && <div className="invalid-feedback">{errores.dir_em}</div>}
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.dir_em}
                                                    />
                                                )}

                                            </div>
                                        </div>

                                        <div>
                                            <span className="t-box">Libreta militar:  </span>

                                            {isEditing ? (
                                                <select
                                                    className={`form-control ${errores.lib_em ? "is-invalid" : empleado.lib_em ? "is-valid" : ""}`}
                                                    value={empleado.lib_em}
                                                    onChange={(e) => handleInputChange(e, 'lib_em')}
                                                >
                                                    <option value="Primera clase">Primera clase</option>
                                                    <option value="Segunda clase">Segunda clase</option>
                                                    <option value="En proceso">En proceso</option>
                                                    <option value="No aplica">No aplica</option>
                                                </select>
                                            ) : (
                                                <input
                                                    className='i-box form-control'
                                                    disabled
                                                    value={empleado.lib_em}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <span className="t-box">Licencia de conducción:  </span>
                                            {isEditing ? (
                                                <select
                                                    className={`form-control ${errores.lic_emp ? "is-invalid" : empleado.lic_emp ? "is-valid" : ""}`}
                                                    value={empleado.lic_emp}
                                                    onChange={(e) => handleInputChange(e, 'lic_emp')}
                                                >
                                                    <option value="A1">A1</option>
                                                    <option value="A2">A2</option>
                                                    <option value="En proceso">En proceso</option>
                                                    <option value="No aplica">No aplica</option>
                                                </select>
                                            ) : (
                                                <input
                                                    className='i-box-contrato form-control'
                                                    disabled
                                                    value={empleado.lic_emp}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div >
                                        <span className="t-box">Link de contrato:  </span>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    className={`i-finish form-control ${errores.contrato ? "is-invalid" : empleado.contrato ? "is-valid" : ""}`}
                                                    disabled={!isEditing}
                                                    value={empleado.contrato}
                                                    onChange={(e) => {
                                                        handleInputChange(e, 'contrato');
                                                        validarCampo("contrato", e.target.value);
                                                    }}
                                                />
                                                {errores.contrato && <div className="invalid-feedback">{errores.contrato}</div>}
                                            </div>
                                        ) : (
                                            <input
                                                className={`i-finish i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                disabled={!isEditing}
                                                value={empleado.contrato}
                                            />
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='mt-4 box-main-parafis'>


                            <div className='mt-3 d-flex'>
                                <div className='box-i-para col-3'>
                                    <span className=" t-box"> Entidad Promotora de Salud (EPS):  </span>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                className={`mt-2 i-para form-control ${errores.id_eps ? "is-invalid" : empleado.id_eps ? "is-valid" : ""}`}
                                                disabled={!isEditing}
                                                value={empleado.id_eps}
                                                onChange={(e) => {
                                                    handleInputChange(e, 'id_eps');
                                                    validarCampo("id_eps", e.target.value);
                                                }}
                                            />
                                            {errores.id_eps && <div className="invalid-feedback">{errores.id_eps}</div>}
                                        </div>
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled={!isEditing}
                                            value={empleado.id_eps}
                                        />
                                    )}


                                </div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box"> Fondo de cesantias:  </span>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                className={`mt-2 i-para form-control ${errores.id_ces ? "is-invalid" : empleado.id_ces ? "is-valid" : ""}`}
                                                disabled={!isEditing}
                                                value={empleado.id_ces}
                                                onChange={(e) => {
                                                    handleInputChange(e, 'id_ces');
                                                    validarCampo("id_ces", e.target.value);
                                                }}
                                            />
                                            {errores.id_ces && <div className="invalid-feedback">{errores.id_ces}</div>}
                                        </div>
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled={!isEditing}
                                            value={empleado.id_ces}
                                        />
                                    )}
                                </div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box"> Administradoras de Riesgos Laborales (ARL):  </span>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                className={`mt-2 i-para form-control ${errores.id_arl ? "is-invalid" : empleado.id_arl ? "is-valid" : ""}`}
                                                disabled={!isEditing}
                                                value={empleado.id_arl}
                                                onChange={(e) => {
                                                    handleInputChange(e, 'id_arl');
                                                    validarCampo("id_arl", e.target.value);
                                                }}
                                            />
                                            {errores.id_arl && <div className="invalid-feedback">{errores.id_arl}</div>}
                                        </div>
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled={!isEditing}
                                            value={empleado.id_arl}
                                        />
                                    )}</div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box"> Fondo pensional:  </span>
                                    {isEditing ? (
                                        <div>
                                            <input
                                                className={`mt-2 i-para form-control ${errores.id_pens ? "is-invalid" : empleado.id_pens ? "is-valid" : ""}`}
                                                disabled={!isEditing}
                                                value={empleado.id_pens}
                                                onChange={(e) => {
                                                    handleInputChange(e, 'id_pens');
                                                    validarCampo("id_pens", e.target.value);
                                                }}
                                            />
                                            {errores.id_pens && <div className="invalid-feedback">{errores.id_pens}</div>}
                                        </div>
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled={!isEditing}
                                            value={empleado.id_pens}
                                        />
                                    )}

                                </div>

                            </div>


                        </div>



                    </div>) : (<p>Su rol no tiene acceso a esta funcionalidad</p>)
            )}
            {user.ID_rol !== 3 ? <div>
                <ContactoEmergencia id={empleadoid} />
            </div> : ""}
        </div>
    )
}
