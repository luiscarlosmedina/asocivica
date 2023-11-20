import React, { useState } from "react";
import swal from 'sweetalert';

function EEmple(props) {
  const {handleInputChange, valores, siguientePaso, anteriorPaso } = props;
  const [errores, setErrores] = useState({});
  const [file, setFile] = useState(false);



  const validarcampose = () => {
    console.log("di")
    let campos = ["contrato", "f_em"];
    let documentosValidos = true;
    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampo(campo, valores[campo]);
      }
    });

    if (documentosValidos) {
      siguientePaso();
  } else{
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
  }
    return documentosValidos;
  };

  const handleselectorfiles = (e) => {
    console.log(e.target.files[0])
  };
 //https://www.google.com/search?q=crud+de+fotos+con+laravel&rlz=1C1YTUH_enCO1072CO1072&oq=crud+de+fotos+con+la&gs_lcrp=EgZjaHJvbWUqBwgBECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRigATIHCAUQIRigATIHCAYQIRifBdIBCDgzODZqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:1cb168b8,vid:gkgaLqCySzg,st:0

  const validarCampo = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "contrato":
        if (valorCampo === "" || valorCampo === null) {
          nuevosErrores.contrato = "Por favor, el contrato no puede estar vacio.";
        } else if (valorCampo.length < 10) {
          nuevosErrores.contrato = "Por favor, la URL esta muy corta";
        } else if (valorCampo.length > 100) {
          nuevosErrores.contrato = "Por favor, la URL esta muy LARGA";
        }else{
          delete nuevosErrores.contrato;
        }
        break;
      

      case "f_em":
        if (valorCampo === "" && valorCampo === null ) {
          nuevosErrores.f_em = "Por favor, cargue una foto del empleado.";
        } else {
          delete nuevosErrores.f_em;
        }
        break;

      default:

        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  return (
    <section className="secundary-box">
      <div className="container">
        <div className="box-main">
          <div className="box-main2">
            <div>
              <label for="validationDefault02" className="form-label">
                Contrato
              </label>
              <input
                type="text"
                name="contrato"
                className={`form-control ${
                  errores.contrato ? "is-invalid" : valores.contrato ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleInputChange(e);
                  validarCampo("contrato", e.target.value);
                }}
                value={valores.contrato}
              />
              <div className="invalid-feedback">{errores.contrato}</div>
            </div>
            <div>
              <label for="validationDefault02" className="form-label">
                Foto
              </label>
              <input
                type="file"
                name="f_em"
                className={`form-control ${
                  errores.f_em ? "is-invalid" : valores.f_em ? "is-valid" : ""
                }`}
                onChange={(e) => {
                  handleselectorfiles(e);
                  validarCampo("f_em", e.target.value);
                }}
                value={valores.f_em}
              />
              <div className="invalid-feedback">{errores.f_em}</div>
            </div>

            <div className="espbots">
            <div className="float-end">
            <button className="btnfs btn btn-primary"  /*onClick={() => {  }}*/>
                validar
              </button>
            </div>

            <div className="float-start ">
            <button className="btnfa btn btn-primary" onClick={() => { anteriorPaso(); }}>
                
                volver
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EEmple;

