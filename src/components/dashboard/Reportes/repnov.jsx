import React, { useState, useEffect, useRef } from 'react';
import Conteonov from './graphic/conteonov';
import Conteosectornov from './graphic/conteosectornov';
import Conteonovdia from './graphic/conteonovdia';
import Conteonovhora from './graphic/conteonovhora';
import generatePDF, { Margin } from 'react-to-pdf';
import jsPDF from 'jspdf';
import logoA from "./../../../img/logosf.png"
import logoB from "./../../../img/SINOVlg.png"
import { useAuth } from '../../../autenticate';

export default function Repnov() {
    const [tpnovedad, setTpnovedad] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tipoNovedad, setTipoNovedad] = useState(null); // Inicializa como null
    const { user } = useAuth();

    const handleDownloadReport = () => {
        const pdf = new jsPDF();

        // Add a custom header
        const header = () => {
            pdf.setFont('Arial', 'normal', 12);
            pdf.text('Este es un texto de ejemplo', 10, 10, 'center');
        };

        // Add a custom footer
        const footer = () => {
            pdf.setFont('Arial', 'normal', 12);
            pdf.text(`Página ${pdf.pageNumber} de ${pdf.pageCount}`, 10, 10, 'center');
        };
        generatePDF(componentRef, {
            filename: 'reporte.pdf',
            orientation: 'landscape',
            page: { margin: Margin.MEDIUM },
            pageFooter: footer(),
            pageHeader: header(),
            jsPDF: pdf,
        });
        footer()
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleTipoNovedadChange = (e) => {
        const selectedValue = e.target.value;
        const selectedTipoNovedad = selectedValue === "todos" ? null : parseInt(selectedValue);
        setTipoNovedad(selectedTipoNovedad);
    };

    const componentRef = useRef();

    useEffect(() => {
        fetchDataTpnoedad();
    }, []);

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

    return (
        <div className="my-3">
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <p className="t h2 mb-4  mt-3">Reporte de la operación</p>
                </div>
                <div>
                    <button type="button" className="btn btn-outline-success" onClick={handleDownloadReport}> Descargar reporte </button>
                </div>
            </div>
            <div className={`mb-1 mt-1 borsupd border-3 `}></div>
            <div className="row">
                <div className="mb-3 col-md-4">
                    <label htmlFor="T_Nov" className="form-label">
                        Tipo de novedad
                    </label>
                    <select className="form-select" onChange={handleTipoNovedadChange}>
                        <option selected value="todos">
                            Todos
                        </option>
                        {tpnovedad.map((item) => (
                            <option key={item.T_Nov} value={item.T_Nov}>
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
            {user.ID_rol !== 3 ? <div className='container max-width' ref={componentRef}>
                <div className="d-flex align-items-center justify-content-between p-3 mb-3">
                    <div className="logo-left">
                        {/* Agrega tu logo izquierdo aquí */}
                        <img src={logoA} alt="Logo Asocivica" style={{ width: '170px', height: 'auto' }} />
                    </div>
                    <div className="text-center">
                        <h5>ASOCIACION CIVICA CENTRO COMERCIAL PALOQUEMAO</h5>
                        <p>NIT: 860.056.799-7</p>
                        <p>Desde 1977</p>
                    </div>
                    <div className="logo-right">
                        {/* Agrega tu logo derecho aquí */}
                        <img src={logoB} alt="Logo SINOV" style={{ width: '170px', height: 'auto' }} />
                    </div>
                </div>
                <hr className="border border-danger border-2 opacity-50" />
                <div className='row h-50'>
                    <Conteonov startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad} />
                    <Conteosectornov startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad} />
                </div>
                <div className='row'>
                    <Conteonovdia startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad} />
                    <Conteonovhora startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad} />
                </div>
            </div> : <p>Su rol no tiene acceso a esta funcionalidad</p>}
        </div>
    );
}
