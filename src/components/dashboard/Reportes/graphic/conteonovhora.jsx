import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Conteonovhora() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=repnovhora`)
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
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}
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
                        <Line dataKey="novedades" type="monotone" fill="#B0CCFF" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
