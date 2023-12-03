import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Empresafr from './Empresafr';
import Empresarapidofr from './empresarapidofr';
import { useAuth } from '../../../autenticate';

export default function Verificaempresa() {
    const [nit, setNit] = useState('');
    const [est_E, setEst_E] = useState('');
    const [nitValido, setNitValido] = useState(true); // Inicialmente asumimos que el NIT es válido
    const [formulario, setFormulario] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tpform, setTpform] = useState("0");
    const navega = useNavigate();
    const { user } = useAuth()

    const fetchData = async (nit) => {
        try {
            setLoading(true);
            const response = await fetch(`https://20.106.206.47/api_sisinov/public/api/empresas/${nit}`);
            const data = await response.json();

            if (data.contenido !== null) {
                return data.data;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };
    const resetForm = () => {
        setNit('');
        setEst_E('');
        setNitValido(true);
        setFormulario(false);
        setTpform("0");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nitValido === true) {
            try {
                const contenido = await fetchData(nit);
                if (contenido === null || contenido.length === 0) {
                    setFormulario(true);
                    if (est_E === "0") {
                        setTpform("1")
                    } else {
                        setTpform("2")
                    }

                } else {
                    const valor = contenido[0];
                    return navega(`/consultar-empresas/${valor.id_e}`);
                }
            } catch (error) {
                // Manejar el error de la solicitud fetch
                console.error(error);
            }
        } else {
            console.log('Ingrese un NIT válido');
        }
    };

    const handleChange = (e) => {
        const nuevoNit = e.target.value;
        setNit(nuevoNit);

        const regexNIT = /^\d{9}-\d{1}$/;

        // Realiza la validación del NIT
        const esNitValido = regexNIT.test(nuevoNit);

        setNitValido(esNitValido);
    };

    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;
        setEst_E(nuevoEstado); // Mostrar el formulario según el estado seleccionado
    };

    return (
        <>
            {formulario === false ? (
                <div>
                    <div className="col-0">
                        <p className="t h2 mb-4 mt-3">Registrar empresa</p>
                    </div>
                    <div className={`mb-1 mt-1 borsupd border-3 `}></div>
                    <form className="my-3" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="nit" className="form-label">
                                        Ingrese Nit
                                    </label>
                                    <input
                                        type="text"
                                        id="nit"
                                        placeholder='123456789-0'
                                        className={`form-control ${nitValido === false && "is-invalid"}`}
                                        onChange={handleChange}
                                        name="Nit_E"
                                        value={nit}
                                        required
                                    />
                                    {nitValido === false && <div className="invalid-feedback">Debe contener - más el carácter verificador</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="Est_E" className="form-label">
                                        Estado
                                    </label>
                                    <select
                                        name="Est_E"
                                        className="form-select"
                                        value={est_E}
                                        onChange={handleEstadoChange}
                                        required
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option value="0">Activo</option>
                                        <option value="1">En estudio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {user.ID_rol !== 3 ? <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            Verificar Empresa
                        </button> : <p>Su rol no tiene acceso a esta funcionalidad</p>}
                    </form>
                </div>
            ) : tpform === "1" ? (
                <Empresafr nit={nit} est={est_E} resetForm={resetForm} />
            ) : (
                <Empresarapidofr nit={nit} est={est_E} resetForm={resetForm} />
            )}
        </>
    );
}
