import React, { useEffect, useState } from "react";

export default function EmpleadominVer({ dataUpdated }) {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, [dataUpdated]); // Agregar dataUpdated como dependencia
  
    const fetchData = () => {
      fetch('https://developersaurios.000webhostapp.com/api.php?apicall=readminempleado')
        .then((response) => response.json())
        .then((data) => setData(data.contenido))
        .catch((error) => console.log(error));
    }; 
    return (
        <div className="consultar-container">
            <h2>Empleados</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Tipo de Documento</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {Array.isArray(data) ? (
                        data.map(item => (
                            <tr key={item.id_Em}>
                                <th scope="row">{item.ID_Doc}</th>
                                <td>{item.documento}</td>
                                <td>{item.N_Em}</td>
                                <td>{item.A_Em}</td>
                                <td>{item.Eml_Em}</td>
                                <td>{item.tel_Em}</td>
                                <td><button value={item.id_e} type="button" className="btn btn-primary">Ver mas</button></td>
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