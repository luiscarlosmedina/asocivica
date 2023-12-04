import React from "react";
import swal from 'sweetalert';



function Fin(props) {
    const { valores, anteriorPaso, resetEmpleadoData, resetearPasos} = props;
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
                            resetEmpleadoData();
                            resetearPasos();    
                            

                        }).catch(error => {
                            console.error('Error al enviar datos:', error);
                            swal("¡Error!", "Hubo un problema al enviar los datos. Verifica e inténtalo de nuevo.", "error");
                            anteriorPaso();
                            
                        });
            
            } else {
                swal("Revisa la informacion y luego guarda");
                anteriorPaso();
            }
        });

    return (
        <div>
        </div>
    );
}

export default Fin;
