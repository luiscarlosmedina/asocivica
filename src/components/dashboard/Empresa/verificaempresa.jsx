import React from 'react'
import { useState } from 'react'
import Empresafr from './Empresafr'

export default function Verificaempresa() {
    const [nit, setNit] = useState("")
    const [nitValido, setNitValido] = useState(true); // Inicialmente asumimos que el NIT es válido
    const [formulario, setFormulario] = useState(false);

    const handleChange = (e) => {
        const nuevoNit = e.target.value;
        setNit(nuevoNit);

        const regexNIT = /^\d{9}-\d{1}$/;

        // Realiza la validación del NIT
        const esNitValido = regexNIT.test(nuevoNit);

        setNitValido(esNitValido);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = true

        if (nitValido === true) {
            if (data === true) {
                setFormulario(true)
            } else {
                <p>hola</p>
            }
        } else {
            <p>ingrese un NIT valido</p>
        }
    }

    return (
        <>
            {formulario === false ?
                <div className="mb-4 pt-4">
                    <h3 className='p-0'>Registro de Empresa</h3>
                    <form className="mb-3" onSubmit={handleSubmit}>
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
