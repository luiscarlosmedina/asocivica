import React, { useEffect, useState } from "react";

export default function Encargados({id}) {
    const [data, setData] = useState("");

    const handlePostData = async () => {

        const response = await fetch(
            "https://developersaurios.000webhostapp.com/api.php?apicall=readTelSedeId",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }
        );

        const data = await response.json();
        setData(data.contenido);
    };

    useEffect(() => {
        handlePostData();
    }, [id]);
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
                {Array.isArray(data) ? (
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
