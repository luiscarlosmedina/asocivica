import React, { useState } from "react";
import "../../style/content.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Empleadofr from "./Empleado/Reg_emple/Empleadofr";
import EmpleadoVer from "./Empleado/empleadoVer";
import EmpleadoVerDetalles from "./Empleado/empleadoVerDetalles";
import EmpresaVer from "./Empresa/empresaVer";
import EmpresaVerDetalle from "./Empresa/empresaVerDetalle";
import Verificaempresa from "./Empresa/verificaempresa";
//import Empleadofr_ps from './Empleado/Empleadofr_ps'
import NovedadForm from "./Novedades/NovedadForm";
import VerDetalleNovedad from "./Novedades/VerDetalleNovedades";
import VerNovedades from "./Novedades/VerNovedades";
import Reportes from "./Reportes/Reportes";

function Content() {
    const [dataUpdated, setDataUpdated] = useState(false);
    const handleDataUpdate = () => {
      setDataUpdated(true);
    };
    return (
        <div className='contenido'>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='registrar-empresa' element={<Verificaempresa />}/>
                <Route path='consultar-empresas' element={<EmpresaVer dataUpdated={dataUpdated} />} />
                <Route path='consultar-empresas/:empresaid' element={< EmpresaVerDetalle />} />
                <Route path='registrar-empleado' element={<Empleadofr/>} />
                <Route path='consultar-empleados' element={<EmpleadoVer dataUpdated={dataUpdated}/>} />
                <Route path='consultar-empleados/:empleadoid' element={<EmpleadoVerDetalles />} />
                <Route path='registrar-novedades' element={<NovedadForm onDataUpdate={handleDataUpdate}/>} />
                <Route path='consultar-novedades' element={<VerNovedades dataUpdated={dataUpdated} />} />
                <Route path='consultar-novedades/:novedadID' element={<VerDetalleNovedad />} />
                <Route path='registrar-reportes' element={<Reportes/>} />
            </Routes>
        </div>
    )
}
export default Content;
