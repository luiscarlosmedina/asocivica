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
        let apiUrl = `http://localhost/api_proyecto.github.io/api.php?apicall=rephistnov`;

        if (startDate) {
            apiUrl += `&startdate=${startDate}`;
        }
        if (endDate) {
            apiUrl += `&enddate=${endDate}`;
        }
        if (ltempresa) {
            apiUrl += `&ltempresa=${ltempresa}`;
        }

        fetch(apiUrl)
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
    let nombre_nov = data.Nombre_nov

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
