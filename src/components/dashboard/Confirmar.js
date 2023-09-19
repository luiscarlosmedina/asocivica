import React from "react";
import swal from 'sweetalert';

const Confirmar = pasoAnterior => {
    const MySwal = swal
    MySwal({
        title: "Seguro de guardar?",
        text: "Si deseas puede revisar la informacion ingresada antes de guardar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Su informacion fue guardada con exito", {
                    icon: "success",
                });
            } else {
                swal("Revisa la informacion y luego guarda");
            }
        });
    return (
        <div>
            
        </div>
    );
};

export default Confirmar;