import React, { useEffect, useState } from "react";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import figura from "../../../img/figura.jpg";
import { useParams, useNavigate } from "react-router-dom";

export default function VerDetalleNovedad() {
  const [loading, setLoading] = useState(true);
  const { novedadID } = useParams();
  const back = useNavigate();
  const [novedad, setNovedad] = useState({
    ID_Novedad: "",
    Fecha_Novedad: "",
    Tipo_Novedad: "",
    Descripcion_Tipo: "",
    Direccion: "",
    Descripcion_Novedad: "",
    Adjunto_Evidencia: "",
    Nombre_Completo_Empleado: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      `https://20.106.206.47/api_proyecto.github.io/api.php?apicall=readnovedad&id=${novedadID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNovedad(data.contenido[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
          <div key={novedad.ID_Novedad}>
          <div className="row justify-content-between">
            <div className="col-4 p-3">
              <h3>Novedad</h3>
            </div>
            <div className="col-4 text-end p-2">
              <button class="btn btn-outline-primary" type="button">
                Editar
              </button>
              <button
                type="button"
                class="btn-close m-3"
                aria-label="Close"
                onClick={() => back("/consultar-novedades")}
              ></button>
            </div>
          </div>
          <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded-4">
            <div className="border-bottom border-start border-3 rounded-start border-primary ps-3">
              <div className="row justify-content-between">
                <div className="col-6">
                  <blockquote class="blockquote">
                    <h1>{novedad.Tipo_Novedad}</h1>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    <em className="fs-5">Descripción de novedad: {novedad.Descripcion_Tipo}</em>
                  </figcaption>
                  <figcaption class="blockquote-footer">
                    <em className="fs-5 pt-0 mt-0">Dirección: {novedad.Direccion}</em>
                  </figcaption>
                </div>
                <div className="container col-6 text-end me-0">
                  <blockquote class="blockquote p-0 m-0">
                    <h1 className="p-0 m-0">Creada: <TiempoTranscurrido fechaDada={novedad.Fecha_Novedad}/></h1>
                  </blockquote>
                  <figcaption class="blockquote-footer p-0 m-0">
                    <em className="fs-5 pt-0 mt-0">Fecha de creación: <FormateadorFecha fechaDada={novedad.Fecha_Novedad}/></em>
                  </figcaption>
                  <p className="fs-5 pt-0 mt-0 text-capitalize fw-lighter">by: {novedad.Nombre_Completo_Empleado}</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-between">
              <div class="col-4 w-50 p-3 overflow-scroll">
                <figure class="figure">
                  <img
                    src={figura}
                    class="figure-img img-fluid rounded"
                    alt="..."
                  />
                  <figcaption class="figure-caption">Direccion: {novedad.Direccion}</figcaption>
                </figure>
              </div>
              <div className="col-6 mt-3">
                <p className="fs-5">{novedad.Descripcion_Novedad}</p>
              </div>
            </div>
            <div><p><a class="link-opacity-100-hover fs-3" href={novedad.Adjunto_Evidencia}>Evidencia: {novedad.Adjunto_Evidencia}</a></p></div> 
          </div>
        </div>        
      )}
    </div>
    </>
  );
}
