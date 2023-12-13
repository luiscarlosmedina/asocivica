import React, { useState, useEffect } from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { useAuth } from '../../../../autenticate';

export default function Contsedetpnov({ startDate, endDate, ltempresa }) {
    const [data, setData] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, ltempresa]);

    const fetchData = () => {
        const arreglo = {nToken:token, ltempresa:ltempresa, startDate: startDate, endDate: endDate}
        fetch(`http://localhost/api_sisinov/public/api/repsedetpnov`,{
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

    // Función para dividir el array en filas de dos elementos cada una
    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    };

    return (
        <div className='border border-1 col-md-12'>
            <p>Tipo de novedad ocurrido en sede</p>
            <div className='row justify-content-center'>
                {chunkArray(Object.entries(data), 2).map((row, rowIndex) => (
                    <div key={rowIndex} className='row'>
                        {row.map(([sede, novedades], colIndex) => (
                            <div key={colIndex} className={`col-md-${data.length < 2 ? '12' : '6'} border border-1 border-primary rounded p-1 my-1`}>
                                <ResponsiveContainer width="100%" height={500} className={"p-1"}>
                                    <RadarChart
                                        cx={300}
                                        cy={250}
                                        outerRadius={170}
                                        width={500}
                                        height={500}
                                        data={novedades}
                                    >
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="name" />
                                        <PolarRadiusAxis />
                                        <Radar
                                            name={sede}
                                            dataKey="cantidad"
                                            stroke="#fa8131"
                                            fill="#eaa86b"
                                            fillOpacity={0.3}
                                        />
                                        <Tooltip />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
