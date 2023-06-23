import React from 'react'
import "../../style/options.css"
import { Link } from 'react-router-dom'

const Options = () => {
    return (
        <ul className="navbar-nav d-flex justify-content-end flex-grow-1 pe-4" id='menu'>
            <li className="nav-item dropdown">
                <a className="nav-link active op" aria-current="page" href={'inicio'} >
                <i class="bi bi-house"></i><Link to={"inicio"} className='ms-2 op  text-white'>Inicio</Link>
                </a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-journal-bookmark"></i> <span className='ms-2'>Gestion de empresas</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="inicio">Ver empresas</a></li>
                    <li><a href="inicio"><Link to={"registrar-empresa"} className="dropdown-item" >Agregar empresas</Link></a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-pencil-square"></i> <span className='ms-2'>Gestion de novedades</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="inicio">Ver novedades</a></li>
                    <li><a className="dropdown-item" href="inicio">Agregar Novedades</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-table"></i> <span className='ms-2'>Gestion de empleados</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="inicio">Ver empleados</a></li>
                    <li><a className="dropdown-item" href="inicio">Agregar empleados</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="inicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bar-chart"></i> <span className='ms-2'>Gestion de reportes</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="inicio">Ver reportes</a></li>
                    <li><a className="dropdown-item" href="inicio">Agregar reportes</a></li>
                </ul>
            </li>
        </ul>
    )
}

export default Options