import React, {useState} from "react";
import Navbar from "./navbar";
import Options from "./options";
import User from "./User";
import Content from "./Content";
import "../../style/app.css"; // Importa tus estilos personalizados si es necesario

export default function Dashboard() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const toggleMenu = () => {
    setMenuCollapsed(!menuCollapsed);
  };
  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <button
            className="btn btn-primary d-md-none"
            onClick={toggleMenu}
          >
            {!menuCollapsed ? 'Ocultar menú' : 'Ver menú'}
          </button>
          <div className={`col-md-1 p-1 uno ${menuCollapsed ? 'd-none' : ''}`}>
            <User />
            <Options />
          </div>
          <div className="col-md-11 p-0">
            <header>
              <Navbar />
            </header>
            <main>
              <Content />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
