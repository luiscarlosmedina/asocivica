import React from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Fin(props) {
    const { ultimovolver, almacenarDatos } = props;
    const navigate = useNavigate(); 
    const MySwal = swal
    MySwal({
        title: "¿Estás seguro de guardar?",
        text: "Si finalizas, no podrás revisar la información ingresada.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Su informacion fue guardada con exito", {
                    icon: "success",
                    
                });
                navigate("asocivica/registrar-empleado");
                almacenarDatos();
            } else {
                
                swal("Revisa la informacion y luego guarda");
                ultimovolver()
            }
        });

    return (
        <div>
            {/* Contenido adicional de la página */}
        </div>
    );
}

export default Fin;
