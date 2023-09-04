import React, { useEffect, useState } from "react";

export default function Encargados({ id }) {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readTelSede&id=${id}`)
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
    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre encargado</th>
                        <th scope="col">Telefono 1</th>
                        <th scope="col">Telefono 2</th>
                        <th scope="col">Telefono 3</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {loading ? (
                        <tr>Cargando...</tr>
                    ) : Array.isArray(data) ? (
                        data.map(item => (
                            <tr key={item.ID_En}>
                                <td>{item.N_En}</td>
                                <td>{item.telefono.split(',')[0]}</td>
                                <td>{item.telefono.split(',')[1]}</td>
                                <td>{item.telefono.split(',')[2]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>No hay datos disponibles</tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
