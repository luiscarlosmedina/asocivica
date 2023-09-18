import React, { useEffect, useState } from "react";
import DateTimeDisplay from "./ComponentsFunction/DataTimeDisplay";

export default function NovedadForm() {
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
  const [showSelects, setShowSelects] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [placeholderD, setPlaceholderD] = useState("");

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

  const handleCheckboxChange = () => {
    setShowSelects(!showSelects);
    if (!showSelects) {
      setDireccion("");
    }
    if (!showSelects) {
      setPlaceholderD("ya no es necesario llenar este campo");
    } else {
      setPlaceholderD("");
    }
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
        <form class="row g-2 needs-validation justify-content-between" noValidate>
          <div className="col ms-4 ps-3">
            <label for="select1" class="form-label">
              Eliga el tipo de noveddad
            </label>
            <select class="form-select" id="select1" required>
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
            <label for="direccion" class="form-label">
              Dirección:
            </label>
            <input
              type="text"
              class="form-control"
              id="direccion"
              value={direccion}
              placeholder={placeholderD}
              onChange={(e) => setDireccion(e.target.value)}
              disabled={showSelects}
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
                checked={showSelects}
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
                    onChange={(e) => setSelectedSede(e.target.value)}
                    required
                  >
                    <option selected disabled value="">
                      Seleccionar sede
                    </option>
                    {sede.map((item) => (
                      <option key={item.ID_S} value={item.ID_S}>
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
            <input
              type="text"
              class="form-control"
              id="link"
              required
            />
            <div class="invalid-feedback">pon la url de la carpeta de evidecia</div>
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
            <div class="invalid-feedback">Por favor seleccione un elemento</div>
          </div>
          </div>
          <button class="btn btn-primary" type="submit">
            Submit form
          </button>
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
