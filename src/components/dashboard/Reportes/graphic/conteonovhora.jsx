import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Conteonovhora({ startDate, endDate, tipoNovedad }) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, [startDate, endDate, tipoNovedad]);

    const fetchData = () => {
        let apiUrl = `https://20.106.206.47/api_proyecto.github.io/api.php?apicall=repnovhora`;

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
        <div className='border border-1 col-md-12 h-50'>
            <p>Novedades por hora</p>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" padding={{ left: 20, right: 20, }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area dataKey="novedades" type="monotone" fill="#B0CCFF" stroke="#8884d8"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
