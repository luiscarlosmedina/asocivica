import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Conteonovhora({ startDate, endDate, tipoNovedad }) {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, [startDate, endDate, tipoNovedad]);

    const fetchData = () => {
        const arreglo = {tipoNovedad: tipoNovedad, startDate:startDate, endDate:endDate}
        fetch(`http://localhost/api_sisinov/public/api/repnovhora`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(arreglo),
        })
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
