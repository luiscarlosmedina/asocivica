import React, { useState } from 'react';

function Empresafr({ onDataUpdate }) {
    const [nit, setNit] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rep, setRep] = useState("");
    const [tp_doc, setTp_doc] = useState("");
    const [repDoc, setRepDoc] = useState("");
    const [telefono, setTelefono] = useState("");
    const [valor, setValor] = useState("");
    const [estado, setEstado] = useState("");
    const [fhInicio, setFhInicio] = useState("");
    const [fhFin, setFhFin] = useState("");
    const [sector, setSector] = useState("");
    const [actividad, setActividad] = useState("");
    const [message, setMessage] = useState('');
    const [sedes, setSedes] = useState([{ Dic_S: "", Sec_V: "", encargados: [] }]);
    const [empresa, setEmpresa] = useState({
        Nit_E: "",
        Nom_E: "",
        Eml_E: "",
        Nom_Rl: "",
        ID_Doc: 1,
        CC_Rl: "",
        telefonoGeneral: "",
        Val_E: 1,
        Est_E: "",
        Fh_Afi: "",
        fechaFinalizacion: "",
        COD_SE: "",
        COD_AE: "",
        sedes: [
            {
                Dic_S: "",
                Sec_V: "",
                encargados: [
                    {
                        N_En: "",
                        tel1: "",
                        tel2: "",
                        tel3: "",
                        Est_en: ""
                    }
                ]
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresa({ ...empresa, [name]: value });
    };

    const handleSedeChange = (index, field, value) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[index][field] = value;
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };

    const handleEncargadoChange = (sedeIndex, encargadoIndex, field, value) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[sedeIndex].encargados[encargadoIndex][field] = value;
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la solicitud POST a la API con el objeto 'empresa'
        console.log(empresa);

        // Limpia el formulario después de enviar
        setEmpresa({
            Nit_E: "",
            Nom_E: "",
            Eml_E: "",
            Nom_Rl: "",
            ID_Doc: "",
            CC_Rl: "",
            telefonoGeneral: "",
            Val_E: "",
            Est_E: "",
            Fh_Afi: hoy,
            fechaFinalizacion: hoy,
            COD_SE: "",
            COD_AE: "",
            sedes: [
                {
                    Dic_S: "",
                    Sec_V: "",
                    encargados: [
                        {
                            N_En: "",
                            tel1: "",
                            tel2: "",
                            tel3: "",
                            Est_en: ""
                        }
                    ]
                }
            ]
        });

        onDataUpdate();
    };
    const fecha = new Date()
    const hoy = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()

    const handleAddSede = () => {
        const updatedSedes = [...empresa.sedes, { Dic_S: "", Sec_V: "", encargados: [] }];
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };

    const handleAddEncargado = (sedeIndex) => {
        const updatedSedes = [...empresa.sedes];
        updatedSedes[sedeIndex].encargados.push({ N_En: "", tel1: "", tel2: "", tel3: "", Est_en: "" });
        setEmpresa({ ...empresa, sedes: updatedSedes });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Registro de Empresa</h2>
            <form onSubmit={handleSubmit}>
                {/* Campos para la Empresa */}
                <div>
                    <label htmlFor="nit">Nit</label>
                    <input
                        type="text"
                        id="nit"
                        className="form-control"
                        name="Nit_E"
                        value={empresa.Nit_E}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre empresa</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        name="Nom_E"
                        value={empresa.Nom_E}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="correo">Correo</label>
                    <input
                        type="text"
                        id="correo"
                        className="form-control"
                        name="Eml_E"
                        value={empresa.Eml_E}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="rep">Nombre representante legal</label>
                    <input
                        type="text"
                        id="rep"
                        className="form-control"
                        name="Nom_Rl"
                        value={empresa.Nom_Rl}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="tp_doc">Tipo de documento</label>
                    <input
                        type="text"
                        id="tp_doc"
                        className="form-control"
                        name="ID_Doc"
                        value={empresa.ID_Doc}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="repDoc">Documento Representante</label>
                    <input
                        type="number"
                        id="repDoc"
                        className="form-control"
                        name="CC_Rl"
                        value={empresa.CC_Rl}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="telefono">Telefono</label>
                    <input
                        type="number"
                        id="telefono"
                        className="form-control"
                        name="telefonoGeneral"
                        value={empresa.telefonoGeneral}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="number"
                        id="valor"
                        className="form-control"
                        name="Val_E"
                        value={empresa.Val_E}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="estado">Estado</label>
                    <input
                        type="text"
                        id="estado"
                        className="form-control"
                        name="Est_E"
                        value={empresa.Est_E}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="sector">Sector economico</label>
                    <input
                        type="text"
                        id="sector"
                        className="form-control"
                        name="COD_SE"
                        value={empresa.COD_SE}
                        onChange={handleChange}
                        
                    />
                </div>
                <div>
                    <label htmlFor="actividad">Actividad economica</label>
                    <input
                        type="text"
                        id="actividad"
                        className="form-control"
                        name="COD_AE"
                        value={empresa.COD_AE}
                        onChange={handleChange}
                        
                    />
                </div>

                {/* Campos para Sedes */}
                <div className="mb-4">
                    <h3>Sedes</h3>
                    {empresa.sedes.map((sede, index) => (
                        <div key={index} className="border p-3 mb-3">
                            <div className="mb-3">
                                <label htmlFor={`Dic_S_${index}`}>Dirección Sede</label>
                                <input
                                    type="text"
                                    id={`Dic_S_${index}`}
                                    className="form-control"
                                    name={`Dic_S_${index}`}
                                    value={sede.Dic_S}
                                    onChange={(e) => handleSedeChange(index, "Dic_S", e.target.value)}
                                    
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`Sec_V_${index}`}>Secuencia</label>
                                <input
                                    type="number"
                                    id={`Sec_V_${index}`}
                                    className="form-control"
                                    name={`Sec_V_${index}`}
                                    value={sede.Sec_V}
                                    onChange={(e) => handleSedeChange(index, "Sec_V", e.target.value)}
                                    
                                />
                            </div>
                            <h5>Encargados</h5>
                            {sede.encargados.map((encargado, encargadoIndex) => (
                                <div key={encargadoIndex} className="border p-3 mb-3">
                                    <div className="mb-3">
                                        <label htmlFor={`N_En_${index}_${encargadoIndex}`}>Nombre Encargado</label>
                                        <input
                                            type="text"
                                            id={`N_En_${index}_${encargadoIndex}`}
                                            className="form-control"
                                            name={`N_En_${index}_${encargadoIndex}`}
                                            value={encargado.N_En}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "N_En", e.target.value)}
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`tel1_${index}_${encargadoIndex}`}>Teléfono 1</label>
                                        <input
                                            type="text"
                                            id={`tel1_${index}_${encargadoIndex}`}
                                            className="form-control"
                                            name={`tel1_${index}_${encargadoIndex}`}
                                            value={encargado.tel1}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel1", e.target.value)}
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`tel2_${index}_${encargadoIndex}`}>Teléfono 2</label>
                                        <input
                                            type="text"
                                            id={`tel2_${index}_${encargadoIndex}`}
                                            className="form-control"
                                            name={`tel2_${index}_${encargadoIndex}`}
                                            value={encargado.tel2}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel2", e.target.value)}
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`tel3_${index}_${encargadoIndex}`}>Teléfono 3</label>
                                        <input
                                            type="text"
                                            id={`tel3_${index}_${encargadoIndex}`}
                                            className="form-control"
                                            name={`tel3_${index}_${encargadoIndex}`}
                                            value={encargado.tel3}
                                            onChange={(e) => handleEncargadoChange(index, encargadoIndex, "tel3", e.target.value)}
                                            
                                        />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary" onClick={() => handleAddEncargado(index)}>
                                Agregar Encargado
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddSede}>
                        Agregar Sede
                    </button>
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrar Empresa
                </button>
                {message && <p className="mt-3">{message}</p>}
            </form>
        </div>
    );
}

export default Empresafr;
