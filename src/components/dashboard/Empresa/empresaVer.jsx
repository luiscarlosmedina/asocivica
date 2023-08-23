import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function EmpresaVer({ dataUpdated}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [dataUpdated]); // Agregar dataUpdated como dependencia

    const fetchData = () => {
        fetch('http://developersaurios.000webhostapp.com/api.php?apicall=readempresas')
            .then((response) => response.json())
            .then((data) => setData(data.contenido))
            .catch((error) => console.log(error));
    };
    let id = "";
    return (
        <div className="consultar-container">
            <h3>Empresas</h3>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nit</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Representante</th>
                        <th scope="col">T Doc</th>
                        <th scope="col">N° Documento</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Detalles</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {Array.isArray(data) ? (
                        data.map(item => (
                            <tr key={item.id_e}>
                                <th scope="row">{item.Nit_E}</th>
                                <td>{item.Nom_E}</td>
                                <td>{item.Eml_E}</td>
                                <td>{item.telefonoGeneral}</td>
                                <td>{item.Nom_Rl}</td>
                                <td>{item.N_TDoc}</td>
                                <td>{item.CC_Rl}</td>
                                <td>{item.Est_E === "0" ? "Activo" : "Inactivo"}</td>
                                <td><Link to={id = item.id_e}><button value={id} type="button" className="btn btn-primary">Ver mas</button></Link></td>
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
