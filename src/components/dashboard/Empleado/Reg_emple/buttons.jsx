import React from "react";

function Botones(props) {

 const{pasoicon} = props;

 let iconClass0;
    if (pasoicon === 0) {
      iconClass0 = "activo";
    } else {
      iconClass0 = "desactivo";
    }
  let iconClass1;
    if (pasoicon === 1) {
      iconClass1 = "activo";
    } else {
      iconClass1 = "desactivo";
    }

  let iconClass2;
    if (pasoicon === 2) {
      iconClass2 = "activo";
    } else {
      iconClass2 = "desactivo";
    }
  let iconClass3;
    if (pasoicon === 3) {
      iconClass3 = "activo";
    } else {
      iconClass3 = "desactivo";
    }
  
  let iconClass4;
    if (pasoicon === 4) {
      iconClass4 = "activo";
    } else {
      iconClass4 = "desactivo";
    }

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
          <i className={`bi bi-person-vcard icon ${iconClass0}`}>
              <p className="pa_info_sup ">info personal</p> </i>
             <div className="divider-horizontal1"></div>
            <i className={`bi bi-person-vcard-fill icon ${iconClass1}`}>
              <p className="pa_info_sup">info basica 1</p></i>
             <div className="divider-horizontal2"></div>
            <i className={`bi bi-person-video icon ${iconClass2}`}>
              <p className="pa_info_sup">info basica 2</p></i>
             <div className="divider-horizontal3"></div>
            <i className={`bi bi-person-workspace icon ${iconClass3}`}>
              <p className="pa_info_sup">Emergencia</p></i>
             <div className="divider-horizontal4"></div>
            <i className={`bi bi-archive icon ${iconClass4}`}>
              <p className="pa_info_sup">Contrato</p></i>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Botones;
