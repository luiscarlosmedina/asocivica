import React, { useState } from "react";
import "../../../../style/Empleado/Reg_empl/empleado_fr.css";
import Inicio from "./inicio";
import Botones from "./buttons";
import swal from 'sweetalert';
import AEmple from "./options_form_emple/a";
import BEmple from "./options_form_emple/b";
import CEmple from "./options_form_emple/c";
import DEmple from "./options_form_emple/d";
import EEmple from "./options_form_emple/e";
import { useNavigate } from 'react-router-dom'; 
import Fin from "./fin";

function Empleadofr() {
  const [pasos, setPasos] = useState({
    paso: 0,
  });
  const navigate = useNavigate(); 
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
    id_rol: "",
    estado: "",
    passw: "",
    n_coe: "",
    csag: "",
    t_cem: "",
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

  const ubicacionPaso = (nuevoPaso) => {
    setPasos({
      paso: nuevoPaso,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleados((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const almacenarDatos = () => {
    console.log(empleadoData);
  };



  let componenteActual;

  switch (pasos.paso) {
    case 0:
      componenteActual = (<div className="m-b">
        <Inicio siguientePaso={siguientePaso} />    
        </div>

      );
      break;
  
    case 1:
      componenteActual = (
        <div>
          <div className="m-b">
            <Botones onClick={ubicacionPaso}  />
            <AEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
              
            />
          </div>
        </div>
      );
      break;
    case 2:
      componenteActual = (
        <div>
          <div className="m-b">
            <Botones
              onClick={ubicacionPaso}
            />
            <BEmple
              handleInputChange={handleInputChange}
              valores={empleadoData}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
            />
          </div>
        </div>
      );
      break;
    case 3:
      componenteActual = (
        <div>
          <div className="m-b">
            <Botones onClick={ubicacionPaso}/>
            <CEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
            />
          </div>
        </div>
      );
      break;
    case 4:
      componenteActual = (
        <div>
          <div className="m-b">
            <Botones onClick={ubicacionPaso}/>
            <DEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
            />
          </div>
        </div>
      );
      break;
    case 5:
      componenteActual = (
        <div>
          <div className="m-b">
            <Botones onClick={ubicacionPaso}/>
            <EEmple
              handleInputChange={handleInputChange}
              siguientePaso={siguientePaso}
              anteriorPaso={anteriorPaso}
              valores={empleadoData}
              almacenarDatos={almacenarDatos}
            />
          </div>
        </div>
      );
      break;
    default:
      componenteActual = ( <Fin
        anteriorPaso={anteriorPaso}
        />);
      
  }

  return (
    <div>
        {componenteActual}
    </div>
  );
}

export default Empleadofr;
