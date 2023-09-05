import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EmpresaVer({ dataUpdated }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []); // Agregar dataUpdated como dependencia

    const fetchData = () => {
        fetch(`https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readempresa&id`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.contenido);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
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
                    {loading ? (
                        <tr>
                            <td className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </td>
                        </tr>
                    ) : Array.isArray(data) ? (
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
