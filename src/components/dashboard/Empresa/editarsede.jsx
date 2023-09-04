import React, { useState } from 'react'
import swal from 'sweetalert';

export default function Editar_s({ id, tp }) {
    const [Dic_S, setDic_S] = useState("")
    const [Sec_V, setSec_V] = useState("")

    const handleSubmit = (e) => {

        const sede = {
            Dic_S,
            Sec_V,
            id_e: id,
        };
        console.log(sede);
        //http://localhost/api_proyecto.github.io/api.php?apicall=readempresas
        fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createsede', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sede),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    swal("Ocurrio un error!", 'Error al crear sede', "error");
                    // Manejar la respuesta del servidor
                } else {
                    setDic_S("");
                    setSec_V("");
                    setTimeout(function(){
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

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="agregarsede">{tp == "1" ? "Nueva sede" : "Editar sede"}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className="modal-body">
                        <form className='d-flex justify-content-around'>
                            <div className="mb-3">
                                <label htmlFor="Direccion">Direccion de sede</label>
                                <input
                                    type="text"
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Crear</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
