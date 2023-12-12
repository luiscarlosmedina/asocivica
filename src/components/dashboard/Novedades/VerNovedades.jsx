import React, { useEffect, useState } from "react";
import TiempoTranscurrido from "./ComponentsFunction/TiempoTranscurrido";
import FormateadorFecha from "./ComponentsFunction/FormateadorFecha";
import { Link } from "react-router-dom";

export default function VerNovedades({ dataUpdated }) {
  const [tpnovedad, setTpnovedad] = useState([]);
  const [listempresa, setListempresa] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Nuevo estado para datos filtrados
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tipoNovedad, setTipoNovedad] = useState(null);
  const [ltempresa, setLtempresa] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleTipoNovedadChange = (e) => {
    const selectedValue = e.target.value;
    const selectedTipoNovedad = selectedValue === "" ? null : selectedValue;
    setTipoNovedad(selectedTipoNovedad);
  };

  const handleltempresaChange = (e) => {
    const selectedValue = e.target.value;
    const selectedltempresa = selectedValue === "todos" ? null : parseInt(selectedValue);
    setLtempresa(selectedltempresa);
  };


  const filterData = () => {
    // Filtra los datos según los criterios seleccionados
    let filtered = data;

    if (startDate) {
      filtered = filtered.filter((item) => new Date(item.Fe_Nov) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((item) => new Date(item.Fe_Nov) <= new Date(endDate));
    }

    if (tipoNovedad !== null && tipoNovedad !== "") {
      filtered = filtered.filter((item) => item.Nombre_Tn === tipoNovedad);
    }

    if (ltempresa !== null && ltempresa !== "todos") {
      filtered = filtered.filter((item) => item.id_e === ltempresa);
    }

    // Actualiza el estado con los datos filtrados
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost/api_sisinov/public/api/novedad`)
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    const fetchDataTpnoedad = () => {
      fetch("http://localhost/api_sisinov/public/api/tpnov")
        .then((response) => response.json())
        .then((tpnovedad) => {
          setTpnovedad(tpnovedad.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchDataListempresa = () => {
      fetch("https://localhost/api_sisinov/public/api/novedadempresa")
        .then((response) => response.json())
        .then((listempresa) => {
          setListempresa(listempresa.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
    fetchDataTpnoedad();
    fetchDataListempresa();
  }, []);

  useEffect(() => {
    filterData(); // Run filterData whenever the dependent variables change
  }, [startDate, endDate, tipoNovedad, ltempresa, data]);

  let novedadID;
  return (
    <>
      <div>
        <p className="t h2 mb-4  mt-3">Novedades</p>
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="id_e" className="form-label">
                Empresas
              </label>
              <select className="form-select" onChange={handleltempresaChange}>
                <option selected value="todos">
                  Todos
                </option>
                {listempresa.map((item) => (
                  <option key={item.id_e} value={item.id_e}>
                    {item.Nom_E}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="T_Nov" className="form-label">
                Tipo de novedad
              </label>
              <select className="form-select" onChange={handleTipoNovedadChange}>
                <option value="">Todos</option>
                {tpnovedad.map((item) => (
                  <option key={item.T_Nov} value={item.Nombre_Tn}>
                    {item.Nombre_Tn}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="startDate" className="form-label">Fecha de inicio</label>
              <input
                className="form-control"
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="endDate" className="form-label">Fecha de fin</label>
              <input
                className="form-control"
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className={`mb-1 mt-1 borsupd border-3 `}></div>
      <div className="row row-cols row-cols-md-3 g-1">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="card-group" key={item.ID_Nov}>
              <div className="card border rounded-0 p-2">
                <div className="card-header">
                  <p className="card-text">
                    <FormateadorFecha fechaDada={item.Fe_Nov} />
                  </p>
                  <h4 className="card-title">{item.Nombre_Tn}</h4>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item.Direccion}</h6>
                  <p className="card-text">{item.descrip_Tn}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    {item.Nombre}
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/consultar-novedades/${(novedadID =
                          item.ID_Nov)}`}
                      >
                        <button value={novedadID} className="btnfa btn btn-primary">
                          VER MAS
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    <TiempoTranscurrido fechaDada={item.Fe_Nov} />
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-primary" role="alert">
            No Hay datos disponibles
          </div>
        )}
      </div>
    </>
  );
}
