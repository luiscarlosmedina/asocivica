import React from "react";

function Botones(props) {
  const { pasoicon } = props;

  var line1, line2, line3, line4;
  var iconClass1, iconClass2, iconClass3, iconClass4, iconClass5;
  var bor_sup;

  switch (pasoicon) {
    case 0:
      bor_sup = "borsupd"
      iconClass1 = iconClass2 = iconClass3 = iconClass4 = iconClass5 = "desactivo";
      line1 = line2 = line3 = line4 = "desactivo2";
      break;
    case 1:
      bor_sup = "borsupa"
      iconClass1 = "activo"
      iconClass2 = iconClass3 = iconClass4 = iconClass5 = "desactivo";
      line1 = line2 = line3 = line4 = "azul";
      break;
    case 2:
      bor_sup = "borsupa"
      iconClass1 = "azul"
      line1 = "azul2"
      iconClass2 = "activo"
      iconClass3 = iconClass4 = iconClass5 = "desactivo";
      line2 = line3 = line4 = "desactivo2";
      break;
    case 3:
      bor_sup = "borsupa"
      iconClass1 = iconClass2 = "azul"
      line1 = line2 = "azul2"
      iconClass3 = "activo"
      iconClass4 = iconClass5 = "desactivo";
      line3 = line4 = "desactivo2";
      break;
    case 4:
      bor_sup = "borsupa"
      iconClass1 = iconClass2 = iconClass3 = "azul"
      line1 = line2 = line3 = "azul2"
      line4 = "desactivo";
      iconClass4 = "activo"
      iconClass5 = "desactivo";
      break;
    case 5:
      bor_sup = "borsupa"
      iconClass1 = iconClass2 = iconClass3 = iconClass4 = "azul"
      iconClass5 = "activo";
      line1 = line2 = line3 = line4 = "azul2";

      break;

    default:
      break;
  }


  return (
    <div>
      <div className={`m-1 ${bor_sup} border-3 row justify-content-between`}>
        <div className="col-">
          <p className="t-principal-activo h2 mb-3 ms-3 mt-4">Registrar Empleado</p>
        </div>
      </div>

      <figure className="figure1">
        <blockquote className="blockquote   mt-3">
          <p>¡Bienvenido al proceso de incorporación de nuevos empleados!</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          <cite title="Título fuente">Por favor, complete este formulario con la información necesaria para agregar internamente  un nuevo miembro al sistema.</cite>
        </figcaption>
      </figure>

      <div className="segun container">
        <header className="primary-box">
          <div className="box-menu">
            <i className={`bi bi-person-vcard icon ${iconClass1}`}>
              <p className="pa_info_sup ">info personal</p> </i>
            <div className={`divider-horizontal1 ${line1} `}></div>
            <i className={`bi bi-person-vcard-fill icon ${iconClass2}`}>
              <p className="pa_info_sup">info basica 1</p></i>
            <div className={`divider-horizontal2 ${line2} `}></div>
            <i className={`bi bi-person-video icon ${iconClass3}`}>
              <p className="pa_info_sup">info basica 2</p></i>
            <div className={`divider-horizontal3 ${line3} `}></div>
            <i className={`bi bi-person-workspace icon ${iconClass4}`}>
              <p className="pa_info_sup">Emergencia</p></i>
            <div className={`divider-horizontal4 ${line4} `}></div>
            <i className={`bi bi-archive icon ${iconClass5}`}>
              <p className="pa_info_sup">Contrato</p></i>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Botones;
