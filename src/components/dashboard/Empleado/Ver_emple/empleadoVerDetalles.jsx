import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router-dom';
import ContactoEmergencia from './contactoEmergencia';
import "../../../../../src/style/Empleado/Reg_empl/empleado.css";
import { useAuth } from '../../../../autenticate';


export default function EmpleadoVerDetalles() {
    const { empleadoid } = useParams();
    const back = useNavigate();
    const { user, token } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [errores, setErrores] = useState({});
    const [empleadoOriginal, setEmpleadoOriginal] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchDataone();
        fetchDataestado();
    }, []);


    // ROL --------------------------------------------------------------------------------------------
    // read Roles ------------------------
    const [tprol, setTprol] = useState([]);
    const [rolemp, setRolemp] = useState({ id_em: empleadoid, id_rol: '' });

    useEffect(() => {
        fetchDataTproles();
        fetchDatarol();
    }, []);

    const fetchDataTproles = () => {
        fetch("http://localhost/api_sisinov/public/api/rol", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
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
    // read Roles ------------------------


    // read Rol Emple ------------------------

    const fetchDatarol = () => {
        fetch(`http://localhost/api_sisinov/public/api/readempleadorol/${empleadoid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
        })
            .then((response) => response.json())
            .then((data) => {
                setRolemp((prevRolemp) => ({
                    ...prevRolemp,
                    id_rol: data.id_rol
                }));

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    // read Rol Emple ------------------------

    // Update Rol ------------------------
    const fetchDataUpdaterol = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...rolemp
            }),
        };

        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=update_rol`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                fetchDatarol(); // Llamada directa a la función de lectura después de la actualización
            })
            .catch((error) => {
                console.error('Error al actualizar los datos del empleado:', error);
            });
    };



    const handleInputChangerol = (e) => {
        const value = e.target.value;
        setRolemp((prevRolemp) => ({
            ...prevRolemp,
            id_rol: value,
        }));
    };



    // Update Rol ------------------------
    //ROL --------------------------------------------------------------------------------------------

    //RH   --------------------------------------------------------------------------------------------
    const [tipoRhOptions, setTipoRhOptions] = useState([]);
    useEffect(() => {
        fetchDataTprh();
    }, []);
    // read rhs ------------------------
    const fetchDataTprh = () => {
        fetch("http://localhost/api_sisinov/public/api/rh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
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
    // read rhs ------------------------
    //RH   --------------------------------------------------------------------------------------------


    //TIPO DOCUMENTOS   --------------------------------------------------------------------------------------
    const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);
    useEffect(() => {
        fetchDataTpdoc();
    }, []);
    // read documentos ------------------------
    const fetchDataTpdoc = () => {
        fetch("http://localhost/api_sisinov/public/api/tdoc", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error en la respuesta de la API:", data.message);
                    // Puedes manejar el error de alguna manera si es necesario
                } else if (Array.isArray(data.data)) {
                    setTipoDocumentoOptions(data.data);
                } else {
                    console.error("El contenido de la respuesta no es un array");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
                // Puedes manejar el error de alguna manera si es necesario
            });
    };
    // read documentos ------------------------

    //TIPO DOCUMENTOS   --------------------------------------------------------------------------------------

    //TIPO EPS  ---------------------------------------------------------------------------------------
    const [epsOptions, setepsOptions] = useState([]);
    useEffect(() => {
        fetchDataTpeps();
    }, []);
    // read eps ------------------------
    const fetchDataTpeps = () => {
        fetch("http://localhost/api_sisinov/public/api/eps", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error en la respuesta de la API:", data.message);
                    // Puedes manejar el error de alguna manera si es necesario
                } else if (Array.isArray(data.data)) {
                    setepsOptions(data.data);
                } else {
                    console.error("El contenido de la respuesta no es un array");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
                // Puedes manejar el error de alguna manera si es necesario
            });
    };
    // read eps ------------------------
    //TIPO EPS  ---------------------------------------------------------------------------------------


    //TIPO CESANTIAS ---------------------------------------------------------------------------------------
    const [cesOptions, setcesOptions] = useState([]);
    useEffect(() => {
        fetchDataTpces();
    }, [])
    // read ces ------------------------
    const fetchDataTpces = () => {
        fetch("http://localhost/api_sisinov/public/api/cesantias", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error en la respuesta de la API:", data.message);
                    // Puedes manejar el error de alguna manera si es necesario
                } else if (Array.isArray(data.data)) {
                    setcesOptions(data.data);
                } else {
                    console.error("El contenido de la respuesta no es un array");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
                // Puedes manejar el error de alguna manera si es necesario
            });
    };
    // read ces ------------------------
    //TIPO CESANTIAS  ---------------------------------------------------------------------------------------

    //TIPO ARL  ---------------------------------------------------------------------------------------
    const [arlOptions, setArlOptions] = useState([]);
    useEffect(() => {
        fetchDataTparl();
    }, [])
    // read arls ------------------------
    const fetchDataTparl = () => {
        fetch("http://localhost/api_sisinov/public/api/arl", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error en la respuesta de la API:", data.message);
                    // Puedes manejar el error de alguna manera si es necesario
                } else if (Array.isArray(data.data)) {
                    setArlOptions(data.data);
                } else {
                    console.error("El contenido de la respuesta no es un array");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
                // Puedes manejar el error de alguna manera si es necesario
            });
    };
    // read arls ------------------------
    //TIPO ARL  ---------------------------------------------------------------------------------------



    //TIPO PENSIONES ---------------------------------------------------------------------------------------
    const [penOptions, setPenOptions] = useState([]);
    useEffect(() => {
        fetchDataTpen();
    }, [])
    // read pens ------------------------
    const fetchDataTpen = () => {
        fetch("http://localhost/api_sisinov/public/api/pensiones", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
          })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error("Error en la respuesta de la API:", data.message);
                    // Puedes manejar el error de alguna manera si es necesario
                } else if (Array.isArray(data.data)) {
                    setPenOptions(data.data);
                } else {
                    console.error("El contenido de la respuesta no es un array");
                }
            })
            .catch((error) => {
                console.error("Error al realizar la solicitud:", error);
                // Puedes manejar el error de alguna manera si es necesario
            });
    };
    // read pens ------------------------
    //TIPO PENSIONES  ---------------------------------------------------------------------------------------


    const abrirContrato = () => {
        window.open(empleado.contrato);
    };

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
        id_ces: ""
    });
    const usersPhoto = require.context("../../../../assets/empleados", true)
    const fetchDataone = () => {

        fetch(`http://localhost/api_sisinov/public/api/readempleadoone/${empleadoid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "nToken": token }),
        })
            .then((response) => response.json())
            .then((data) => {
                setEmpleado(data.data[0]);
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

    const cancelarEdicion = () => {
        swal({
            title: "¿Estás seguro de deshacer esta acción?",
            text: "Recuerda que perderás los elementos modificados.",
            icon: "warning",
            buttons: ["Cancelar", "Si"],
            dangerMode: true,
        }).then((deshacer) => {
            if (deshacer) {
                setIsEditing(false);
                setEmpleado(empleadoOriginal);
                swal("¡Acción deshecha!", {
                    icon: "success",
                });
            } else {
                swal("Continuar editando.", {
                    icon: "info",
                });
            }
        });
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
            swal({
                title: "¿Estás seguro de guardar?",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((willDelete) => {
                if (willDelete) {
                    fetchDataoneUpdate();
                    fetchDataUpdaterol();

                }
            });

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

    const [empleadoestado, setEmpleadoestado] = useState({
        id_em: "",
        estado: ""
    });



    const fetchDataestado = async () => {
        try {
            const response = await fetch(`http://localhost/api_sisinov/public/api/readempleadoestado/${empleadoid}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ "nToken": token }),
              });
            const data = await response.json();
            setEmpleadoestado(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos del empleado:', error);
            setLoading(false);
        }
    };

    const actualizarEstadoEmpleado = async (nuevoEstado) => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...empleadoestado,
                    estado: nuevoEstado,
                    nToken: token,
                }),
            };
            const response = await fetch(`http://localhost/api_sisinov/public/api/updateestadoempleado`, requestOptions);
            const data = await response.json();

            console.log(data);
            swal("¡Éxito!", "Verifica que el empleado se haya actualizado correctamente.", "success");
            fetchDataone();
            setIsEditing(false);
            back('/consultar-empleados')
        } catch (error) {
            console.error('Error al actualizar los datos del empleado:', error);
            swal("Error", "Hubo un problema al actualizar los datos del empleado.", "error");
        }
    };

    const activar = () => {
        actualizarEstadoEmpleado("0");
    };

    const desactivar = () => {
        actualizarEstadoEmpleado("1");
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
                                    <p className={empleado.estado === "0" ? 't-principal-activo h3 mb-2 mt-3' : 't-principal-inativo h3 mb-2 mt-3'}>Información personal </p>
                                </div>
                            </div>
                            <div className='col-2 mt-2'>
                                {empleadoestado.estado === "0" ? (
                                    isEditing ? (
                                        <div className='row'>
                                            <div className='col-6'>
                                                <button onClick={validarcamposprincipal} className="btn btnfs btn-primary editar-btn">
                                                    <i className="bi bi-arrow-down-square editar-icon"></i>
                                                    Guardar
                                                </button>
                                            </div>


                                            <div className='col-6'>
                                                <button onClick={cancelarEdicion} className="btn btnfd btn-primary eliminar-btn">
                                                    <i className="bi bi-x-square eliminar-icon"></i>
                                                    Cancelar
                                                </button>

                                            </div>


                                        </div>
                                    ) : (
                                        <div >
                                            <button onClick={comenzarEdicion} className=" float-end btn btnfs btn-primary editar-btn">
                                                <i className="bi bi-pencil-square editar-icon" ></i>
                                                Editar
                                            </button>
                                        </div>
                                    )
                                ) : null}
                            </div>
                            <div className='col-1 mt-2' >
                                <button type="button" className=" regresar-btn buton-regresar btnfa btn btn-primary " onClick={() => back('/consultar-empleados')}>
                                    <i class="regresar-icon bi bi-arrow-left-square"></i>
                                    Regresar
                                </button>
                            </div>
                        </div>
                        <div className=" mt-2 row">

                            <div className={`ud-e col-2 card ${empleado.estado === "0" ? (isEditing ? 'editing-border-photho' : 'canceled-border-photho') : 'inactive-border-photho'}`}>

                                <button className={empleado.estado === "0" ? 'btn btn-primary btn-estado-activo' : 'btn btn-primary btn-estado-inactivo'}>
                                    {empleado.estado === "0" ? 'Actualmente: Activo' : 'Actualmente: Inactivo'}
                                </button>
                                <img
                                    src={empleado.estado === "0" ? usersPhoto('./empleado.png') : usersPhoto('./desactivo.jpeg')}
                                    className="card-img-top img-emple"
                                />
                                <button
                                    className={empleado.estado === "0" ? 'btn btn-primary buton-contrato-activo' : 'btn btn-primary buton-contrato-desactivo'}
                                    onClick={abrirContrato}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Ver contrato
                                </button>
                            </div>
                            <div className='col-9-uxin '>
                                <div className={`row ${empleado.estado === "0" ? (isEditing ? 'editing-mode-datos' : 'canceled-mode-datos') : 'inactive-mode-datos'}`}>
                                    <div className='col-6 caja-input '>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className="t-box-ver-1">Nombres:  </span>
                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
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
                                                            className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                            disabled
                                                            value={empleado.n_em}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={` form-control '`}
                                                        disabled
                                                        value={empleado.n_em}
                                                    />
                                                )}
                                            </div>
                                            <div className='col-6'>
                                                <span className="t-box-ver-1">Apellidos: </span>
                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
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
                                                            className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                            disabled
                                                            value={empleado.a_em}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={` form-control '`}
                                                        disabled
                                                        value={empleado.a_em}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="t-box-ver-1">Correo electronico: </span>
                                            {empleado.estado === "0" ? (
                                                isEditing ? (
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
                                                        className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled
                                                        value={empleado.eml_em}
                                                    />
                                                )
                                            ) : (
                                                <input
                                                    className={`form-control '`}
                                                    disabled
                                                    value={empleado.eml_em}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <span className="t-box-ver-1">Tipo de RH: </span>
                                            {empleado.estado === "0" ? (
                                                isEditing ? (
                                                    <select
                                                        className={`form-control ${errores.id_rh ? "is-invalid" : empleado.id_rh ? "is-valid" : ""}`}
                                                        value={empleado.id_rh}
                                                        onChange={(e) => handleInputChange(e, 'id_rh')}
                                                    >
                                                        {tipoRhOptions.map((rh) => (
                                                            <option key={rh.ID_RH} value={rh.RH}>
                                                                {rh.T_RH}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input
                                                        className={`e i-box form-control `}
                                                        disabled
                                                        value={tipoRhOptions.find(item => item.ID_RH === empleado.id_rh)?.T_RH || ''}
                                                    />
                                                )
                                            ) : (
                                                <input
                                                    className={`form-control '`}
                                                    disabled
                                                    value={tipoRhOptions.find(item => item.ID_RH === empleado.id_rh)?.T_RH || ''}
                                                />
                                            )}
                                        </div>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <span className="t-box-ver-1"> Numero de documento:</span>

                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
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
                                                            className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                            disabled
                                                            value={empleado.documento}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={`form-control '`}
                                                        disabled
                                                        value={empleado.documento}
                                                    />
                                                )}
                                            </div>
                                            <div className='col-6'>
                                                <span className="t-box-ver-1"> Tipo de documento:</span>
                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
                                                        <select
                                                            className={`form-control ${errores.id_doc ? "is-invalid" : empleado.id_doc ? "is-valid" : ""}`}
                                                            value={empleado.id_doc}
                                                            onChange={(e) => handleInputChange(e, 'id_doc')}
                                                        >
                                                            {tipoDocumentoOptions.map((doc) => (
                                                                <option key={doc.ID_Doc} value={doc.ID_Doc}>
                                                                    {doc.N_TDoc}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            className={`e i-box form-control `}
                                                            disabled
                                                            value={tipoDocumentoOptions.find(item => item.ID_Doc === empleado.id_doc)?.N_TDoc || ''}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={`form-control '`}
                                                        disabled
                                                        value={tipoDocumentoOptions.find(item => item.ID_Doc === empleado.id_doc)?.N_TDoc || ''}
                                                    />
                                                )}

                                            </div>
                                        </div>
                                        <div >
                                            <span className="t-box-ver-1">Rol en el sistema </span>
                                            {empleado.estado === "0" ? (
                                                isEditing ? (
                                                    <div>
                                                        <select
                                                            className={`i-finish form-control ${errores.contrato ? "is-invalid" : empleado.contrato ? "is-valid" : ""}`}
                                                            disabled={!isEditing}
                                                            value={rolemp.id_rol}
                                                            onChange={handleInputChangerol}
                                                        >
                                                            {tprol.map((rol) => (
                                                                <option key={rol.ID_rol} value={rol.ID_rol}>
                                                                    {rol.N_rol}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <input
                                                        className={`e i-finish i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={tprol.find(item => item.ID_rol === rolemp.id_rol)?.N_rol || ''}
                                                    />
                                                )
                                            ) : (
                                                <input
                                                    className={`i-finish i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                    disabled={!isEditing}
                                                    value={tprol.find(item => item.ID_rol === rolemp.id_rol)?.N_rol || ''}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-6 caja-input'>
                                        <span className="t-box-ver-1">Telefono celular: </span>
                                        {empleado.estado === "0" ? (
                                            isEditing ? (
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
                                                    className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                    disabled
                                                    value={empleado.tel_em}
                                                />
                                            )
                                        ) : (
                                            <input
                                                className={`form-control '`}
                                                disabled
                                                value={empleado.tel_em}
                                            />
                                        )}


                                        <div className='row' >
                                            <div className='col-6'>
                                                <span className="t-box-ver-1"> Barrio y localidad: </span>
                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
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
                                                            className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                            disabled
                                                            value={empleado.barloc_em}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={`form-control '`}
                                                        disabled
                                                        value={empleado.barloc_em}
                                                    />
                                                )}

                                            </div>

                                            <div className='col-6'>
                                                <span className="t-box-ver-1">Dirección: </span>
                                                {empleado.estado === "0" ? (
                                                    isEditing ? (
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
                                                            className={`e i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                            disabled
                                                            value={empleado.dir_em}
                                                        />
                                                    )
                                                ) : (
                                                    <input
                                                        className={`form-control '`}
                                                        disabled
                                                        value={empleado.dir_em}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="t-box-ver-1">Libreta militar:  </span>

                                            {empleado.estado === "0" ? (
                                                isEditing ? (
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
                                                        className={`e i-box form-control `}
                                                        disabled
                                                        value={empleado.lib_em}
                                                    />
                                                )
                                            ) : (
                                                <input
                                                    className={`form-control '`}
                                                    disabled
                                                    value={empleado.lib_em}
                                                />
                                            )}



                                        </div>
                                        <div>
                                            <span className="t-box-ver-1">Licencia de conducción:  </span>
                                            {empleado.estado === "0" ? (
                                                isEditing ? (
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
                                                        className={`e i-box form-control `}
                                                        disabled
                                                        value={empleado.lic_emp}
                                                    />
                                                )
                                            ) : (
                                                <input
                                                    className={`form-control '`}
                                                    disabled
                                                    value={empleado.lic_emp}
                                                />
                                            )}
                                        </div>

                                        <div >
                                            <span className="t-box-ver-1">Link de contrato:  </span>
                                            {empleado.estado === "0" ? (
                                                isEditing ? (
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
                                                        className={`e i-finish i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                                        disabled={!isEditing}
                                                        value={empleado.contrato}
                                                    />
                                                )
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
                        </div>

                        <div className={`mt-4 ${empleado.estado === "0" ? (isEditing ? 'editing-box-main-parafis' : 'canceled-box-main-parafis') : 'inactive-box-main-parafis'}`}>

                            <div className='mt-3 d-flex'>
                                <div className='box-i-para col-3'>
                                    <span className=" t-box-ver-2"> Entidad Promotora de Salud (EPS):  </span>
                                    {empleado.estado === "0" ? isEditing ? (
                                        <select
                                            className={`mt-2 i-para form-control ${errores.id_eps ? "is-invalid" : empleado.id_eps ? "is-valid" : ""}`}
                                            value={empleado.id_eps}
                                            onChange={(e) => handleInputChange(e, 'id_eps')}
                                        >
                                            {epsOptions.map((eps) => (
                                                <option key={eps.ID_eps} value={eps.ID_eps}>
                                                    {eps.N_eps}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            className={`e mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={epsOptions.find(item => item.ID_eps === empleado.id_eps)?.N_eps || ''}
                                        />
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={epsOptions.find(item => item.ID_eps === empleado.id_eps)?.N_eps || ''}
                                        />
                                    )}


                                </div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box-ver-2"> Fondo de cesantias:  </span>
                                    {empleado.estado === "0" ? isEditing ? (
                                        <select
                                            className={`mt-2 i-para form-control ${errores.id_ces ? "is-invalid" : empleado.id_ces ? "is-valid" : ""}`}
                                            value={empleado.id_ces}
                                            onChange={(e) => handleInputChange(e, 'id_ces')}
                                        >
                                            {cesOptions.map((ces) => (
                                                <option key={ces.ID_ces} value={ces.ID_ces}>
                                                    {ces.N_ces}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            className={`e mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={cesOptions.find(item => item.ID_ces === empleado.id_ces)?.N_ces || ''}
                                        />
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={cesOptions.find(item => item.ID_ces === empleado.id_ces)?.N_ces || ''}

                                        />
                                    )}

                                </div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box-ver-2"> Administradoras de Riesgos Laborales (ARL):  </span>
                                    {empleado.estado === "0" ? isEditing ? (
                                        <select
                                            className={`mt-2 i-para form-control ${errores.id_arl ? "is-invalid" : empleado.id_arl ? "is-valid" : ""}`}
                                            value={empleado.id_arl}
                                            onChange={(e) => handleInputChange(e, 'id_arl')}
                                        >
                                            {arlOptions.map((arl) => (
                                                <option key={arl.ID_arl} value={arl.ID_arl}>
                                                    {arl.N_arl}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            className={`e mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={arlOptions.find(item => item.ID_arl === empleado.id_arl)?.N_arl || ''}
                                        />
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={arlOptions.find(item => item.ID_arl === empleado.id_arl)?.N_arl || ''} />
                                    )}

                                </div>

                                <div className='box-i-para col-3'>
                                    <span className="t-box-ver-2"> Fondo pensional: </span>
                                    {empleado.estado === "0" ? isEditing ? (
                                        <select
                                            className={`mt-2 i-para form-control ${errores.id_pens ? "is-invalid" : empleado.id_pens ? "is-valid" : ""}`}
                                            value={empleado.id_pens}
                                            onChange={(e) => handleInputChange(e, 'id_pens')}
                                        >
                                            {penOptions.map((pen) => (
                                                <option key={pen.ID_pens} value={pen.ID_pens}>
                                                    {pen.N_pens}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            className={`e mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={penOptions.find(item => item.ID_pens === empleado.id_pens)?.N_pens || ''}
                                        />
                                    ) : (
                                        <input
                                            className={`mt-2 i-para i-box form-control ${isEditing ? 'editing-mode' : ''}`}
                                            disabled
                                            value={penOptions.find(item => item.ID_pens === empleado.id_pens)?.N_pens || ''} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>) : (<p>Su rol no tiene acceso a esta funcionalidad</p>)
            )}
            {user.ID_rol !== 3 ? <div>
                <ContactoEmergencia id={empleadoid} estado={empleado.estado} />

            </div> : ""}
            <div className="d-flex align-items-center justify-content-center ">
                <button className="btnfd btn btn-primary" onClick={empleadoestado.estado === "0" ? desactivar : activar}>
                    {empleadoestado.estado === "0" ? "Dar de baja al empleado" : "Activar empleado"}
                </button>
            </div>

        </div>
    )
}
