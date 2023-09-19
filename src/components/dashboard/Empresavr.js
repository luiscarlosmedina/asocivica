import React, { useState } from 'react';
import axios from 'axios';


const Vercompany = () => {
    const [Empresalist, setEmpresalist] = useState([])

    const getEmpresas = () => {
        axios.get("http://localhost:3001/empresa", {}).then((response) => {
            setEmpresalist(response.data);
        })
    }
    getEmpresas()
   
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">NIT</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                </tr>
            </thead>
            <tbody>
                {
                    Empresalist.map((val, key) => {
                        return <tr key = {val.Nit_E}>
                                    <th scope="row">{val.Nit_E}</th>
                                    <td>{val.Nom_E}</td>
                                    <td>{val.Eml_E}</td>
                                </tr>
                    })
                }
            </tbody>
        </table>
    )
};

export default Vercompany;