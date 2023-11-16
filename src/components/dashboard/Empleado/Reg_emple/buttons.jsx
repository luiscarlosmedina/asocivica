import React from "react";

function Botones(props) {

 const{pasoicon} = props;

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
  
  let iconClass5;
    if (pasoicon === 5) {
      iconClass5 = "activo";
    } else {
      iconClass5 = "desactivo";
    }

  return (
    <div>
      <div className="m-1 border-bottom border-primary border-3 row justify-content-between" >
          <div className="col-">
            <p className="text-primary h2 mb-3 ms-3 mt-4">Registrar Empleado</p>
          </div>
        </div>
      
      <figure className="figure1">
        <blockquote className="blockquote">
          <p>¡Bienvenido al proceso de incorporación de nuevos empleados!</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <cite title="Título fuente">Por favor, complete este formulario con la información necesaria para agregar internamente a un nuevo miembro al sistema.</cite>
        </figcaption>
      </figure>

      <div data-testid="pasoElement">Test 1, contador siguiente paso es: {pasoicon}</div>

      <div className="segun container">
        <header className="primary-box">
          <div className="box-menu">
          <i className={`bi bi-person-vcard icon ${iconClass1}`}>
              <p className="pa_info_sup ">info personal</p> </i>
             <div className="divider-horizontal1"></div>
            <i className={`bi bi-person-vcard-fill icon ${iconClass2}`}>
              <p className="pa_info_sup">info basica 1</p></i>
             <div className="divider-horizontal2"></div>
            <i className={`bi bi-person-video icon ${iconClass3}`}>
              <p className="pa_info_sup">info basica 2</p></i>
             <div className="divider-horizontal3"></div>
            <i className={`bi bi-person-workspace icon ${iconClass4}`}>
              <p className="pa_info_sup">Emergencia</p></i>
             <div className="divider-horizontal4"></div>
            <i className={`bi bi-archive icon ${iconClass5}`}>
              <p className="pa_info_sup">Contrato</p></i>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Botones;
