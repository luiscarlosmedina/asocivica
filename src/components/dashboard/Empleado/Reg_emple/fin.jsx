import React from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Fin(props) {
    const { anteriorPaso } = props;
    const navigate = useNavigate();

    const mostrarAlerta = () => {
        Swal.fire({
            title: '¿Estás seguro de guardar?',
            text: "Si finalizas, no podrás revisar la información ingresada.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'Cancelar',
            customClass: {
                backdrop: 'custom-overlay' // Agrega la clase personalizada al overlay
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Finalizado',
                    'Tu información fue finalizada con éxito.',
                    'success'
                ).then(() => {
                    navigate("/inicio");
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                anteriorPaso(); // Ejecuta la función anteriorPaso si se cancela
            }
        });
    }

    React.useEffect(() => {
        mostrarAlerta();
    }, []);

    return (
        <div>
            {/* Contenido adicional de la página */}
        </div>
    );
}

export default Fin;
