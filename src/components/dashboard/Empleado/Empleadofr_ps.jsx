import React, { useState } from 'react';

function Empleadofr_ps({ onDataUpdate }) {
    const [estado, setEstado] = useState("")
    const [rol, setRol] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")   
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [tipdoc, setTipDoc] = useState("")
    const [numdoc, setNumDoc] = useState("")
    const [barrio, setBarrio] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telcel, setTelCel] = useState("")
    const [telfijo, setTelFijo] = useState("")
    const [tiplib, setTipLib] = useState("")
    const [tiplic, setTipLic] = useState("")
    const [eps, setEps] = useState('')
    const [fonpen, setFonPen] = useState('')
    const [fonces, setFonCes] = useState('')
    const [arl, setArl] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const empleado = {
            estado,
            rol,
            nombre,
            apellido,
            correo,
            contraseña,
            tipdoc,
            numdoc,
            barrio,
            direccion,
            telcel,
            telfijo,
            tiplib,
            tiplic,
            eps,
            fonpen,
            fonces,
            arl,

        };

        fetch('https://developersaurios.000webhostapp.com/api.php?apicall=createempleado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage('Error al crear el usuario');
                } else {
                    setMessage('empleado creado correctamente');
                    setEstado("");
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

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Empleadofr_ps;