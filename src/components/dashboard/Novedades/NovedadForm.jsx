import React, { useEffect, useState } from "react";
import DateTimeDisplay from "./ComponentsFunction/DataTimeDisplay";
import { useParams, useNavigate } from "react-router-dom";

export default function NovedadForm() {
  const back = useNavigate();
  {
    /*para traer el select de tipo novedad*/
  }
  const [tpnovedad, setTpnovedad] = useState([]);

  useEffect(() => {
    fetchDataTpnoedad();
  }, []);

  const fetchDataTpnoedad = () => {
    fetch(
      "http://localhost/api_proyecto.github.io/api.php?apicall=readtpnovedad"
    )
      .then((response) => response.json())
      .then((tpnovedad) => {
        setTpnovedad(tpnovedad.contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  {
    /*para traer el select de sedes*/
  }
  const [empresa, setEmpresa] = useState([]);
  const [sede, setSede] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedSede, setSelectedSede] = useState("");

  useEffect(() => {
    fetchDataEmpresa();
    fetchDataSede();
  }, []);

  const fetchDataEmpresa = () => {
    fetch(
      "http://localhost/api_proyecto.github.io/api.php?apicall=readnovedadempresa"
    )
      .then((response) => response.json())
      .then((empresa) => {
        setEmpresa(empresa.contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDataSede = (id_e) => {
    fetch(
      `http://localhost/api_proyecto.github.io/api.php?apicall=readnovedadsede&id=${id_e}`
    )
      .then((response) => response.json())
      .then((sede) => {
        setSede(sede.contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    // Llama a fetchDataSede con el ID de la empresa seleccionada
    if (selectedEmpresa) {
      fetchDataSede(selectedEmpresa);
    } else {
      setSede([]);
    }
  }, [selectedEmpresa]);

  const handleEmpresaChange = (e) => {
    const newValue = e.target.value;
    setSelectedEmpresa(newValue);
    setSelectedSede(""); // Reiniciar el valor de la sede cuando cambia la empresa
  };

  {
    /*para traer el select de empleado*/
  }
  const [empleado, setEmpleado] = useState([]);

  useEffect(() => {
    fetchDataEmpleado();
  }, []);

  const fetchDataEmpleado = () => {
    fetch(
      "http://localhost/api_proyecto.github.io/api.php?apicall=readnovedadempleado"
    )
      .then((response) => response.json())
      .then((empleado) => {
        setEmpleado(empleado.contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  {
    /*funcion para enviar a api*/
  }
  const [T_Nov, setT_Nov] = useState(null);
  const [Dic_Nov, setDic_Nov] = useState(null);
  const [Des_Nov, setDes_Nov] = useState(null);
  const [id_evi, setId_evi] = useState(null);
  const [id_em, setId_em] = useState(null);
  const [ID_S, setID_S] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const novedad = {
    T_Nov,
    Dic_Nov,
    Des_Nov,
    id_evi,
    id_em,
    ID_S,
  };
  console.log(novedad);

  fetch(
    "http://localhost/api_proyecto.github.io/api.php?apicall=createnovedad",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novedad),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        setMessage("Error al crear la novedad");
      } else {
        setMessage("novedad creada correctamente");
        setT_Nov("");
        setDic_Nov("");
        setDes_Nov("");
        setId_em("");
        setId_em("");
        setID_S("");
      }
    })
    .catch((error) => {
      setMessage("Error en la solicitud");
      console.log(error);
    });

  const [showSelects, setShowSelects] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Cambiar estado del checkbox

    if (isChecked) {
      // Si el checkbox está activo:
      setDic_Nov("");
      setID_S(null); // Cambiar el valor de Dic_Nov a null
    } else {
      // Si el checkbox está inactivo:
      setDic_Nov(null);
      setID_S(setSelectedSede) // Restaurar el valor de Dic_Nov a ""
    }

    setShowSelects(!showSelects); // Mostrar/ocultar los selects
  };

  const handleInputChange2 = (e) => {
    const { value } = e.target;
    setDic_Nov(value);
  };

  const handleInputsChange = (nombreCampo, value) => {
    switch (nombreCampo) {
      case "T_Nov":
        setT_Nov(value);
        break;
      case "Dic_Nov":
        setDic_Nov(value);
      case "Des_Nov":
        setDes_Nov(value);
        break;
      case "id_evi":
        setId_evi(value);
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
  console.log(selectedSede);

  return (
    <>
      <div className="shadow-lg p-0 mb-5 bg-body-tertiary rounded">
        <div className="m-1 border-bottom border-primary border-3 row justify-content-between">
          <div className="col-6">
            <p className="text-primary h1 ms-2 mt-4">Registrar Novedad</p>
          </div>
          <div
            class="col-4 alert alert-primary mb-1 mt-2 me-2"
            style={{ width: 18 + "rem" }}
          >
            <DateTimeDisplay />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          class="row g-2 needs-validation justify-content-between"
          noValidate
        >
          <div className="col ms-4 ps-3">
            <label for="T_Nov" class="form-label">
              Eliga el tipo de noveddad
            </label>
            <select
              class="form-select"
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
                  {item.Tipo_Novedad}
                </option>
              ))}
            </select>
            <div class="valid-feedback">Correcto</div>
            <div class="invalid-feedback">Por favor seleccione un elemento</div>
          </div>
          <div class="col">
            <label for="Dic_Nov" class="form-label">
              Dirección:
            </label>
            <input
              type="text"
              class="form-control"
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
          <div className="form-check ms-5 ps-3">
            <label>
              <input
                className="form-check-input p-2 border border-dark"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              Seleccione si la Novedad ocurrio en una sede registrada
            </label>
          </div>
          {showSelects && (
            <div className="row g-2 justify-content-between">
              <div className="col ms-4 ps-3">
                <label for="selectempresa" className="form-label">
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
                <div class="valid-feedback">Correcto</div>
                <div class="invalid-feedback">
                  Por favor seleccione un elemento
                </div>
              </div>
              {selectedEmpresa && (
                <div className="col ms-4 p-3">
                  <label for="selectsede" className="form-label row">
                    Seleccione una sede:
                  </label>
                  <select
                    className="row justify-content-between form-select"
                    id="selectsede"
                    value={selectedSede}
                    onChange={(e) => {
                      setSelectedSede(e.target.value); // Actualiza el valor en el objeto novedad
                    }}
                    required
                  >
                    <option selected value="">
                      Seleccionar sede
                    </option>
                    {sede.map((item) => (
                      <option
                        key={item.ID_S}
                        value={item.ID_S}
                        onChange={(e) =>
                          handleInputsChange("ID_S", e.target.value)
                        }
                      >
                        {item.Dic_S}
                      </option>
                    ))}
                  </select>
                  <div class="valid-feedback">Correcto</div>
                  <div class="invalid-feedback">
                    Por favor seleccione un elemento
                  </div>
                </div>
              )}
            </div>
          )}
          <div class=" mt-3">
            <label for="descripcion" class="form-label ms-5">
              Describe el acontecimiento
            </label>
            <textarea
              style={{ width: 90 + "%" }}
              class="form-control m-auto"
              id="descripcion"
              rows="3"
              required
            ></textarea>
            <div class="valid-feedback ms-5">Correcto</div>
            <div class="invalid-feedback ms-5">agrege una descripcion</div>
          </div>
          <div className="row g-2 justify-content-between">
            <div class="col-4 ms-5">
              <label for="link" class="form-label">
                agrega la url de la carpeta evidencia en drive
              </label>
              <input type="text" class="form-control" id="link" required />
              <div class="invalid-feedback">
                pon la url de la carpeta de evidecia
              </div>
            </div>
            <div className="col ms-4 ps-3">
              <label for="selectempleado" class="form-label">
                Eliga el tipo de noveddad
              </label>
              <select class="form-select" id="selectempleado" required>
                <option selected disabled value="">
                  Selecione...
                </option>
                {empleado.map((item) => (
                  <option key={item.id_em} value={item.id_em}>
                    {item.Nombre_Completo_Empleado}
                  </option>
                ))}
              </select>
              <div class="valid-feedback">Correcto</div>
              <div class="invalid-feedback">
                Por favor seleccione un elemento
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-end">
            <button
              type="button"
              class="btn btn-secondary me-md-2 mb-4"
              onClick={() => back("/*")}
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary mb-4 me-4">
              Agregar
            </button>
          </div>
        </form>
      </div>

      <script>
        {
          // Example starter JavaScript for disabling form submissions if there are invalid fields
          (() => {
            "use strict";

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll(".needs-validation");

            // Loop over them and prevent submission
            Array.from(forms).forEach((form) => {
              form.addEventListener(
                "submit",
                (event) => {
                  if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                  }

                  form.classList.add("was-validated");
                },
                false
              );
            });
          })()
        }
      </script>
    </>
  );
}
