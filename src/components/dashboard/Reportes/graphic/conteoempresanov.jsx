import React, { useState, useEffect } from 'react';
import { Tooltip, Treemap, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../../../autenticate';

export default function Conteoempresanov({ startDate, endDate, ltempresa }) {
    const [data, setData] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, ltempresa]);

    const fetchData = () => {
        const arreglo = {nToken:token,ltempresa:ltempresa, startDate: startDate, endDate:endDate} 
        let apiUrl = ``;
        if(ltempresa === null){
            apiUrl = `http://localhost/api_sisinov/public/api/repempresanov`;
        }else {
            apiUrl = `http://localhost/api_sisinov/public/api/repsedenov`;
        }

        fetch(apiUrl,{
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
