import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Conteonovdia({ startDate, endDate, tipoNovedad }) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, [startDate, endDate, tipoNovedad]);

    const fetchData = () => {
        let apiUrl = `http://20.106.206.47/api_proyecto.github.io/api.php?apicall=repnovdia`;

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
            <p>Novedades por día</p>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="4 4" />
                        <Bar dataKey="novedades" fill="#A2CADF" background={{ fill: '#eee' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}