import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import Evidencia from "./ComponentsFunction/evidencia";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../autenticate";

export default function VerDetalleNovedad() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { novedadID } = useParams();
  const back = useNavigate();
  const { user, token } = useAuth();

  const [novedad, setNovedad] = useState({
    ID_Nov: "",
    Fe_Nov: "",
    T_Nov: "",
    id_em: "",
    ID_S: "",
    Nombre_Tn: "",
    descrip_Tn: "",
    Direccion: "",
    Des_Nov: "",
    Nombre: "",
  });

  const [editedNovedad, setEditedNovedad] = useState({
    nToken: token,
    ID_Nov: "",
    Des_Nov: "",
    id_em: "",
    T_Nov: "",
  });

  const [motorizadoOptions, setMotorizadoOptions] = useState([]);
  const [tipoNovedadOptions, setTipoNovedadOptions] = useState([]);

  useEffect(() => {
    fetchData();
    fetchMotorizadoOptions();
    fetchTpNovOptions();
  }, [novedadID]);

  const fetchData = () => {
    setLoading(true);
    fetch(`http://localhost/api_sisinov/public/api/novedad/${novedadID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nToken:token})
    })
      .then((response) => response.json())
      .then((data) => {
        setNovedad(data.data);
        setEditedNovedad({
          ID_Nov: novedadID,
          Des_Nov: data.data.Des_Nov,
          id_em: data.data.id_em,
          T_Nov: data.data.T_Nov,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const fetchMotorizadoOptions = () => {
    fetch("http://localhost/api_sisinov/public/api/novedadempleados", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nToken:token})
    })
      .then((response) => response.json())
      .then((data) => {
        setMotorizadoOptions(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTpNovOptions = () => {
    fetch("http://localhost/api_sisinov/public/api/tpnovs", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nToken:token})
    })
      .then((response) => response.json())
      .then((data) => {
        setTipoNovedadOptions(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //funcion para guardar la edicion
  const handleSaveChanges = () => {
    // Validar que la descripción no esté vacía y no contenga scripts maliciosos
    if (editedNovedad.Des_Nov.trim() === "") {
      swal("Error!", "La descripción no puede estar vacía.", "error");
      return;
    }

    // Validar que la descripción no contenga scripts
    const scriptPattern = /<script.*?>.*?<\/script>/i;
    if (scriptPattern.test(editedNovedad.Des_Nov)) {
      swal("Error", "La descripción tiene un formato no valido.", "error");
      return;
    }
    fetch(`http://localhost/api_sisinov/public/api/novedad`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedNovedad)
    })  
      .then(response => response.json())
      .then(responseData => {
        if (responseData) {
          swal("¡Buen trabajo!", 'Actualización exitosa', "success");
          setEditing(false);
          setEditedNovedad({
            ID_Nov: "",
            Des_Nov: "",
            id_em: "",
            T_Nov: "",
          });
          fetchData();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        swal("Ocurrió un error!", 'Inténtalo más tarde', "error");
      });
  };


  const handleCancelEdit = () => {
    // Cancelar la edición y restaurar los valores originales
    setEditedNovedad({
      Des_Nov: novedad.Des_Nov,
      id_em: novedad.id_em,
      T_Nov: novedad.T_Nov,
    });

    // Desactivar el modo de edición
    setEditing(false);
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
                <p className="t h2 mb-4 mt-3">Novedad</p>
              </div>
              <div className="col-4 text-end p-2">
                {user.ID_rol !== 3 && (
                  editing ? "" :
                    <button
                      className="btnfa btn btn-primary"
                      type="button"
                      onClick={() => setEditing(true)}
                    >
                      Editar
                    </button>
                )}
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
                          <h3>
                            {editing ? (
                              <select
                                value={editedNovedad.T_Nov}
                                className="form-select"
                                onChange={(e) =>
                                  setEditedNovedad({
                                    ...editedNovedad,
                                    T_Nov: e.target.value,
                                  })
                                }
                              >
                                {/* Mapear opciones de Tipo de Novedad */}
                                {tipoNovedadOptions.map((option) => (
                                  <option key={option.T_Nov} value={option.T_Nov}>
                                    {option.Nombre_Tn}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              `NV${novedad.ID_Nov} - ${novedad.Nombre_Tn}`
                            )}
                          </h3>
                          <em className="p-0 m-0">
                            Creada:{" "}
                            <FormateadorFecha fechaDada={novedad.Fe_Nov} />{" "}
                            <TiempoTranscurrido fechaDada={novedad.Fe_Nov} />
                          </em>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5 pt-0 mt-0">
                            Dirección:{novedad.Direccion}
                          </em>
                        </figcaption>
                        <figcaption className="blockquote-footer">
                          <em className="fs-5">
                            Descripción de novedad:{" "}
                            {editing ? (
                              <div>
                                <textarea
                                  value={editedNovedad.Des_Nov}
                                  className="form-control mb-0"
                                  maxLength={255}
                                  onChange={(e) =>
                                    setEditedNovedad({
                                      ...editedNovedad,
                                      Des_Nov: e.target.value,
                                    })
                                  }
                                />
                                <small className="text-muted mt-0">
                                  Caracteres restantes: {255 - editedNovedad.Des_Nov.length}
                                </small>
                              </div>
                            ) : (
                              novedad.Des_Nov
                            )}
                          </em>
                        </figcaption>
                      </div>
                      <div className="col-12">
                        <p className="fs-5 pt-0 mt-0 text-capitalize fw-lighter">
                          Motorizado:{" "}
                          {editing ? (
                            <select
                              value={editedNovedad.id_em}
                              className="form-select"
                              onChange={(e) =>
                                setEditedNovedad({
                                  ...editedNovedad,
                                  id_em: e.target.value,
                                })
                              }
                            >
                              {/* Mapear opciones de Motorizado */}
                              {motorizadoOptions.map((option) => (
                                <option key={option.id_em} value={option.id_em}>
                                  {option.Nombre}
                                </option>
                              ))}
                            </select>
                          ) : (
                            novedad.Nombre
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 border-start border-4 border-primary vh-auto"
                  style={{ overflowY: "auto", maxHeight: "520px" }}
                >
                  <Evidencia id={novedadID} />
                </div>
              </div>
              {editing && (
                <div className="row mt-3">
                  <div className="col-12">
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSaveChanges}
                    >
                      Guardar Cambios
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
