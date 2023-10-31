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
import swal from "sweetalert";

function Empleadofr() {

  //-----------------------------------------------------------------------------------------------------
   //Variable de estado para almacenar los pasos del Formulario multi-progeso
    const [pasos, setPasos] = useState({
      paso: 0,
    });

   //-----------------------------------------------------------------------------------------------------
   //Variable de estado para almacenar el objeto del formulario Empleado
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

  //-----------------------------------------------------------------------------------------------------
   //Esta funcion se encarga de usar el metodo setpasos para actualizar el valor de pasos y sumar para avanzar
    const siguientePaso = () => {
      setPasos((prevPasos) => ({
        paso: prevPasos.paso + 1,
      }));
    };
  //-----------------------------------------------------------------------------------------------------
   //Esta funcion se encarga de usar el metodo setpasos para actualizar el valor de pasos y restar para retroceder
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
   //Esta funcion de encarga actualizar los datos de cada campo del formulario 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEmpleados((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  //-----------------------------------------------------------------------------------------------------
   //Esta funcion de encarga recoger los datos de la variable empleado data y usar el metodo FETCH para subir los datos a una BD por medio de uuna api
   const almacenarDatos = () => {
    console.log(empleadoData);
  
    fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createempleado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empleadoData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Puedes manejar la respuesta del servidor aquí
      // Podrías notificar al usuario sobre el éxito, por ejemplo, mediante un mensaje de alerta
      swal("¡Éxito!", "Datos almacenados correctamente", "success");
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
      // Podrías notificar al usuario sobre el error, por ejemplo, mediante un mensaje de alerta
      swal("¡Error!", "Hubo un problema al enviar los datos. Inténtalo de nuevo.", "error");
    });
  };

//-----------------------------------------------------------------------------------------------------
   //Iniciacion de componente 
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
