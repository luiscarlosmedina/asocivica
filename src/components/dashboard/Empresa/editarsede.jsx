import React, { useState } from 'react';
import swal from 'sweetalert';

export default function Editar_s({ id, sid = null }) {
    const [edit, setEdit] = useState(false);
    const [Dic_S, setDic_S] = useState('');
    const [Sec_V, setSec_V] = useState('');
    const [N_En, setN_En] = useState('');
    const [tel1, settel1] = useState('');
    const [tel2, settel2] = useState('');
    const [tel3, settel3] = useState('');

    const [errorDic_S, setErrorDic_S] = useState('');
    const [errorSec_V, setErrorSec_V] = useState('');
    const [errorN_En, setErrorN_En] = useState('');
    const [errorTel1, setErrorTel1] = useState('');
    const [errorTel2, setErrorTel2] = useState('');
    const [errorTel3, setErrorTel3] = useState('');

    const colombianAddressRegex = /^[A-Za-z0-9\s#áéíóúÁÉÍÓÚñÑ,.-]{5,}$/;

    // Expresión regular para validar números de teléfono en formato (123) 456-7890
    const phoneRegex = /^\d{7,10}$/;

    // Expresión regular para validar el nombre sin caracteres especiales
    const nameRegex = /^[A-Za-z\s]*$/;

    const handleInputChange = (e, field, setError) => {
        // Reiniciar el estado de error cuando se edita el campo
        setError('');

        // Actualizar el valor del campo correspondiente
        switch (field) {
            case 'Dic_S':
                setDic_S(e.target.value);
                break;
            case 'Sec_V':
                setSec_V(e.target.value);
                break;
            case 'N_En':
                setN_En(e.target.value);
                break;
            case 'tel1':
                settel1(e.target.value);
                break;
            case 'tel2':
                settel2(e.target.value);
                break;
            case 'tel3':
                settel3(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleBlur = (field) => {
        // Realizar la validación cuando el usuario cambie de input
        switch (field) {
            case 'Dic_S':
                if (!colombianAddressRegex.test(Dic_S)) {
                    setErrorDic_S('Ingrese una dirección válida.');
                }
                break;
            case 'Sec_V':
                if (Sec_V === '0') {
                    setErrorSec_V('Seleccione un sector válido.');
                }
                break;
            case 'N_En':
                if (!nameRegex.test(N_En)) {
                    setErrorN_En('Ingrese un nombre válido sin caracteres especiales.');
                }
                break;
            case 'tel1':
                if (!phoneRegex.test(tel1)) {
                    setErrorTel1('Ingrese un número de teléfono válido en el formato (123) 456-7890.');
                }
                break;
            case 'tel2':
                if (!phoneRegex.test(tel2)) {
                    setErrorTel2('Ingrese un número de teléfono válido en el formato (123) 456-7890.');
                }
                break;
            case 'tel3':
                if (!phoneRegex.test(tel3)) {
                    setErrorTel3('Ingrese un número de teléfono válido en el formato (123) 456-7890.');
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Realizar la validación antes de enviar los datos
        handleBlur('Dic_S');
        handleBlur('Sec_V');
        handleBlur('N_En');
        handleBlur('tel1');
        handleBlur('tel2');
        handleBlur('tel3');

        // Verificar si hay errores de validación
        if (errorDic_S || errorSec_V || errorN_En || errorTel1 || errorTel2 || errorTel3) {
            // Mostrar un mensaje de error y no enviar los datos
            swal('Error de validación', 'Por favor, corrija los campos con errores antes de enviar el formulario.', 'error');
            return;
        }

        const sede = {
            Dic_S,
            Sec_V,
            id_e: id,
            N_En,
            Est_en: '0',
            tel1,
            tel2,
            tel3,
        };

        fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createsede', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sede),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    swal('Ocurrió un error!', edit ? 'Error al crear sede' : 'Error al actualizar sede', 'error');
                } else {
                    setDic_S('');
                    setSec_V('');
                    setN_En('');
                    settel1('');
                    settel2('');
                    settel3('');
                    setEdit(true);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1200);
                    swal('¡Buen trabajo!', 'Sede creada correctamente', 'success');
                }
            })
            .catch((error) => {
                swal('¡Algo salio mal!', 'Intentalo mas tarde', 'error');
                console.log(error);
            });
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="agregarsede">
                        {sid == null ? 'Nueva sede' : 'Editar sede'}
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="Direccion">Dirección de sede (Formato colombiano)</label>
                                <input
                                    type="text"
                                    id="Direccion"
                                    className={`form-control ${errorDic_S ? 'is-invalid' : ''}`}
                                    value={Dic_S}
                                    onChange={(e) => handleInputChange(e, 'Dic_S', setErrorDic_S)}
                                    onBlur={() => handleBlur('Dic_S')}
                                />
                                {errorDic_S && (
                                    <div className="invalid-feedback">{errorDic_S}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Sector">Sector de vigilancia</label>
                                <select
                                    id="Sector"
                                    value={Sec_V}
                                    onChange={(e) => handleInputChange(e, 'Sec_V', setErrorSec_V)}
                                    onBlur={() => handleBlur('Sec_V')}
                                    className={`form-select ${errorSec_V ? 'is-invalid' : ''}`}
                                >
                                    <option value="0">Seleccione un sector</option>
                                    <option value="1">Sector 1</option>
                                    <option value="2">Sector 2</option>
                                    <option value="3">Sector 3</option>
                                    <option value="4">Sector 4</option>
                                </select>
                                {errorSec_V && (
                                    <div className="invalid-feedback">{errorSec_V}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre">Nombre encargado</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className={`form-control ${errorN_En ? 'is-invalid' : ''}`}
                                    value={N_En}
                                    onChange={(e) => handleInputChange(e, 'N_En', setErrorN_En)}
                                    onBlur={() => handleBlur('N_En')}
                                />
                                {errorN_En && (
                                    <div className="invalid-feedback">{errorN_En}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel1">Teléfono encargado 1</label>
                                <input
                                    type="text"
                                    id="tel1"
                                    className={`form-control ${errorTel1 ? 'is-invalid' : ''}`}
                                    value={tel1}
                                    onChange={(e) => handleInputChange(e, 'tel1', setErrorTel1)}
                                    onBlur={() => handleBlur('tel1')}
                                />
                                {errorTel1 && (
                                    <div className="invalid-feedback">{errorTel1}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel2">Teléfono encargado 2</label>
                                <input
                                    type="text"
                                    id="tel2"
                                    className={`form-control ${errorTel2 ? 'is-invalid' : ''}`}
                                    value={tel2}
                                    onChange={(e) => handleInputChange(e, 'tel2', setErrorTel2)}
                                    onBlur={() => handleBlur('tel2')}
                                />
                                {errorTel2 && (
                                    <div className="invalid-feedback">{errorTel2}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tel3">Teléfono encargado 3</label>
                                <input
                                    type="text"
                                    id="tel3"
                                    className={`form-control ${errorTel3 ? 'is-invalid' : ''}`}
                                    value={tel3}
                                    onChange={(e) => handleInputChange(e, 'tel3', setErrorTel3)}
                                    onBlur={() => handleBlur('tel3')}
                                />
                                {errorTel3 && (
                                    <div className="invalid-feedback">{errorTel3}</div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            {sid == null ? 'Crear' : 'Editar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}