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
        lic_emp: ""
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
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempleadoone&id=${empleadoid}`)
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
      
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updateempleadoinfoone`, requestOptions)
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
                            <div className=' row col-9  '>
                                <div className=' col-5' > <p className="t h3 mb-2 mt-3">Información personal del Empleado </p></div>
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
                        <div className={`mb-3 mt-2 borsupd border-3 `}></div>
                        <div className="row">
                            <div className="ud-e col-2  card border-photho ">
                                <div className='col-12  mt-1 text-center' >{act_ina === "0" ? (<a className="link-successs">Actualmente: Activo</a>) : (<a className="link-dangerr">Actualmente: Inactivo</a>)}</div>
                                <img src={usersPhoto('./empleado.png')} className="card-img-top  img-emple" alt="Image by rawpixel.com on Freepik" />
                                <button className=" buton-contrato  btnfs btn btn-primary " href={empleado.contrato} target="_blank" rel="noreferrer">Ver contrato</button>
                            </div>
                            <div className='col-9-uxin '>
                            <div className={`row box-datos-basicos ${isEditing ? 'editing-mode' : ''}`}>
                                    <div className='col-6 caja-input  '>
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
                                                    className='i-box form-control'
                                                    disabled
                                                    value={empleado.lic_emp}
                                                />
                                            )}

                                        
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='row '>
                            <p className="t h3 mt-3  ">Parafiscales</p>
                            <div className={`mb-3 mt-3 borsupd-para border-3 `}></div>

                            <TableContainer >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pension</TableCell>
                                            <TableCell>Censantias</TableCell>
                                            <TableCell>EPS</TableCell>
                                            <TableCell>ARL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>

                                                {empleado.id_pens}

                                            </TableCell>
                                            <TableCell>

                                                {empleado.id_ces}

                                            </TableCell>
                                            <TableCell>

                                                {empleado.id_eps}

                                            </TableCell>
                                            <TableCell>

                                                {empleado.id_arl}

                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>) : (<p>Su rol no tiene acceso a esta funcionalidad</p>)
            )}
            {user.ID_rol !== 3 ? <div>
                <ContactoEmergencia id={empleadoid} />
            </div> : ""}
        </div>
    )
}
