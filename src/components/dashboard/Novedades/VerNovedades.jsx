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
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readnovedad&id`)
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
  let idn = "";
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
                      <Link to={idn = item.ID_Novedad}><button value={idn} type="button" className="btn btn-primary">Ver mas</button></Link>
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
          <p>A simple primary alert—check it out!</p>
        )}
      </div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
