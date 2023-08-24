import React from 'react'
import "../../style/options.css"
import { Link } from 'react-router-dom'

const Options = () => {
      return (
        <ul className="navbar-nav d-flex justify-content-end flex-grow-1 pe-4" id='menu'>
            <li className="nav-link active op">
                <i className="bi bi-house"></i><Link to={"inicio"} className='ms-2 op  text-white'>Inicio</Link>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-journal-bookmark"></i> <span className='ms-2'>Gestion de empresas</span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to={"consultar-empresas"} className="dropdown-item" >Ver empresas</Link></li>
                    <li><Link to={"registrar-empresa"} className="dropdown-item" >Agregar empresas</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-pencil-square"></i> <span className='ms-2'>Gestion de novedades</span>
                </a>
                <ul className="dropdown-menu">
                    
                    <li><Link to={"consultar-novedades"} className="dropdown-item" >Ver Novedades</Link></li>
                    <li><Link to={"registrar-novedades"} className="dropdown-item" >Agregar Novedades</Link></li>
                 
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-table"></i> <span className='ms-2'>Gestion de empleados</span>
                </a>
                <ul className="dropdown-menu">
                    <li><Link to={"consultar-min-empleado"} className="dropdown-item" >Ver empleados</Link></li>
                    <li><Link to={"registrar-empleado"} className="dropdown-item" >Agregar empleado</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bar-chart"></i> <span className='ms-2'>Gestion de reportes</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="inicio">Ver reportes</a></li>
                    <li><Link to={"registrar-reportes"} className="dropdown-item" >Agregar reportes</Link></li>
                </ul>
            </li>
        </ul>
    )
}

export default Options
