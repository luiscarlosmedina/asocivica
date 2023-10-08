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
                                <p className="card-text">estado {/*item.tel_em*/}</p>
                                <p className="card-text">rol {/*item.id_rol*/}</p>
                                <p className="card-text">rh {/*item.id_rh*/}</p>
                            </div>
                        </div>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col-md-11'>
                                    <div className='d-flex col justify-content-between align-items-center text-bs-gray fs-5 fw-semibold p-0 m-0'>
                                        <p>nombre y apellido {/*item.n_em + " " + item.a_em*/}</p>
                                        <p>tipo y num doc {/*item.id_doc + " " + item.documento*/}</p>
                                    </div>
                                    <hr className='p-0 m-0' />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-md-6 '>
                                    <p>correo</p>
                                    <p>direccion y barrio</p>
                                    <p>telefono</p>
                                    <p>contrato</p>
                                    <p>licencia de conduccion</p>
                                </div>
                                <div className='col-md-6 '>
                                    <p>libreta militar</p>
                                    <p>pension</p>
                                    <p>cesantias</p>
                                    <p>eps</p>
                                    <p>arl</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            )}
            <div>
                <ContactoEmergencia id={id} />
            </div>
        </div>
    )
}
