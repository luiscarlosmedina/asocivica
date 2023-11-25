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
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Handle the error (e.g., display an error message to the user)
            });
    };

    return (
        <div className='border border-1 col-md-12'>
            <p>Historico de novedades ocurridas</p>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Novedad" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
