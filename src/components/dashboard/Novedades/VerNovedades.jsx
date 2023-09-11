import React, { useEffect, useState } from "react"; 

export default function VerNovedades({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []); // Agregar dataUpdated como dependencia

  const fetchData = () => {
    fetch("http://localhost/api_proyecto/api.php?apicall=readnovedad&id")
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
  return /*(
    <>
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      ) : Array.isArray(data) ? (
        data.map((item) => (
          <div key={item.ID_Novedad}>
            <div class="card" style={{ width: "18rem" }}>
              <div class="card-body">
                <h5 class="card-title">Fecha: {item.Fecha_Novedad}</h5>
                <p class="card-text">{item.Descripcion_Novedad}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Direccion: {item.Direccion}</li>
                <li class="list-group-item">
                  Tipo de novedad: {item.Tipo_Novedad}
                </li>
                <li class="list-group-item">
                  Descripcion de novedad: {item.Descripcion_Novedad}
                </li>
                <li class="list-group-item">
                  Nombre del empleado: {item.Nombre_Completo_Empleado}
                </li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">
                  ver más
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>A simple primary alert—check it out!</p>
      )}
    </>
  );*/
  (
    <div className="consultar-container">
        <h3>Novedad</h3>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">tipo de novedad</th>
                    <th scope="col">direccion</th>
                    <th scope="col">descripcion</th>
                    <th scope="col">nombre completo</th>
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
                        <tr key={item.ID_Novedad}>
                            <th scope="row">{item.Fecha_Novedad}</th>
                            <td>{item.Tipo_Novedad}</td>
                            <td>{item.Direccion}</td>
                            <td>{item.Descripcion_Novedad}</td>
                            <td>{item.Nombre_Completo_Empleado}</td>
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
