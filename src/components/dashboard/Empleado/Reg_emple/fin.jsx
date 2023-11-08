import React from "react";
import swal from 'sweetalert';
import { Navigate, useNavigate } from 'react-router-dom';

function Fin(props) {
    const { ultimovolver, valores} = props;
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
                //-----------------------------------------------------------------------------------------------------
                //Esta funcion de encarga recoger los datos de la variable empleado data y usar el metodo FETCH para subir los datos a una BD por medio de uuna api
                    console.log(valores);

                    fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createempleado', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(valores),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error de red: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Respuesta del servidor:', data);
                            swal("Poof! Su informacion fue guardada con exito", {
                                icon: "success",

                            });
                        }).catch(error => {
                            console.error('Error al enviar datos:', error);
                            swal("¡Error!", "Hubo un problema al enviar los datos. Inténtalo de nuevo.", "error");
                            
                        });
            
            } else {

                swal("Revisa la informacion y luego guarda");
                ultimovolver()
            }
        });

    return (
        <div>
        </div>
    );
}

export default Fin;
