import React, { useState, useEffect } from 'react';
import { Tooltip, Treemap, ResponsiveContainer } from 'recharts';

export default function Conteoempresanov({ startDate, endDate, ltempresa }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, ltempresa]);

    const fetchData = () => {
        // Construye la URL con los parámetros de fecha
        let apiUrl = ``;
        if(ltempresa === null){
            apiUrl = `https://20.106.206.47/api_proyecto.github.io/api.php?apicall=repempresanov`;
        }else {
            apiUrl = `https://20.106.206.47/api_proyecto.github.io/api.php?apicall=repsedenov`;
        }

        // Agrega el tipo de novedad si se proporciona
        if (startDate) {
            apiUrl += `&startdate=${startDate}`;
        }
        if (endDate) {
            apiUrl += `&enddate=${endDate}`;
        }
        // Agrega el tipo de novedad si se proporciona
        if (ltempresa) {
            apiUrl += `&ltempresa=${ltempresa}`;
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
        <div className='border border-1 col-md-12'>
            <p>Novedades ocurridas por {ltempresa === null ? "empresas" : "sedes"}</p>
            <ResponsiveContainer width="100%" height={400} className={"my-3"}>
                <Treemap
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
            </ResponsiveContainer>
        </div>
    )
}
