import React, { useState, useEffect } from 'react';

export default function Editar({ id }) {
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
    })

    useEffect(() => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempresa&id=${id}`)
            .then(response => response.json())
            .then(data => {
                setEmpresa(data.contenido[0]); // Actualiza el estado del empleado con los datos obtenidos
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []); // Se ejecuta solo al montar el componente
    const handleUpdateEmpresa = () => {
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
                console.log(responseData);
                // Manejar la respuesta del servidor
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const handleInputChange = event => {
        const { name, value } = event.target;
        setEmpresa(prevsetEmpresa => ({ ...prevsetEmpresa, [name]: value }));
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
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
                            <label
                                htmlFor="Est_E"
                                className="col-form-label"
                            >
                                Estado
                            </label>
                            <select name="Est_E" className="form-select" value={empresa.Est_E} onChange={handleInputChange}>
                                <option value="0" >Activo</option>
                                <option value="1" >En estudio</option>
                                <option value="2" >Inactivo</option>
                                <option value="3" >Seleccione una opcion</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="Nom_E"
                                className="col-form-label"
                            >
                                Nombre empresa
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="Nom_E"
                                value={empresa.Nom_E}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="telefonoGeneral"
                                className="col-form-label"
                            >
                                Telefono
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="telefono"
                                name="telefonoGeneral"
                                value={empresa.telefonoGeneral}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="COD_SE"
                                className="col-form-label"
                            >
                                Sector economico
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sector economico"
                                name="COD_SE"
                                value={empresa.COD_SE}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Nom_Rl"
                                className="col-form-label"
                            >
                                Representante legal
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sector economico"
                                name="Nom_Rl"
                                value={empresa.Nom_Rl}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='input-group'>
                        <div className="mb-3">
                            <label
                                htmlFor="Nit_E"
                                className="col-form-label"
                            >
                                Nit
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nit"
                                name="Nit_E"
                                value={empresa.Nit_E}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Eml_E"
                                className="col-form-label"
                            >
                                Correo
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="correo"
                                name="Eml_E"
                                value={empresa.Eml_E}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="Val_E"
                                className="col-form-label"
                            >
                                Valor
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="valor de cuota"
                                name="Val_E"
                                value={empresa.Val_E}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="COD_AE"
                                className="col-form-label"
                            >
                                Actividad economica
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sector economico"
                                name="COD_AE"
                                value={empresa.COD_AE}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor="ID_DOC"
                                className="col-form-label"
                            >
                                Documento representante
                            </label>
                            <div className="input-group mb-3">
                                <select name="ID_Doc" value={empresa.ID_Doc} onChange={handleInputChange}>
                                    <option value="1" >TI</option>
                                    <option value="2" >CC</option>
                                    <option value="3" >PS</option>
                                </select>
                                <input type="number" placeholder="Numero documento" name="CC_Rl" value={empresa.CC_Rl} onChange={handleInputChange} className="form-control" aria-label="Text input with segmented dropdown button" />
                            </div>
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
                    <button type="button" className="btn btn-primary" onClick={handleUpdateEmpresa}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
