import React, { useState, useEffect, useRef } from 'react';
import Conteoempresanov from './graphic/conteoempresanov';
import Contsedetpnov from './graphic/contsedetpnov';
import Conthistpnov from './graphic/conthistpnov';
import generatePDF, { Margin } from 'react-to-pdf';
import jsPDF from 'jspdf';
import logoA from "./../../../img/logosf.png"
import logoB from "./../../../img/SINOVlg.png"
import { useAuth } from '../../../autenticate';

export default function Repemp() {
  const [listempresa, setListempresa] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ltempresa, setLtempresa] = useState(null);
  const { user, token } = useAuth();

  const componentRef = useRef();

  const handleDownloadReport = () => {
    const pdf = new jsPDF();

    // Llama a la función generadora del PDF desde react-to-pdf
    generatePDF(componentRef, {
      filename: 'reporte.pdf',
      orientation: 'landscape',
      page: { margin: Margin.MEDIUM },
      jsPDF: pdf,
    });
  };

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
    fetch("https://api.siemnov.com/api/novedadempresa", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nToken:token})
    })
      .then((response) => response.json())
      .then((listempresa) => {
        setListempresa(listempresa.data);
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
          <p className="t h2 mb-4  mt-3">Reporte por empresa</p>
        </div>
        <div>
          <button type="button" className="btn btn-outline-success" onClick={handleDownloadReport}> Descargar reporte </button>
        </div>
      </div>
      <div className={`mb-1 mt-1 borsupd border-3 `}></div>
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
      <div className='container max-width' ref={componentRef}>
        <div className="header d-flex align-items-center justify-content-between mb-3" >
          <div className="logo-left">
            <img src={logoA} alt="Logo Asocivica" style={{ width: '170px', height: 'auto' }} />
          </div>
          <div className="text-center">
            <h5>ASOCIACION CIVICA CENTRO COMERCIAL PALOQUEMAO</h5>
            <p>NIT: 860.056.799-7</p>
            <p>Desde 1977</p>
          </div>
          <div className="logo-right">
            <img src={logoB} alt="Logo SINOV" style={{ width: '170px', height: 'auto' }} />
          </div>
        </div>
        <hr className="border border-danger border-2 opacity-50" />
        {user.ID_rol !== 3 ? <div className='row'>
          <Conteoempresanov startDate={startDate} endDate={endDate} ltempresa={ltempresa} />
          <Conthistpnov startDate={startDate} endDate={endDate} ltempresa={ltempresa} />
          {ltempresa !== null ? <Contsedetpnov startDate={startDate} endDate={endDate} ltempresa={ltempresa} /> : " "}
        </div> : <p>Su rol no tiene acceso a esta funcionalidad</p>}
      </div>
    </div>
  );
}
