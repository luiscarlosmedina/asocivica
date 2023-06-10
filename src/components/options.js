import React from 'react'
import "../style/options.css"

const Options = () => {
    return (
        <div className="container-fluid barra">
            <div className='row'>
                <div className="d-flex flex-column alin-content-around justify-content-between col-auto min-vh-100" >
                    <div>
                        <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id='menu'>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-journal-bookmark"></i> <span className='ms-2'>Gestion de empresas</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Ver empresas</a></li>
                                    <li><a className="dropdown-item" href="#">Agregar empresas</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-pencil-square"></i> <span className='ms-2'>Gestion de novedades</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Ver novedades</a></li>
                                    <li><a className="dropdown-item" href="#">Agregar Novedades</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-table"></i> <span className='ms-2'>Gestion de empleados</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Ver empleados</a></li>
                                    <li><a className="dropdown-item" href="#">Agregar empleados</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-bar-chart"></i> <span className='ms-2'>Gestion de reportes</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Ver reportes</a></li>
                                    <li><a className="dropdown-item" href="#">Agregar reportes</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='contenido'>

            </div>
        </div>
    )
}

export default Options
