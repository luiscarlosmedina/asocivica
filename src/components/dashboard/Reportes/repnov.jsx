import React, { useState, useEffect } from 'react';
import Conteonov from './graphic/conteonov';
import Conteosectornov from './graphic/conteosectornov';
import Conteonovdia from './graphic/conteonovdia';
import Conteonovhora from './graphic/conteonovhora';

export default function Repnov() {
    const [tpnovedad, setTpnovedad] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tipoNovedad, setTipoNovedad] = useState(null); // Inicializa como null

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

    useEffect(() => {
        fetchDataTpnoedad();
    }, []);

    const fetchDataTpnoedad = () => {
        fetch("http://localhost/api_proyecto.github.io/api.php?apicall=readtpnovedad")
            .then((response) => response.json())
            .then((tpnovedad) => {
                setTpnovedad(tpnovedad.contenido);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="my-3">
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h3>Reporte de la operación</h3>
                </div>
                <div>
                    <button type="button" className="btn btn-outline-success"> Descargar reporte </button>
                </div>
            </div>
            <hr />
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
                                {item.Tipo_Novedad}
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
                <div className='row h-50'>
                    <Conteonov startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad} />
                    <Conteosectornov startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad}/>
                </div>
                <div className='row'>
                    <Conteonovdia startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad}/>
                    <Conteonovhora startDate={startDate} endDate={endDate} tipoNovedad={tipoNovedad}/>
                </div>
            </div>
        </div>
    );
}
