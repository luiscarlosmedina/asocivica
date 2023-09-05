import React, { useEffect, useState, Fragment } from 'react';
import Encargados from './encargados';
import Editar_s from './editarsede';

export default function Sede({ id }) {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []); // Agregar dataUpdated como dependencia

    const fetchData = () => {
        fetch(`https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readsede&id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.contenido);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h3>Sedes y encargados</h3>
                </div>
                <div>
                    <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#sede" data-bs-whatever="@mdo">Agregar sede </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="sede" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <Editar_s id={id} tp={"1"}/>
                </div>
            </div>
            <hr className='pb-3' />
            <div className="container mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Direccion</th>
                            <th scope="col">Sector de vigilancia</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>Cargando...</tr>
                        ) : Array.isArray(data) ? (
                            data.map(item => (
                                <Fragment key={item.ID_S}>
                                    <tr>
                                        <td>{item.Dic_S}</td>
                                        <td>{item.Sec_V}</td>
                                        <td><button className='btn btn-link'>Editar</button></td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse-${item.ID_S}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse-${item.ID_S}`}
                                            >
                                                Ver encargados
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">
                                            <div className="accordion" id={`accordion-${item.ID_S}`}>
                                                <div className="accordion-item">

                                                    <div
                                                        id={`collapse-${item.ID_S}`}
                                                        className="accordion-collapse collapse"
                                                        data-bs-parent={`#accordion-${item.ID_S}`}
                                                    >
                                                        <div className="accordion-body">
                                                            <Encargados id={item.ID_S} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))) : (
                            <p>No existen datos registrados</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}