import React, { useState, useEffect } from 'react';
import { Tooltip, Treemap } from 'recharts';

export default function Conteonov({ startDate, endDate, tipoNovedad }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, tipoNovedad]);

    const fetchData = () => {
        // Construye la URL con los parámetros de fecha
        let apiUrl = `http://localhost/api_proyecto.github.io/api.php?apicall=repnov`;

        // Agrega el tipo de novedad si se proporciona
        if (startDate) {
            apiUrl += `&startdate=${startDate}`;
        }
        if (endDate) {
            apiUrl += `&enddate=${endDate}`;
        }
        // Agrega el tipo de novedad si se proporciona
        if (tipoNovedad) {
            apiUrl += `&tipoNovedad=${tipoNovedad}`;
        }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='border border-1 col-md-6'>
            <p>Novedades ocurridas</p>
            <Treemap
                width={600}
                height={300}
                data={data}
                nameKey="name"
                dataKey="value"
            >
                <Tooltip
                    content={({ payload }) => {
                        if (payload[0]) {
                            const { name, value } = payload[0].payload;
                            return (
                                <div className="custom-tooltip text-black bg-white border border-1 py-1 px-3">
                                    <p>{name} : {value}</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
            </Treemap>
        </div>
    );
}
