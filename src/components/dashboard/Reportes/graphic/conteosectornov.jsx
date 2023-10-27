import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import ColorGenerator from '../Components/colorGenerate';

export default function Conteosectornov() {
    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=repnovsector`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const count = data.length; // Puedes ajustar la cantidad de colores que deseas
    const COLORS = ColorGenerator({ count });
    return (
        <div className='border border-1 col-md-6'>
            <p>Novedades por sector de vigilancia</p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((item, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>

            </ResponsiveContainer>
        </div>
    )
}
