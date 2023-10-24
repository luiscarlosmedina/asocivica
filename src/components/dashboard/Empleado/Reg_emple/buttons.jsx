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

      <div className="segun container">
        <header className="primary-box">
          <div className="box-menu">
            <i className="bi bi-person-vcard"><p className="pa_info_sup">Info personal</p> </i>
             <div className="divider-horizontal1"></div>
            <i className="bi bi-person-vcard-fill"><p className="pa_info_sup">Info basica 1</p></i>
             <div className="divider-horizontal2"></div>
            <i className="bi bi-person-video"><p className="pa_info_sup">Info basica 2</p></i>
             <div className="divider-horizontal3"></div>
            <i className="bi bi-person-workspace"><p className="pa_info_sup"> Emergencia</p></i>
             <div className="divider-horizontal4"></div>
            <i className="bi bi-archive"><p className="pa_info_sup">contrato </p></i>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Botones;
