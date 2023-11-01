import React from "react";
import Navbar from "./navbar";
import Options from "./options";
import User from "./User";
import Content from "./Content";
import "../../style/app.css"; // Importa tus estilos personalizados si es necesario

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 p-1 uno">
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
