import React from 'react'
import "../../style/app.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Empresafr from './Empresa/Empresafr'
import Empleadofr from './Empleado/Empleadofr'
import Novedades from './Novedades/Novedades'
import Reportes from './Reportes/Reportes'

const Content = () => {
    return (
        <div className='contenido'>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='registrar-empresa' element={<Empresafr />} />
                <Route path='registrar-empleado' element={<Empleadofr />} />
                <Route path='registrar-novedades' element={<Novedades />} />
                <Route path='registrar-reportes' element={<Reportes/>} />
            </Routes>
        </div>
    )
}

export default Content
