import React, { useEffect, useState } from "react";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import Evidencia from "./ComponentsFunction/evidencia";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../autenticate";

export default function VerDetalleNovedad() {
  const [loading, setLoading] = useState(true);
  const { novedadID } = useParams();
  const back = useNavigate();
  const { user } = useAuth()
  const [novedad, setNovedad] = useState({
    ID_Novedad: "",
    Fecha_Novedad: "",
    Tipo_Novedad: "",
    Descripcion_Tipo: "",
    Direccion: "",
    Descripcion_Novedad: "",
    Nombre_Completo_Empleado: "",
  });

  useEffect(() => {
    fetchData();
  }, [novedadID]);

  const fetchData = () => {
    setLoading(true)
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
                {user.ID_rol !== 3 ? <button className="btn btn-outline-primary" type="button">
                  Editar
                </button> : ""}
                <button
                  type="button"
                  className="btn-close m-3"
                  aria-label="Close"
                  onClick={() => back("/consultar-novedades")}
                ></button>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row shadow-lg p-3 my-1 bg-body-tertiary rounded-4">
                <div className="col-md-6 ">
                  <div className="rounded-start px-3">
                    <div className="row">
                      <div className="col-12">
                        <blockquote className="blockquote">
                          <h3>{novedad.Tipo_Novedad}</h3>
                          <em className="p-0 m-0">Creada: <FormateadorFecha fechaDada={novedad.Fecha_Novedad} />  <TiempoTranscurrido fechaDada={novedad.Fecha_Novedad} /></em>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5 pt-0 mt-0">Dirección: {novedad.Direccion}</em>
                        </figcaption>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5">Descripción de novedad: {novedad.Descripcion_Novedad}</em>
                        </figcaption>
                      </div>
                      <div className="col-12">
                        <p className="fs-5 pt-0 mt-0 text-capitalize fw-lighter"> Motorizado: {novedad.Nombre_Completo_Empleado}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 border-start border-4 border-primary vh-auto" style={{ overflowY: 'auto', maxHeight: '520px' }}>
                  <Evidencia id={novedadID} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
