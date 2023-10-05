import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ContactoEmergencia from './contactoEmergencia';

export default function EmpleadoVerDetalles() {
    const { id } = useParams();
    const back = useNavigate();
    const loading = false;
    const usersPhoto = require.context("../../../assets/empleados", true)
    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h3>Datos Basicos</h3>
                        </div>
                        <div>
                            <button type="button" className="btn btn-link" onClick={() => back('/consultar-empleados')}>Salir</button>
                            <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editarempresa" data-bs-whatever="@mdo"> Editar </button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="card border border-0 col-md-2">
                            <img src={usersPhoto('./pablo.jpg')} className="card-img-top" alt="Image by rawpixel.com on Freepik" />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                        </div>
                        
                    </div>
                </div>

            )}
            {/* <ContactoEmergencia id={id} /> */}
        </div>
    )
}
