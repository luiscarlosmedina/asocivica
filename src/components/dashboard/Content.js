import React, { useState } from 'react';
import "../../style/content.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Empresafr from './Empresa/Empresafr'
import EmpresaVer from "./Empresa/empresaVer"
import EmpresaVerDetalle from './Empresa/empresaVerDetalle';
import Empleadofr from './Empleado/Empleadofr'
import Novedades from './Novedades/Novedades'
import Reportes from './Reportes/Reportes'
import EmpleadominVer from './Empleado/content_empl';

function Content() {
    const [dataUpdated, setDataUpdated] = useState(false);
    const handleDataUpdate = () => {
      setDataUpdated(true);
    };
    return (
        <div className='contenido'>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='registrar-empresa' element={<Empresafr onDataUpdate={handleDataUpdate} />}/>
                <Route path='consultar-empresas' element={<EmpresaVer dataUpdated={dataUpdated} />} />
                <Route path='consultar-empresas/:id' element={< EmpresaVerDetalle/>} />
                <Route path='registrar-empleado' element={<Empleadofr />} />
                <Route path='registrar-novedades' element={<Novedades />} />
                <Route path='registrar-reportes' element={<Reportes/>} />
                <Route path='consultar-min-empleado' element={<EmpleadominVer dataUpdated={dataUpdated}/>} />
            </Routes>
        </div>
    )
}
export default Content
