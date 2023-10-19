import React from "react";

function Botones() {

  return (
    <div>
      <figure className="figure1">
        <blockquote class="blockquote">
          <p>¡Bienvenido al proceso de incorporación de nuevos empleados!</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="Título fuente">Por favor, complete este formulario con la información necesaria para agregar internamente a un nuevo miembro al sistema.</cite>
        </figcaption>
      </figure>
      <div className="box-main">
        <header className="primary-box">
          <div className="box-menu">
            <div className="sep1">
              <div className=" sub-menu">
              <i class="bi bi-person-vcard"></i>
              </div>
              <p className="ip">información Personal </p>
            </div>
            <div className="l_a"></div>
            <div className="sep2">
              <div className="sub-menu">
             
              <i class="bi bi-person-vcard-fill"></i>
              </div>
              <p className="ip">información basica 1</p>
              
            </div>
            <div className="l_b"></div>
            <div className="sep3">
              <div className="sub-menu">
                <i class="bi bi-person-video"></i>
              </div>
              <p className="ip">información basica 2</p>
            </div>
            <div className="l_c"></div>
            <div className="sep4">
              <div className=" sub-menu">
              <i class="bi bi-person-workspace"></i>
              </div>
              <p className="ip">contactos emergencia</p>
            </div>
            <div className="l_d"></div>
            <div className="sep5">
              <div className="sub-menu">
                <i class="bi bi-archive"></i>
              </div>
              <p className="ip">Contrato</p>
            </div>
          </div>
        </header>
        
      </div>
    </div>
  );
}

export default Botones;
