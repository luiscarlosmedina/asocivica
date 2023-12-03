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
    ID_Nov: "",
    Fe_Nov: "",
    Nombre_Tn: "",
    descrip_Tn: "",
    Direccion: "",
    Des_Nov: "",
    Nombre: "",
  });

  useEffect(() => {
    fetchData();
  }, [novedadID]);

  const fetchData = () => {
    setLoading(true)
    fetch(
      `https://20.106.206.47/api_sisinov/public/api/novedad/${novedadID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNovedad(data.data);
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
          <div key={novedad.ID_Nov}>
            <div className="row justify-content-between">
              <div className="col-4">
                <p className="t h2 mb-4  mt-3">Novedad</p>
              </div>
              <div className="col-4 text-end p-2">
                {user.ID_rol !== 3 ? <button className="btnfa btn btn-primary" type="button">
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
            <div className={`mb-1 mt-1 borsupd border-3 `}></div>
            <div className="container-fluid">
              <div className="row shadow-lg p-3 my-1 bg-body-tertiary rounded-4">
                <div className="col-md-6 ">
                  <div className="rounded-start px-3">
                    <div className="row">
                      <div className="col-12">
                        <blockquote className="blockquote">
                          <h3>NV{novedad.ID_Nov} - {novedad.Nombre_Tn}</h3>
                          <em className="p-0 m-0">Creada: <FormateadorFecha fechaDada={novedad.Fe_Nov} />  <TiempoTranscurrido fechaDada={novedad.Fe_Nov} /></em>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5 pt-0 mt-0">Dirección: {novedad.Direccion}</em>
                        </figcaption>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5">Descripción de novedad: {novedad.Des_Nov}</em>
                        </figcaption>
                      </div>
                      <div className="col-12">
                        <p className="fs-5 pt-0 mt-0 text-capitalize fw-lighter"> Motorizado: {novedad.Nombre}</p>
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
