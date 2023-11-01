import React from 'react';
import '../../style/options.css'; // Importa tus estilos personalizados si es necesario
import { NavLink } from 'react-router-dom';

const Options = () => {
  return (
    <ul className="navbar-nav vh-100 d-flex flex-column" id='menu'>
      <li className="nav-item op">
        <NavLink exact to="/" className="nav-link text-white small text-center">
          <i className="bi bi-house fs-3 d-block text-center"></i><span className='small text-center'>Inicio</span>
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-white small text-center"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-journal-bookmark fs-3 d-block text-center"></i><span className='small text-center'>Empresas</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-empresas" className="dropdown-item">Ver empresas</NavLink></li>
          <li><NavLink to="/registrar-empresa" className="dropdown-item">Agregar empresas</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-white small text-center"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-pencil-square fs-3 d-block text-center"></i><span className='small text-center'>Novedades</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-novedades" className="dropdown-item">Ver Novedades</NavLink></li>
          <li><NavLink to="/registrar-novedades" className="dropdown-item">Agregar Novedades</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-white small text-center"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-table fs-3 d-block text-center"></i><span className='small text-center'>Empleados</span>
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/consultar-empleados" className="dropdown-item">Ver empleados</NavLink></li>
          <li><NavLink to="/registrar-empleado" className="dropdown-item">Agregar empleado</NavLink></li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle text-white small text-center"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-bar-chart fs-3 d-block text-center"></i><span className='small text-center'>Reportes</span> 
        </a>
        <ul className="dropdown-menu">
          <li><NavLink to="/reporte-operaciones" className="dropdown-item">Operación</NavLink></li>
          <li><NavLink to="/reporte-clientes" className="dropdown-item">Cliente</NavLink></li>
        </ul>
      </li>
    </ul>
  );
};

export default Options;
