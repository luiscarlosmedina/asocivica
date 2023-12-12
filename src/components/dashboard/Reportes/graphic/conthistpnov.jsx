import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';

export default function Conthistpnov({ startDate, endDate, ltempresa }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, ltempresa]);

    const fetchData = () => {
        const arreglo = {ltempresa:ltempresa, startDate: startDate, endDate: endDate};
        let apiUrl = `http://localhost/api_sisinov/public/api/rephistnov`;

        fetch(apiUrl,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(arreglo),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Handle the error (e.g., display an error message to the user)
            });
    };

    return (
        <div className='border border-1 col-md-12'>
            <p>Historico de novedad más ocurridas</p>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="MesAnio" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {Array.from(new Set(data.map(item => item.Nombre_nov))).map((nombreNovedad, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey="Novedad"
                            name={nombreNovedad}
                            data={data.filter(item => item.Nombre_nov === nombreNovedad)}
                            stroke="#8884d8"
                        />
                    ))}
                    {/* <Line type="monotone" dataKey="Novedad" key={data.nombre_nov} stroke="#8884d8" /> */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
