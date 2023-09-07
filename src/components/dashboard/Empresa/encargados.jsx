import React, { useEffect, useState } from "react";
import swal from 'sweetalert';

export default function Encargados({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readTelSede&id=${id}`);
            const result = await response.json();
            setData(result.contenido);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const deleteEnc = async (a) => {
        const dt = {
            ID_En: a,
            Est_en: '1'
        };

        try {
            const confirmation = await swal({
                title: '¿Estás seguro?',
                text: 'Una vez eliminado no podrá recuperar este dato',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });

            if (confirmation) {
                const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=deleteencargado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dt),
                });

                const responseData = await response.json();

                if (responseData) {
                    swal('Eliminado con éxito', { icon: 'success' });
                    // Realizar una nueva carga de datos después de la eliminación
                    fetchData();
                }
            } else {
                swal('Informacion a salvo')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando datos...</p>;
    }


    return (
        <div>
            <div>
                <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#sede" data-bs-whatever="@mdo">Agregar encargado </button>
            </div>
            {/* Modal */}
            <div className="modal fade" id="sede" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre encargado</th>
                        <th scope="col">Telefono 1</th>
                        <th scope="col">Telefono 2</th>
                        <th scope="col">Telefono 3</th>
                        <th scope="col"> Eliminar</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {loading ? (
                        <tr>Cargando...</tr>
                    ) : Array.isArray(data) ? (
                        data.map(item => (item.Est_en === "0" ?
                            <tr key={item.ID_En}>
                                <td>{item.N_En}</td>
                                <td>{item.telefono.split(',')[0]}</td>
                                <td>{item.telefono.split(',')[1]}</td>
                                <td>{item.telefono.split(',')[2]}</td>
                                <td><button className="btn btn-danger" onClick={() => deleteEnc(item.ID_En)}><i className="bi bi-trash3"></i></button></td>
                            </tr>
                            : <tr></tr>
                        ))
                    ) : (
                        <tr>No hay datos disponibles</tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
