import React from 'react';
import "../../style/options.css"
import { NavLink } from 'react-router-dom';

const Options = () => {
  return (
    <ul className="navbar-nav d-flex justify-content-end flex-grow-1 pe-4" id='menu'>
      <li className="nav-item dropdown">
        <NavLink exact to="/" className="nav-link op text-white" activeclass="active">
          <i className="bi bi-house"></i> Inicio
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link op dropdown-toggle text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-journal-bookmark"></i> <span className='ms-2'>Gestion de empresas</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-empresas" className="dropdown-item">Ver empresas</NavLink></li>
          <li><NavLink to="/registrar-empresa" className="dropdown-item">Agregar empresas</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link op dropdown-toggle text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-pencil-square"></i> <span className='ms-2'>Gestion de novedades</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-novedades" className="dropdown-item">Ver Novedades</NavLink></li>
          <li><NavLink to="/registrar-novedades" className="dropdown-item">Agregar Novedades</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link op dropdown-toggle text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-table"></i> <span className='ms-2'>Gestion de empleados</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-min-empleado" className="dropdown-item">Ver empleados</NavLink></li>
          <li><NavLink to="/registrar-empleado" className="dropdown-item">Agregar empleado</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link op dropdown-toggle text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-bar-chart"></i> <span className='ms-2'>Gestion de reportes</span>
        </a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Ver reportes</a></li>
          <li><NavLink to="/registrar-reportes" className="dropdown-item">Agregar reportes</NavLink></li>
        </ul>
      </li>
    </ul>
  );
};

export default Options;
