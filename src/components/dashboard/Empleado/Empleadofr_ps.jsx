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
    const [telcel, setTel] = useState("")
    const [tiplib, setTipLib] = useState("")
    const [tiplic, setTipLic] = useState("")
    const [eps, setEps] = useState('')
    const [fonpen, setFonPen] = useState('')
    const [fonces, setFonCes] = useState('')
    const [arl, setArl] = useState('')
    const [message, setMessage] = useState('');
    
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
                    setRol("");
                    setNombre("");
                    setApellido("");
                    setContraseña("");
                    setTipDoc("");
                    setNumDoc("");
                    setBarrio("");
                    setDireccion("");
                    setTel("");;
                    setTipLib("");
                    setTipLic("");
                    setEps("");
                    setFonPen("");
                    setFonCes("");
                    setArl("");

                    onDataUpdate();
                }
            })
            .catch(error => {
                setMessage('Error en la solicitud');
                console.log(error);
            });
        };
    return (
        <div class="box-main">
            <h2>Agregar un empleado</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="estado">Nit</label>
                    <select
                        id="estado"
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                    >
                         <option select value="opcion1">Seleccione una opción </option>
                         <option select value="opcion2">Activo</option>
                         <option select value="opcion3">Inactivo</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="rol">Rol</label>
                    <input
                        type="text"
                        id="rol"
                        value={rol}
                        onChange={e => setRol(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        
                    />
                </div>
                <div>
                    <label htmlFor='apellido'>apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={e => setNombre(e.target.value)}
                    />

                </div>
                <div>
                    <label htmlFor='correo'>Correo electronico</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='contraseña'>contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                    />
                </div>
                <div >
                    <label htmlFor='tipdoc'>Tipo de Documento</label>
                    <select
                        id="tipdoc"
                        value={tipdoc}
                        onChange={e => setTipDoc(e.target.value)}
                    >
                    <option select value="">Seleccione una opción </option>
                    <option select value="">Cedula de ciudadania</option>
                    <option select value="">Cedula de estrangera</option>
                    <option select value="">Targeta de indentidad</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='numdoc'> Numero de documento</label>
                    <input
                        type="text"
                        value={numdoc}
                        onChange={e => setNumDoc(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='barrio'>Barrio</label>
                    <input
                        type="text"
                        value={barrio}
                        onChange={e => setBarrio(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='direccion'>Direcion</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='direccion'>Telefono</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={e => setDireccion(e.target.value)}
                    />
                </div>
                <div >
                    <label htmlFor='tiplib'>Tipo de libreta Militar</label>
                    <select
                        id="tiplib"
                        value={tiplib}
                        onChange={e => setTipLib(e.target.value)}
                    >
                    <option select value="opcion1">Seleccione una opción </option>
                    <option select value="opcion2">Libreta de primera clase</option>
                    <option select value="opcion3">Libreta de segunda clase </option>
                    </select>
                </div>
                <div >
                    <label htmlFor='tiplic'>Tipo de licencia de conducción</label>
                    <select
                        id="tiplic"
                        value={tiplic}
                        onChange={e => setTipLic(e.target.value)}
                    >
                    <option select value="opcion1">Seleccione una opción </option>
                    <option select value="opcion2">A1</option>
                    <option select value="opcion3">A2</option>
                    <option select value="opcion4">B1</option>
                    <option select value="opcion5">B2</option>
                    <option select value="opcion6">B3</option>
                    <option select value="opcion7">C1</option>
                    <option select value="opcion8">C2</option>
                    </select>
                </div>
                









               

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Empleadofr_ps;