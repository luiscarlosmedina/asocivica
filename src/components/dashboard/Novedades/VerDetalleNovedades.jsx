import React, { useEffect, useState } from "react";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import figure from "../../../img/figura.jpg"
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
  new FormData
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      `http://localhost/api_proyecto.github.io/api.php?apicall=readnovedad&id=${novedadID}`
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
            <div class="container-fluid">
              <div class="row shadow-lg p-3 my-1 bg-body-tertiary rounded-4">
                <div class="col-md-6 ">
                  <div class="rounded-start px-3">
                    <div class="row">
                      <div class="col-12">
                        <blockquote class="blockquote">
                          <h3>{novedad.Tipo_Novedad}</h3>
                          <em class="p-0 m-0">Creada: <FormateadorFecha fechaDada={novedad.Fecha_Novedad} />  <TiempoTranscurrido fechaDada={novedad.Fecha_Novedad} /></em>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                          <em class="fs-5 pt-0 mt-0">Dirección: {novedad.Direccion}</em>
                        </figcaption>
                        <figcaption class="blockquote-footer">
                          <em class="fs-5">Descripción de novedad: {novedad.Descripcion_Novedad}</em>
                        </figcaption>
                      </div>
                      <div class="col-12">
                        <p class="fs-5 pt-0 mt-0 text-capitalize fw-lighter"> Motorizado: {novedad.Nombre_Completo_Empleado}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 border-start border-4 border-primary vh-auto" style={{ overflowY: 'auto', maxHeight: '520px' }}>
                  <div class="row">
                    <div class="col my-1">
                      <img src={figure} class="img-fluid w-100" alt="Imagen 1" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col my-1">
                      <img src={figure} class="img-fluid w-100" alt="Imagen 1" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col my-1">
                      <img src={figure} class="img-fluid w-100" alt="Imagen 1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
