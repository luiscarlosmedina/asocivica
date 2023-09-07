import React, { useState } from 'react'
import swal from 'sweetalert';

export default function Editar_s({ id, sid=null }) {
    const [edit, setEdit] = useState(false)
    const [Dic_S, setDic_S] = useState("")
    const [Sec_V, setSec_V] = useState("")
    const [N_En, setN_En] = useState("")
    const [tel1, settel1] = useState("")
    const [tel2, settel2] = useState("")
    const [tel3, settel3] = useState("")

    const handleSubmit = (e) => {

        const sede = {
            Dic_S,
            Sec_V,
            id_e: id,
            N_En,
            Est_en: "0",
            tel1,
            tel2,
            tel3,
        };
        //http://localhost/api_proyecto.github.io/api.php?apicall=readempresas
        const url = !edit ? 'http://localhost/api_proyecto.github.io/api.php?apicall=createsede' : 'http://localhost/api_proyecto.github.io/api.php?apicall=updatesede'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sede),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    swal("Ocurrio un error!", edit ? 'Error al crear sede' : 'error al actualizar sede', "error");
                    // Manejar la respuesta del servidor
                } else {
                    setDic_S("");
                    setSec_V("");
                    setN_En("")
                    settel1("")
                    settel2("")
                    settel3("")
                    setEdit(true)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1200);
                    swal("Buen trabajo!", 'sede creada correctamente', "success");
                }
            })
            .catch(error => {
                swal("Buen trabajo!", 'Error en la solicitud', "success");
                console.log(error)
            });
    }
    return (

        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="agregarsede">{sid == null ? "Nueva sede" : "Editar sede" }</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="Direccion">Direccion de sede</label>
                                <input
                                    type="list"
                                    id="Direccion"
                                    className="form-control"
                                    value={Dic_S}
                                    onChange={e => setDic_S(e.target.value)}

                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Sector">Sector de vigilancia</label>
                                <select
                                    id="Sector"
                                    value={Sec_V}
                                    onChange={e => setSec_V(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="0">Seleccione un sector</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre encargado</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    value={N_En}
                                    onChange={e => setN_En(e.target.value)}

                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel1">Telefono encargado 1</label>
                                <input
                                    type="text"
                                    id="tel1"
                                    className="form-control"
                                    value={tel1}
                                    onChange={e => settel1(e.target.value)}

                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel2">Telefono encargado 2</label>
                                <input
                                    type="text"
                                    id="tel2"
                                    className="form-control"
                                    value={tel2}
                                    onChange={e => settel2(e.target.value)}

                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel3">Telefono encargado 3</label>
                                <input
                                    type="text"
                                    id="tel3"
                                    className="form-control"
                                    value={tel3}
                                    onChange={e => settel3(e.target.value)}

                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
