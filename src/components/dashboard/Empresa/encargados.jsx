import React, { useEffect, useState } from "react";

export default function Encargados({ id }) {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        fetch(`https://developersaurios.000webhostapp.com/api.php?apicall=readTelSede&id=${id}`)
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
                        <th scope="col">Telefono</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : Array.isArray(data) ? (
                        data.map(item => (
                            <tr key={item.id_e}>
                                <td>{item.N_En}</td>
                                <td>{item.tel}</td>
                            </tr>
                        ))
                    ) : (
                        <p>No hay datos disponibles</p>
                    )}
                </tbody>
            </table>
        </div>
    )
}
