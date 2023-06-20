import React from 'react'
import "../../style/app.css"
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Empresafr from './Empresafr'

const Content = () => {
    return (
        <div className='contenido'>
            <Routes>
                <Route path='inicio' element={<Home />} />
                <Route path='registrar-empresa' element={<Empresafr />} />
            </Routes>
        </div>
    )
}

export default Content
