import React from 'react'
import "../style/options.css"

const Options = () => {
    return (
        <ul className="navbar-nav d-flex justify-content-end flex-grow-1 pe-4" id='menu'>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-journal-bookmark"></i> <span className='ms-2'>Gestion de empresas</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ver empresas</a></li>
                    <li><a className="dropdown-item" href="#">Agregar empresas</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-pencil-square"></i> <span className='ms-2'>Gestion de novedades</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ver novedades</a></li>
                    <li><a className="dropdown-item" href="#">Agregar Novedades</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-table"></i> <span className='ms-2'>Gestion de empleados</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ver empleados</a></li>
                    <li><a className="dropdown-item" href="#">Agregar empleados</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link op dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bar-chart"></i> <span className='ms-2'>Gestion de reportes</span>
                </a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Ver reportes</a></li>
                    <li><a className="dropdown-item" href="#">Agregar reportes</a></li>
                </ul>
            </li>
        </ul>
    )
}

export default Options
