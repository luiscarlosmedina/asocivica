import React, { useState } from "react";
import "../../../../style/Empleado/Reg_empl/empleado.css";
import Botones from "./buttons";
import AEmple from "./options_form_emple/a";
import BEmple from "./options_form_emple/b";
import CEmple from "./options_form_emple/c";
import DEmple from "./options_form_emple/d";
import EEmple from "./options_form_emple/e";
import Fin from "./options_form_emple/fin";
import Validador from "./options_form_emple/validadorempleado";
import { useAuth } from "../../../../autenticate";



export default function Empleadofr() {
  //--------------------------------------------------------------------------------------//
  const {user} = useAuth();
  //-----------------------------------------------------------------------------------------------------
   //Variable de estado para almacenar los pasos del Formulario multi-progeso
    const [pasos, setPasos] = useState({
      paso: 0,
    });

    //-----------------------------------------------------------------------------------------------------
   //Variable de funcion para dejar el paso en 1 
   const resetearPasos = () => {
    setPasos({
      paso: 0,
    });
  };
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
     // f_em: "",
      contrato: "",
      barloc_em: "",
      id_pens: "",
      id_eps: "",
      id_arl: "",
      id_ces: "",
      id_rh: "",
      estado: "0",
      n_coe: "",
      csag: "",
      t_cem: "",
      passw: "",
      id_rol: "",
    });

   //-----------------------------------------------------------------------------------------------------
   //Variable de funcion para limpiar el objeto del formulario Empleado

    const resetEmpleadoData = () => {
      setEmpleados({
        id_doc: "",
        documento: "",
        n_em: "",
        a_em: "",
        eml_em: "",
        dir_em: "",
        lic_emp: "",
        lib_em: "",
        tel_em: "",
       // f_em: "",
        contrato: "",
        barloc_em: "",
        id_pens: "",
        id_eps: "",
        id_arl: "",
        id_ces: "",
        id_rh: "",
        estado: "0",
        n_coe: "",
        csag: "",
        t_cem: "",
        passw: "",
        id_rol: "",
      });
    };

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
   //Iniciacion de componente 
  let componenteActual;

  switch (pasos.paso) {

    case 0:
      componenteActual = (
        <div className="m-b">
            <Botones
              pasoicon={pasos.paso}/>
            <Validador
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
            <Botones
              pasoicon={pasos.paso}/>
            <AEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
              resetEmpleadoData = {resetEmpleadoData}
              resetearPasos= {resetearPasos}
              
            />
          </div>  
      );
      break;
    case 2:
      componenteActual = (
        <div className="m-b">
            <Botones
             pasoicon={pasos.paso}/>
            <BEmple
              handleInputChange={handleInputChange}
              valores={empleadoData}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
            />
          </div>
      );
      break;
    case 3:
      componenteActual = (

        <div className="m-b"> 
            <Botones
            pasoicon={pasos.paso}/>
            <CEmple
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
            <Botones
            pasoicon={pasos.paso}/>
            <DEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
            />
          </div>
      );
      break;
    case 5:
      componenteActual = (
        <div className="m-b">
            <Botones
            pasoicon={pasos.paso}/>
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
        valores={empleadoData}
        anteriorPaso={anteriorPaso}
        resetEmpleadoData = {resetEmpleadoData}
        resetearPasos= {resetearPasos}
        />);
      
  }

  return (
    <div>
        {user.ID_rol !== 3 ? componenteActual : <p>Su rol no tiene acceso a esta funcionalidad</p> }
    </div> 
  );
};
