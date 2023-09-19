import React, { useEffect, useState } from "react";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import { Link } from "react-router-dom";

export default function VerNovedades({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []); // Agregar dataUpdated como dependencia

  const fetchData = () => {
    fetch(
      `https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readnovedad&id`
    )
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
  let novedadID;
  return (
    <>
      <div>
        <h3>Novedades</h3>
      </div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div class="row row-cols row-cols-md-3 g-1">
        {loading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        ) : Array.isArray(data) ? (
          data.map((item) => (
            <div class="card-group">
              <div class="card border rounded-0 p-2" key={item.ID_Novedad}>
                <div class="card-header">
                  <p class="card-text">
                    <FormateadorFecha fechaDada={item.Fecha_Novedad} />
                  </p>
                  <h4 class="card-title">{item.Tipo_Novedad}</h4>
                </div>
                <div class="card-body">
                  <h6 class="card-title">{item.Direccion}</h6>
                  <p class="card-text">{item.Descripcion_Novedad}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    {item.Nombre_Completo_Empleado}
                  </li>
                  <li class="list-group-item">
                    <div className="d-flex justify-content-between">
                      <button class="btn btn-primary" type="submit">
                        Editar
                      </button>
                      <Link
                        to={`/consultar-novedades/${(novedadID =
                          item.ID_Novedad)}`}
                      >
                        <button
                          value={novedadID}
                          type="button"
                          className="btn btn-primary"
                        >
                          Ver mas
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
                <div class="card-footer">
                  <small class="text-body-secondary">
                    <TiempoTranscurrido fechaDada={item.Fecha_Novedad} />
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div class="alert alert-primary" role="alert">
            No Hay datos disponibles
          </div>
        )}
      </div>
    </>
  );
}
