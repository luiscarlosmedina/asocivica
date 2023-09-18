import React from "react";


function Inicio(props) {
    const {siguientePaso} = props;
    

  return (
    <div  >
        <h1>
        Esta seccion es de registrar un empleado, 
        para hacerlo porfavor dale siguiente
        si no dale volver al inicio.
        </h1> 

        <button onClick={siguientePaso}>
            Empezar
        </button>


    </div>
  );
}
export default Inicio; 