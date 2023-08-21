import React, { useEffect, useState, Fragment} from 'react';
import Encargados from './encargados';

export default function Sede({ id }) {
    const [data, setData] = useState("");

    const handlePostData = async () => {

        const response = await fetch(
            "https://developersaurios.000webhostapp.com/api.php?apicall=readidsede",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }
        );

        const data = await response.json();
        setData(data.contenido);
    };

    useEffect(() => {
        handlePostData();
    }, [id]);
    return (
        <div className="container mt-4">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Direccion</th>
                        <th scope="col">Sector de vigilancia</th>
                        <th scope="col">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(data) ? (
                    data.map(item => (
                        <Fragment key={item.ID_S}>
                            <tr>
                                <th scope="row">{item.Dic_S}</th>
                                <td>{item.Sec_V}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${item.ID_S}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse-${item.ID_S}`}
                                    >
                                        Ver encargados
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3">
                                    <div className="accordion" id={`accordion-${item.ID_S}`}>
                                        <div className="accordion-item">
                                        
                                            <div
                                                id={`collapse-${item.ID_S}`}
                                                className="accordion-collapse collapse"
                                                data-bs-parent={`#accordion-${item.ID_S}`}
                                            >
                                                <div className="accordion-body">
                                                    <Encargados id={item.ID_S} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    ))):(
                        <p>No existen datos registrados</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}