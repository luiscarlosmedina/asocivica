import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DateTimeDisplay from "./ComponentsFunction/DataTimeDisplay";
import { useAuth } from "../../../autenticate";

export default function NovedadForm({ onDataUpdate }) {
  //para traer el select de tipo novedad
  const [tpnovedad, setTpnovedad] = useState([]);
  const [showSelects, setShowSelects] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    fetchDataTpnoedad();
  }, []);

  //traer tipo de novedades
  const fetchDataTpnoedad = () => {
    fetch(
      "https://20.106.206.47/api_sisinov/public/api/tpnov"
    )
      .then((response) => response.json())
      .then((tpnovedad) => {
        setTpnovedad(tpnovedad.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //para traer el select de sedes
  const [empresa, setEmpresa] = useState([]);
  const [sede, setSede] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedSede, setSelectedSede] = useState("");

  useEffect(() => {
    fetchDataEmpresa();
    fetchDataSede();
  }, []);

  //traer listado de empresas
  const fetchDataEmpresa = () => {
    fetch(
      "https://20.106.206.47/api_sisinov/public/api/novedadempresa"
    )
      .then((response) => response.json())
      .then((empresa) => {
        setEmpresa(empresa.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //traer listado de sedes correspondientes a la empresa seleccionada
  const fetchDataSede = (id_e) => {
    fetch(
      `https://20.106.206.47/api_sisinov/public/api/novedadsede/${id_e}`
    )
      .then((response) => response.json())
      .then((sede) => {
        setSede(sede.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (selectedEmpresa) {
      fetchDataSede(selectedEmpresa);
    } else {
      setSede([]);
    }
  }, [selectedEmpresa]);

  //para traer el select de empleado*/
  const [empleado, setEmpleado] = useState([]);

  useEffect(() => {
    fetchDataEmpleado();
  }, []);

  const fetchDataEmpleado = () => {
    fetch(
      "https://20.106.206.47/api_sisinov/public/api/novedadempleados"
    )
      .then((response) => response.json())
      .then((empleado) => {
        setEmpleado(empleado.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //configurar fecha
  const fecha = new Date()
  const hoy =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

  //funcion para enviar a api
  const [T_Nov, setT_Nov] = useState(null);
  const [Dic_Nov, setDic_Nov] = useState(null);
  const [Des_Nov, setDes_Nov] = useState(null);
  const [adjuntos, setAdjuntos] = useState(null);
  const [id_em, setId_em] = useState(null);
  const [ID_S, setID_S] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos obligatorios no estén vacíos
    if (!T_Nov || (!Dic_Nov && !ID_S) || !Des_Nov || !id_em) {
      swal("Error!", "Todos los campos son obligatorios. Por favor, complete todos los campos antes de enviar la novedad.", "error");
      return;
    }

    // datos para crear la novedad
    const novedad = {
      T_Nov,
      Dic_Nov,
      Des_Nov,
      id_em,
      ID_S,
      Fe_Nov : hoy,
      adjuntos,
    };
    console.log(novedad);
    //crear la novedad
    fetch("https://20.106.206.47/api_sisinov/public/api/novedad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novedad),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          swal("Error!", "No se agregó la novedad. Revise que todos los campos estén completos e inténtelo nuevamente", "error");
        } else {
          swal("¡Buen trabajo!", "Creado con éxito", "success");
          setT_Nov("");
          setDic_Nov("");
          setDes_Nov("");
          setId_em("");
          setAdjuntos("");
          setCaracteresRestantes(255);
          setID_S(null);
          setIsChecked(false);
          setShowSelects(false);
          setSelectedEmpresa("");
          setSelectedSede("");
          setMessage("");
          onDataUpdate();
        }
      })
      .catch(error => {
        swal("Error!", "No se agregó la novedad. Revise que todos los campos estén completos e inténtelo nuevamente", "error");
      });
  };

  const [tipoNovedad, setTipoNovedad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleTipoNovedadChange = (e) => {
    const textRegex = /^[A-Za-z\s]+$/;
    const value = e.target.value;

    if (value.trim() === "") {
      setMessage("Campo obligatorio, no puede estar vacío");
    } else if (!textRegex.test(value)) {
      setMessage("Ingrese solo texto válido");
    } else {
      setMessage("");
    }

    setTipoNovedad(value);
  };

  const handleDescripcionChange = (e) => {
    const textRegex = /^[A-Za-z\s]+$/;
    const value = e.target.value;

    if (value.trim() === "") {
      setMessage("Campo obligatorio, no puede estar vacío");
    } else if (!textRegex.test(value)) {
      setMessage("Ingrese solo texto válido");
    } else {
      setMessage("");
    }

    setDescripcion(value);
  };

  //crear tipo de novedad nuevo
  const handleTPnovedad = (e) => {
    e.preventDefault();
    // Verifica los campos individuales
    if (!tipoNovedad || !descripcion) {
      swal("Error!", "Todos los campos deben estar completos", "error");
      return;
    }

    // Verifica el mensaje global
    if (message) {
      swal("Error!", "Corrija los errores en el formulario", "error");
      return;
    }

    const newNovedad = {
      "Nombre_Tn": tipoNovedad,
      "descrip_Tn": descripcion,
    }

    fetch(
      "https://20.106.206.47/api_sisinov/public/api/tpnov",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNovedad),
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          swal("Error!", "La novedad ya existe", "error");
        } else {
          swal("Buen trabajo!", "creado con exito", "success");
          setTipoNovedad("");
          setDescripcion("");
          fetchDataTpnoedad();
        }
      })
      .catch(error => {
        swal("Error!", "Error al crear el tipo de novedad, intente de nuevo", "error");
      });
  };

  //resetear el formulario
  const handleCancelar = () => {
    setT_Nov("");
    setDic_Nov("");
    setDes_Nov("");
    setId_em("");
    setID_S(null);
    setAdjuntos("");
    setCaracteresRestantes(255);
    setIsChecked(false);
    setShowSelects(false);
    setSelectedEmpresa("");
    setSelectedSede("");
    setMessage("");
  };

  //cambiar a seleccionar empresa
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setDic_Nov("");
      setID_S(null);
    } else {
      setDic_Nov(null);
      setID_S(selectedSede)
    }

    setShowSelects(!showSelects);
  };

  const handleInputChange2 = (e) => {
    const { value } = e.target;
    setDic_Nov(value);
  };

  //generar condiciones en cada campo del formulario
  const [caracteresRestantes, setCaracteresRestantes] = useState(255);
  const handleInputsChange = (nombreCampo, value) => {
    switch (nombreCampo) {
      case "T_Nov":
        setT_Nov(value);
        break;
      case "Dic_Nov":
        setDic_Nov(value);
        break;
      case "Des_Nov":
        setDes_Nov(value);
        const caracteresUsados = value.length;
        const restantes = 255 - caracteresUsados;
        setCaracteresRestantes(restantes);
        break;
      case "adjuntos":
        setAdjuntos(value);
        break;
      case "id_em":
        setId_em(value);
        break;
      case "ID_S":
        setID_S(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="shadow-lg p-0 mb-3 bg-body-tertiary rounded">
        <div className="m-1 row justify-content-between">
          <div className="col-6">
            <p className="t h2 mb-4  mt-3">Registrar Novedad</p>
          </div>
          <div
            className="col-4 alert alert-primary mb-1 mt-2 me-2"
            style={{ width: 18 + "rem" }}
          >
            <DateTimeDisplay />
          </div>
        </div>
        <div className={`mb-1 mt-1 borsupd border-3 `}></div>
        <form
          onSubmit={handleSubmit}
          className="needs-validation justify-content-between"
          noValidate
        >
          <div className="row m-auto">
            <div className="col mx-4 p-2">
              <label for="T_Nov" className="form-label">
                Eliga el tipo de novedad
              </label>
              <div className="form-group d-flex align-items-center">
                <select
                  className="form-select me-2"
                  id="T_Nov"
                  value={T_Nov || ""}
                  onChange={(e) => handleInputsChange("T_Nov", e.target.value)}
                  required
                >
                  <option selected disabled value="">
                    Selecione...
                  </option>
                  {tpnovedad.map((item) => (
                    <option key={item.T_Nov} value={item.T_Nov}>
                      {item.Nombre_Tn}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addtpnovedad">
                  <i class="bi bi-plus" style={{ fontSize: '1rem' }}></i>
                </button>
              </div>
              {/* modal agregar tipo de novedad -> migrar a un nuevo componente */}
              <div class="modal fade" id="addtpnovedad" tabindex="-1" aria-labelledby="addtpnovedadLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="addtpnovedadLabel">Nuevo tipo de novedad</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div className="mb-3">
                        <label htmlFor="tipoNovedad" className="form-label">Tipo de Novedad</label>
                        <input
                          type="text"
                          className={`form-control ${message ? 'is-invalid' : ''}`}
                          id="tipoNovedad"
                          value={tipoNovedad}
                          onChange={handleTipoNovedadChange}
                          required
                        />
                        <div className="invalid-feedback">
                          {message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea
                          className={`form-control ${message ? 'is-invalid' : ''}`}
                          id="descripcion"
                          value={descripcion}
                          onChange={handleDescripcionChange}
                          required
                        ></textarea>
                        <div className="invalid-feedback">
                          {message}
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-primary" onClick={handleTPnovedad}>Guardar</button>
                    </div>
                  </div>
                </div>
              </div>
              {/*fin modal agregar tipo de novedad */}
              <div className="valid-feedback">Correcto</div>
              <div className="invalid-feedback">Por favor seleccione un elemento</div>
            </div>
            <div className="col mx-4 p-2">
              <label for="selectempleado" class="form-label">
                Motorizado que reporto
              </label>
              <select class="form-select" id="selectempleado" value={id_em} onChange={(e) => handleInputsChange("id_em", e.target.value)} required>
                <option selected disabled value="">
                  Selecione...
                </option>
                {empleado.map((item) => (
                  <option key={item.id_em} value={item.id_em}>
                    {item.Nombre}
                  </option>
                ))}
              </select>
              <div class="valid-feedback">Correcto</div>
              <div class="invalid-feedback">
                Por favor seleccione un elemento
              </div>
            </div>
          </div>
          <div className="form-check my-3 ms-5 ps-3">
            <label>
              <strong>Seleccione si la Novedad ocurrio en una sede registrada</strong>
              <input
                className="form-check-input p-2 border border-dark"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
            </label>
          </div>
          <div className="col mx-4 p-2">
            <label for="Dic_Nov" className="form-label">
              Dirección:
            </label>
            <input
              type="text"
              className="form-control"
              id="Dic_Nov"
              name="Dic_Nov"
              value={Dic_Nov}
              onChange={handleInputChange2}
              placeholder={isChecked ? "Campo no necesario" : ""}
              disabled={isChecked}
              required
            />
            <div class="valid-feedback">Correcto</div>
            <div class="invalid-feedback">Llene campo direccion</div>
          </div>
          {showSelects && (
            <div className="row mx-4">
              <div className="col ps-3">
                <label htmlFor="selectempresa" className="form-label">
                  Seleccione una empresa:
                </label>
                <select
                  value={selectedEmpresa}
                  onChange={(e) => setSelectedEmpresa(e.target.value)}
                  className="form-select"
                  id="selectempresa"
                  required
                >
                  <option selected disabled value="">
                    Seleccionar empresa
                  </option>
                  {empresa.map((item) => (
                    <option key={item.id_e} value={item.id_e}>
                      {item.Nom_E}
                    </option>
                  ))}
                </select>
                <div className="valid-feedback">Correcto</div>
                <div className="invalid-feedback">
                  Por favor seleccione un elemento
                </div>
              </div>
              {selectedEmpresa && (
                <div className="col ps-3">
                  <label htmlFor="selectsede" className="form-label row">
                    Seleccione una sede:
                  </label>
                  <select
                    className="form-select"
                    id="selectsede"
                    value={selectedSede}
                    onChange={(e) => {
                      setSelectedSede(e.target.value);
                      handleInputsChange("ID_S", e.target.value);
                    }}
                    required
                  >
                    <option selected value="">
                      Seleccionar sede
                    </option>
                    {sede.map((item) => (
                      <option key={item.ID_S} value={item.ID_S}>
                        {item.Dic_S}
                      </option>
                    ))}
                  </select>
                  <div className="valid-feedback">Correcto</div>
                  <div className="invalid-feedback">
                    Por favor seleccione un elemento
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="mt-3 mx-4 p-2">
            <label htmlFor="descripcion" className="form-label">
              Describe el acontecimiento
            </label>
            <textarea
              className="form-control m-auto"
              id="descripcion"
              value={Des_Nov}
              onChange={(e) => handleInputsChange("Des_Nov", e.target.value)}
              rows="3"
              maxLength="255" // Limita el número de caracteres
              required
            ></textarea>
            <div className="valid-feedback ms-5">Correcto</div>
            <div className="invalid-feedback ms-5">Agrega una descripción</div>
            <div className="ms-1 text-muted">
              Caracteres restantes: {caracteresRestantes}
            </div>
          </div>
          <div className="row m-auto">
            <div class="col-4 mx-4">
              <label for="link" class="form-label">
                Agrega la evidencia
              </label>
              <input type="text" class="form-control" id="link" value={adjuntos} placeholder="URL donde se encuentran las evidencias" onChange={(e) => handleInputsChange("adjuntos", e.target.value)} />
              <div class="invalid-feedback">
                pon la url de la carpeta de evidecia
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-end">
            <button
              type="button"
              class="btn btn-secondary me-md-2 mb-4"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
            {user.ID_rol !== 3 ?<button type="submit" class="btn btn-primary mb-4 me-4">
              Registrar novedad
            </button> : <p>Su rol no tiene acceso a esta funcionalidad</p>}
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
