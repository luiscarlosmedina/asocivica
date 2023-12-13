import React, { useState } from 'react';
import swal from 'sweetalert';

export default function Changepass({ id }) {
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setuser] = useState(null)

    const handleVerif = async () => {
        try {
            if (password.trim() === '') {
                setError('Ingrese su contraseña actual.');
                return;
            } else {
                setError('');
            }

            // Validación de contraseña
            if (!/^[a-zA-Z0-9!@#$%^&*+=._-]{8,}$/.test(password)) {
                setError('La contraseña no es válida');
                return;
            } else {
                setError('');
            }

            const verifica = { "passw": password, "id_em": id };

            const response = await fetch(`http://localhost/api_sisinov/public/api/verifpass`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verifica),
            });

            const responseData = await response.json();

            if (responseData.error) {
                setShow(false);
                setError('Datos incorrectos');
            } else {
                setPassword('');
                setError('');
                setShow(true);
                setuser(responseData.user);
            }
        } catch (error) {
            console.error(error);
            setError('Datos incorrectos');
        }
    };

    const cambiar = async () => {
        try {
            if (newPassword.trim() === '') {
                setError('Ingrese la nueva contraseña');
                return;
            } else {
                setError('');
            }

            // Validación de contraseña
            if (!/^[a-zA-Z0-9!@#$%^&*+=._-]{8,}$/.test(newPassword)) {
                setError('La contraseña debe ser de 8 caracteres incluyendo minúsculas, mayúsculas, números y caracteres especiales como !@#$%^&*+=._-');
                return;
            } else {
                setError('');
            }

            // Confirmar que las contraseñas sean iguales
            if (newPassword !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                setNewPassword('');
                setConfirmPassword('');
                return;
            }

            const cambio = { "passw": newPassword, "id_em": id };

            if (user.id_em === id) {
                const ress = await fetch(`http://localhost/api_sisinov/public/api/changepass`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cambio),
                });

                const ressData = await ress.json();

                if (ressData.error) {
                    setError('Datos incorrectos');
                } else {
                    swal("Cambio exitoso!","Ingrese la nueva contraseña cuando se vuelva a logear", "success")
                    setPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                    setShow(false);
                }
            }
        } catch (error) {
            console.error(error);
            setError('Datos incorrectos');
        }
    };

    return (
        <div>
            {!show ? (
                <div className='row caja-input d-flex align-items-center'>
                    <div className='col'>
                        <label className='t-box'>Contraseña actual: </label>
                        <input
                            placeholder='Contraseña'
                            type='password'
                            name='password'
                            id='pass'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <div className='col'>
                        <button type='button' className='btn btn-outline-primary' onClick={handleVerif}>
                            Cambiar contraseña
                        </button>
                    </div>
                    <p className='error-message text-red m-auto px-1'>{error}</p>
                </div>
            ) : (
                <div className='row caja-input d-flex align-items-center'>
                    <div className='col'>
                        <label className='t-box'>Nueva Contraseña: </label>
                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='form-control' />
                    </div>
                    <div className='col'>
                        <label className='t-box'>Confirme contraseña: </label>
                        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-control' />
                    </div>
                    <div className='col'>
                        <button type='button' className='btn btn-outline-primary' onClick={cambiar}>
                            Guardar contraseña
                        </button>
                    </div>
                    {error && <p className='error-message text-red m-auto px-1'>{error}</p>}
                </div>
            )}
        </div>
    );
}
