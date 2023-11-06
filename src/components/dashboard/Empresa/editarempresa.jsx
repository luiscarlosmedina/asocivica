import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

export default function EditarE({ id, onUpdate }) {
    const [errors, setErrors] = useState({});
    const [close, setClose] = useState(" ");
    const [doc, setDoc] = useState([])

    //llamar los tipos de documentos
    const fetchDataDoc = () => {
        fetch(
            `http://localhost/api_proyecto.github.io/api.php?apicall=readtdoc&id`
        )
            .then((response) => response.json())
            .then((doc) => {
                setDoc(doc.contenido);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDataDoc();
    }, []);
    const [empresa, setEmpresa] = useState({
        id_e: "",
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
        COD_AE: ""
    });
    const fecha = new Date();
    const hoy = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();

    const getError = (fieldName) => {
        return errors[fieldName] || "";
    };

    const validateField = (fieldName, value) => {
        const regexPatterns = {
            Nit_E: /^\d{9}-\d{1}$/,
            Nom_E: /^.{1,100}$/,
            Eml_E: /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
            Nom_Rl: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
            CC_Rl: /^(?:[A-Za-z0-9]+|[0-9]{6,10})$/,
            telefonoGeneral: /^\d{7,10}$/,
            Val_E: /^(?:[1-9]\d{0,6}|10000000)$/,
            COD_SE: /^\d{1,4}$/,
            COD_AE: /^\d{1,4}$/
        };

        const errorsCopy = { ...errors };

        if (fieldName in regexPatterns) {
            const regex = regexPatterns[fieldName];
            if (!regex.test(value) || value.trim() === " ") {
                errorsCopy[fieldName] = `El campo no es válido`;
            } else {
                delete errorsCopy[fieldName];
            }
        }

        setErrors(errorsCopy);
    };

    useEffect(() => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempresa&id=${id}`)
            .then(response => response.json())
            .then(data => {
                setEmpresa(data.contenido[0]);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };
    const handleUpdateEmpresa = () => {
        if (Object.keys(errors).length === 0) {
            const datosActualizados = {
                'id_e': empresa.id_e,
                'Nit_E': empresa.Nit_E,
                'Nom_E': empresa.Nom_E,
                'Eml_E': empresa.Eml_E,
                'Nom_Rl': empresa.Nom_Rl,
                'ID_Doc': empresa.ID_Doc,
                'CC_Rl': empresa.CC_Rl,
                'telefonoGeneral': empresa.telefonoGeneral,
                'Val_E': empresa.Val_E,
                'Est_E': empresa.Est_E,
                'Fh_Afi': empresa.Fh_Afi,
                'fechaFinalizacion': empresa.fechaFinalizacion,
                'COD_SE': empresa.COD_SE,
                'COD_AE': empresa.COD_AE
            };
            console.log(datosActualizados);

            fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updateempresa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizados)
            })
                .then(response => response.json())
                .then(responseData => {
                    if (responseData) {
                        swal("¡Buen trabajo!", 'Actualización exitosa', "success");
                        onUpdate();
                        setClose("modal");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    swal("Ocurrió un error!", 'Inténtalo más tarde', "error");
                });
        } else {
            swal("¡Error!", 'Por favor, corrige los errores antes de guardar.', "error");
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEmpresa(prevEmpresa => ({ ...prevEmpresa, [name]: value }));
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="editarempresa">
                    Editar empresa
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <form className='d-flex justify-content-around'>
                    <div className='input-group'>
                        <div className="mb-3">
                            <label htmlFor="Est_E" className="col-form-label">Estado</label>
                            <select name="Est_E" className="form-select w-auto" value={empresa.Est_E} onChange={handleInputChange}>
                                <option value="0">Activo</option>
                                <option value="1">En estudio</option>
                                <option value="2">Inactivo</option>
                                <option value="3">Seleccione una opción</option>
                            </select>
                        </div>
                        <div>
                            <input type='hidden' value={(!empresa.Est_E && empresa.Est_E === "0") || empresa.Est_E === "1" ? empresa.Fh_Afi = hoy : empresa.fechaFinalizacion = hoy} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Nom_E" className="col-form-label">Nombre empresa</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("Nom_E") && "is-invalid"}`}
                                placeholder="Empresa S.A.S"
                                name="Nom_E"
                                value={empresa.Nom_E}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese nombre válido</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="telefonoGeneral" className="col-form-label">Teléfono</label>
                            <input
                                type="number"
                                className={`form-control w-auto ${getError("telefonoGeneral") && "is-invalid"}`}
                                placeholder="2222222"
                                name="telefonoGeneral"
                                value={empresa.telefonoGeneral}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese teléfono válido</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="COD_SE" className="col-form-label">Sector económico</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("COD_SE") && "is-invalid"}`}
                                placeholder="Sector económico"
                                name="COD_SE"
                                value={empresa.COD_SE}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese maximo 4 digitos</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Nom_Rl" className="col-form-label">Representante legal</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("Nom_Rl") && "is-invalid"}`}
                                placeholder="Representante legal"
                                name="Nom_Rl"
                                value={empresa.Nom_Rl}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese nombre valido</div>
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className="mb-3">
                            <label htmlFor="Nit_E" className="col-form-label">NIT empresa</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("Nit_E") && "is-invalid"}`}
                                placeholder="NIT"
                                name="Nit_E"
                                value={empresa.Nit_E}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Debe tener un - el Nit</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Eml_E" className="col-form-label">Correo</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("Eml_E") && "is-invalid"}`}
                                placeholder="Correo"
                                name="Eml_E"
                                value={empresa.Eml_E}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Formato invalido</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Val_E" className="col-form-label">Valor de cuota</label>
                            <input
                                type="number"
                                className={`form-control ${getError("Val_E") && "is-invalid"}`}
                                placeholder="Valor de cuota"
                                name="Val_E"
                                value={empresa.Val_E}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese solo numeros sin . ni ,</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="COD_AE" className="col-form-label">Actividad económica</label>
                            <input
                                type="text"
                                className={`form-control w-auto ${getError("COD_AE") && "is-invalid"}`}
                                placeholder="Actividad económica"
                                name="COD_AE"
                                value={empresa.COD_AE}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                            <div className="invalid-feedback">Ingrese maximo 4 digitos</div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="ID_DOC" className="col-form-label">Documento representante</label>
                            <div className="input-group mb-3">
                                <select name="ID_Doc" value={empresa.ID_Doc} className="form-select w-auto" onChange={handleInputChange}>
                                    <option selected disabled value="">
                                        Tipo de documento
                                    </option>
                                    {doc.map((item) => (
                                        <option key={item.ID_Doc} value={item.ID_Doc}>
                                            {item.N_TDoc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input type="number" placeholder="Número de documento" name="CC_Rl" value={empresa.CC_Rl} onChange={handleInputChange} onBlur={handleBlur} className={`form-control ${getError("CC_Rl") && "is-invalid"}`} aria-label="Text input with segmented dropdown button" />
                            <div className="invalid-feedback">Ingrese un número de documento válido</div>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Cancelar
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss={close} onClick={handleUpdateEmpresa}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
