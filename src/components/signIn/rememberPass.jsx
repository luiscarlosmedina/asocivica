import React, { useState } from 'react';
import swal from 'sweetalert';

export default function RememberPass() {
    const [eml_em, setEmail] = useState('');
    const [documento, setDni] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [validar, setValidar] = useState(false);
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [id, setId] = useState(0);

    //validadores
    const validateEmail = (eml_em) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(eml_em);
    };

    const validateDNI = (documento) => {
        return documento.length >= 7 && documento.length <= 15 && !isNaN(documento);
    };

    const validatePassword = (password, confirmPassword) => {
        // Verificar si las contraseñas son iguales
        if (password !== confirmPassword) {
            return false;
        }
        // Verificar si la longitud de la contraseña es al menos 8 caracteres y contiene al menos un número y una letra
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(eml_em)) {
            setMensaje('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!validateDNI(documento)) {
            setMensaje('Por favor, ingresa un documento válido.');
            return;
        }

        try {
            const response = await fetch('http://localhost/api_sisinov/public/api/validaempleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({documento,eml_em }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setValidar(true);
                setId(responseData.data)
                setEmail("");
                setDni("");
                setMensaje('');
                console.log(id);
            } else {
                setMensaje('La información ingresada no es válida. Inténtalo de nuevo.');
            }
        } catch (error) {
            setMensaje('La información ingresada no es válida. Inténtalo de nuevo.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validatePassword(nuevaContraseña, confirmarContraseña)) {
            setMensaje('Las contraseñas deben ser iguales y tener al menos 8 caracteres alfanuméricos.');
            return;
        }
        // Aquí puedes implementar la lógica para enviar la solicitud al servidor para restablecer la contraseña
        // Esto puede incluir la verificación de la igualdad de las contraseñas, etc.
        swal("¡Buen trabajo!", 'La contraseña se ha restablecido con éxito.', "success").then(() => {
            window.location.reload();
        });
        setNuevaContraseña('');
        setConfirmarContraseña('');
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="olvidarContraseñaModalLabel">¿Olvidaste tu contraseña?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {!validar ? (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="dni" className="form-label">Ingresa tu documento:</label>
                            <input
                                type="number"
                                value={documento}
                                name='dni'
                                className="form-control"
                                onChange={(e) => setDni(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className="form-label">Ingresa tu correo electrónico:</label>
                            <input
                                type="email"
                                name='email'
                                value={eml_em}
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className='btn btn-primary' type="submit">Verificar</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div className='mb-3'>
                            <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña:</label>
                            <input
                                type="password"
                                value={nuevaContraseña}
                                name='nuevaContraseña'
                                className="form-control"
                                onChange={(e) => setNuevaContraseña(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirmarContraseña" className="form-label">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                value={confirmarContraseña}
                                name='confirmarContraseña'
                                className="form-control"
                                onChange={(e) => setConfirmarContraseña(e.target.value)}
                                required
                            />
                        </div>
                        <button className='btn btn-primary' type="submit">Restablecer Contraseña</button>
                    </form>
                )}
                {mensaje && <p className="text-danger small">{mensaje}</p>}
            </div>
        </div>
    );
}
