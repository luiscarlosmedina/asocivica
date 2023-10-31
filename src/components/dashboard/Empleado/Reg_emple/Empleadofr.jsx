import React, { useState } from "react";
import "../../../../style/Empleado/Reg_empl/empleado_fr.css";
import Botones from "./buttons";
import AEmple from "./options_form_emple/a";
import BEmple from "./options_form_emple/b";
import CEmple from "./options_form_emple/c";
import DEmple from "./options_form_emple/d";
import EEmple from "./options_form_emple/e";
import Fin from "./fin";
import Textemple from "./textemple";

function Empleadofr() {
  const [pasos, setPasos] = useState({
    paso: 0,
  });

  const [empleadoData, setEmpleados] = useState({
    id_doc: "",
    documento: "",
    n_em: "",
    a_em: "",
    eml_em: "",
    dir_em: "",
    lic_emp: "",
    lib_em: "",
    tel_em: "",
    f_em: "",
    contrato: "",
    barloc_em: "",
    id_pens: "",
    id_eps: "",
    id_arl: "",
    id_ces: "",
    id_rh: "",
    estado: "",
    n_coe: "",
    csag: "",
    t_cem: "",
    passw: "",
    id_rol: "",
  });


  const siguientePaso = () => {
      setPasos((prevPasos) => ({
        paso: prevPasos.paso + 1,
      })
    );
    };

  const anteriorPaso = () => {
    setPasos((prevPasos) => ({
      paso: prevPasos.paso - 1,
    }));
  };

  //-----------------------------------------------------------------------------------------------------
   //Esta funcion de encarga de cancelar el envio del formulario devolviendolo al componente final
    const ultimovolver = () => {
      setPasos((prevPasos) => ({
        paso: prevPasos.paso - 2,
      }));
    };
  //-----------------------------------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleados((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const almacenarDatos = () => {
    console.log(empleadoData);
  
    fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createempleado', {
      method: 'POST', // Puedes ajustar el método según sea necesario
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Puedes manejar la respuesta del servidor aquí
    })
    .catch(error => console.error('Error al enviar datos:', error));
  };

  let componenteActual;

  switch (pasos.paso) {

    case 0:
      componenteActual = (
        <div className="m-b">
            <Textemple/>
            <Botones/>
            <AEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
              
            />
          </div>  
      );
      break;
    case 1:
      componenteActual = (
        <div className="m-b">
           <Textemple/>
            <Botones/>
            <BEmple
              handleInputChange={handleInputChange}
              valores={empleadoData}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
            />
          </div>
      );
      break;
    case 2:
      componenteActual = (
        <div className="m-b"> 
           <Textemple/>
            <Botones/>
            <CEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
            />
          </div>
      );
      break;
    case 3:
      componenteActual = (
        <div className="m-b">
            <Textemple/>
            <Botones/>
            <DEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
            />
          </div>
      );
      break;
    case 4:
      componenteActual = (
        <div className="m-b">
            <Textemple/>
            <Botones/>
            <EEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
             
            />
          </div>
      );
      break;
    default:
      componenteActual = ( <Fin
        ultimovolver={ultimovolver}
        almacenarDatos={almacenarDatos}
        valores={empleadoData}
        />);
      
  }

  return (
    <div>
        {componenteActual}
    </div>
  );
}

export default Empleadofr;
