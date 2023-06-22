import React from 'react'
import "../../style/app.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Empresafr from './Empresafr'
import Vercompany from './Empresavr'

const Content = () => {
    return (
        <div className='contenido'>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path='registrar-empresa' element={<Empresafr />} />
                <Route path='ver-empresa' element={<Vercompany />} />
            </Routes>
        </div>
    )
}

export default Content
