import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Novedades from "./Novedades";

export default function VerNovedades({ dataUpdated }) {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, [dataUpdated]); // Agregar dataUpdated como dependencia
  
    const fetchData = () => {
      fetch('api-novedades')
        .then((response) => response.json())
        .then((data) => setData(data.contenido))
        .catch((error) => console.log(error));
    }; 
    return (
        <div className="consultar-container">
            <h3>Novedades registradas</h3>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">Tipo de novedad</th>
                        <th scope="col">Radioperador</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {Array.isArray(data) ? (
                        data.map(item => (
                            <tr key={item.Fe_Nov}>
                                <th scope="row">{item.id_em}</th>
                                <td>{item.T_Nov}</td>
                                <td>{item.id_rol}</td>
                                <td>{item.Est_E === "0" ? "Activo" : "Inactivo"}</td>
                                <td><button value={item.ID_Nov} type="button" className="btn btn-primary"></button></td>
                            </tr>
                        ))
                    ) : (
                        <p>No hay datos disponibles</p>
                    )}
                </tbody>
            </table>
        </div>
    )
}
