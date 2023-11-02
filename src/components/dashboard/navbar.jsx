import React from 'react';
import "../../style/navbar.css"
import { useAuth } from '../../autenticate';

const Navbar = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    return (
        <nav className="navbar p-0">
            <div className="container-fluid barra">
                <h2>SINOV</h2>
                <ul className="nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i className="bi bi-gear"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end text-white">
                            <li><a className="dropdown-item" onClick={handleLogout}>Salir</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
