import React, { useState } from 'react';

function Empresafr({ onDataUpdate }) {
    const [nit, setNit] = useState("")
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [rep, setRep] = useState("")
    const [tp_doc, setTp_doc] = useState("")
    const [repDoc, setRepDoc] = useState("")
    const [telefono, setTelefono] = useState("")
    const [valor, setValor] = useState("")
    const [estado, setEstado] = useState("")
    const [fhInicio, setFhInicio] = useState("")
    const [fhFin, setFhFin] = useState("")
    const [sector, setSector] = useState("")
    const [actividad, setActividad] = useState("")
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const empresa = {
            nit,
            nombre,
            correo,
            rep,
            tp_doc,
            repDoc,
            telefono,
            valor,
            estado,
            fhInicio,
            fhFin,
            sector,
            actividad,
        };

        fetch('https://developersaurios.000webhostapp.com/api.php?apicall=createempresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresa),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear el usuario');
                } else {
                    setMessage('empresa creado correctamente');
                    setNit("");
                    setNombre("");
                    setCorreo("");
                    setRep("");
                    setTp_doc("");
                    setRepDoc("");
                    setTelefono("");
                    setValor("");
                    setEstado("");
                    setFhInicio("");
                    setFhFin("");
                    setSector("");
                    setActividad("");
                    setMessage("");
                    onDataUpdate();
                }
            })
            .catch(error => {
                setMessage('Error en la solicitud');
                console.log(error);
            });
        };
    return (
        <div className="ingresar-container">
            <h2>Registro de empresa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nit">Nit</label>
                    <input
                        type="text"
                        id="nit"
                        value={nit}
                        onChange={e => setNit(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre empresa</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="correo">Correo</label>
                    <input
                        type="text"
                        id="correo"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="rep">Nombre representante legal</label>
                    <input
                        type="text"
                        id="rep"
                        value={rep}
                        onChange={e => setRep(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="tp_doc">Tipo de documento</label>
                    <input
                        type="text"
                        id="tp_doc"
                        value={tp_doc}
                        onChange={e => setTp_doc(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="repDoc">Documento Representante</label>
                    <input
                        type="number"
                        id="repDoc"
                        value={repDoc}
                        onChange={e => setRepDoc(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="telefono">Telefono</label>
                    <input
                        type="number"
                        id="telefono"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="valor">valor</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="estado">Estado</label>
                    <input
                        type="number"
                        id="estado"
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="fhInicio">Fecha de afiliacion</label>
                    <input
                        type="date"
                        id="fhInicio"
                        value={fhInicio}
                        onChange={e => setFhInicio(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="fhFin">Fecha de desactivacion</label>
                    <input
                        type="date"
                        id="fhFin"
                        value={fhFin}
                        onChange={e => setFhFin(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="sector">Sector economico</label>
                    <input
                        type="text"
                        id="sector"
                        value={sector}
                        onChange={e => setSector(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor="actividad">Actividad economica</label>
                    <input
                        type="text"
                        id="actividad"
                        value={actividad}
                        onChange={e => setActividad(e.target.value)}
                        
                    />
                </div>

                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Empresafr;