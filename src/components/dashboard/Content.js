import React, { useState } from 'react';
import "../../style/content.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Empresafr from './Empresa/Empresafr'
import EmpresaVer from "./Empresa/empresaVer"
import Empleadofr from './Empleado/Empleadofr'
import Novedades from './Novedades/Novedades'
import Reportes from './Reportes/Reportes'

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
                <Route path='consultar-empresas' element={<EmpresaVer dataUpdated={dataUpdated}/>} />
                <Route path='registrar-empleado' element={<Empleadofr />} />
                <Route path='registrar-novedades' element={<Novedades />} />
                <Route path='registrar-reportes' element={<Reportes/>} />
            </Routes>
        </div>
    )
}
export default Content
