import React from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'; 

function Inicio(props) {
    const { siguientePaso } = props;
    
    const navigate = useNavigate(); 
    const MySwal = swal
    MySwal({
            title: "Bienvenido a Registro empleado",
            text: "Esta sección es para registrar un empleado. Si continúa, accedera.",
            icon: "warning",
            buttons: {
              uno: {
                  text: "Volver al inicio",
                  visible: true,
                  className: "btnred", // Clase boton Volver al inicio
              },
              dos: {
                  text: "Empezar formulario",
                  visible: true,
                  className: "btngreen", // Clase boton Siguiente Paso
              },
          },
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                siguientePaso(); 
            } else {
                navigate("/inicio");
            }
        });
    

    return (
        <div>
          
        </div>
    );
}

export default Inicio;