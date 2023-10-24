import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Empresafr from './Empresafr'

export default function Verificaempresa() {
    const [nit, setNit] = useState("")
    const [nitValido, setNitValido] = useState(true); // Inicialmente asumimos que el NIT es válido
    const [formulario, setFormulario] = useState(false);
    const navega = useNavigate()

    const fetchData = async (nit) => {
        try {
            const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempresanit&nit=${nit}`);
            const data = await response.json();

            if (data.contenido !== null) {
                return data.contenido;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nitValido === true) {
            try {
                const contenido = await fetchData(nit);
                if (contenido === null || contenido.length === 0) {
                    setFormulario(true);
                } else {
                    const valor = contenido[0]
                    return navega(`/consultar-empresas/${(valor.id_e)}`)
                }
            } catch (error) {
                // Manejar el error de la solicitud fetch
                console.error(error);
            }
        } else {
            console.log("Ingrese un NIT válido");
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

    return (
        <>
            {formulario === false ?
                <div><div className="mb-1 border-bottom border-primary border-3 row justify-content-between" >
                    <div className="col-0">
                        <p className="text-primary h2">Registrar Empresa</p>
                    </div>
                </div>
                    <form className="my-3" onSubmit={handleSubmit}>
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
                        {nitValido === false && <div className="invalid-feedback"> debe contener - mas el caracter verificador</div>}
                        <button type="submit" className="btn btn-primary">
                            Verificar Empresa
                        </button>
                    </form>
                </div>
                : <Empresafr nit={nit} />
            }
        </>
    )
}
