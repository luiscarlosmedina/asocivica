import React, { useEffect, useState } from 'react';

export default function Evidencia({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        fetch(`http://localhost/api_sisinov/public/api/evidencia/${id}`)
            .then((response) => response.json())
            .then((responseData) => {
                // Verificar si 'responseData' y 'responseData.contenido' están definidos
                if (responseData && responseData.data) {
                    setData(responseData);
                } else {
                    setData([]); // Establecer un valor predeterminado o manejar de otra manera
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {/* Map over data.contenido */}
                    {data.data.map((item) => (
                        <div className="row" key={item.id_evi}>
                            <div className="col my-1">
                                <a href={item.adjunto} target="_blank" rel="evidencia">Acceder a evidencia</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
