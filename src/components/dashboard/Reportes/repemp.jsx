import React, { useState, useEffect } from 'react';
import Conteoempresanov from './graphic/conteoempresanov';
import Contsedetpnov from './graphic/contsedetpnov';
import Conthistpnov from './graphic/conthistpnov';

export default function Repemp() {
  const [listempresa, setListempresa] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ltempresa, setLtempresa] = useState(null); // Inicializa como null

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleltempresaChange = (e) => {
    const selectedValue = e.target.value;
    const selectedltempresa = selectedValue === "todos" ? null : parseInt(selectedValue);
    setLtempresa(selectedltempresa);
  };

  const fetchDataListempresa = () => {
    fetch("http://localhost/api_proyecto.github.io/api.php?apicall=readnovedadempresa")
      .then((response) => response.json())
      .then((listempresa) => {
        setListempresa(listempresa.contenido);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDataListempresa();
  }, []);

  return (
    <div className='my-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h3>Reporte por empresas</h3>
        </div>
        <div>
          <button type="button" className="btn btn-outline-success"> Descargar reporte </button>
        </div>
      </div>
      <hr />
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
      <div className='container max-width'>
        <div className='row'>
          <Conteoempresanov startDate={startDate} endDate={endDate} ltempresa={ltempresa} />
          <Conthistpnov startDate={startDate} endDate={endDate} ltempresa={ltempresa} />
          {ltempresa !== null ? <Contsedetpnov startDate={startDate} endDate={endDate} ltempresa={ltempresa} /> : " "}
        </div>
      </div>
    </div>
  )
}
