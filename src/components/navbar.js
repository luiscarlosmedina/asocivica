import React from 'react';
import "../style/navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar bg-body">
            <div className="container-fluid barra">
                <h5>Asocivica</h5>
                <ul class="nav">
                    <li className="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="bi bi-gear"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">Editar perfil</a></li>
                            <li><a className="dropdown-item" href="#">Salir</a></li>
                        </ul>
                    </li>
                </ul>
            </div>        
        </nav>
    );
}

export default Navbar;
