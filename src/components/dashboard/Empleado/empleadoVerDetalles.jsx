import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ContactoEmergencia from './contactoEmergencia';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function EmpleadoVerDetalles() {
    const { empleadoid } = useParams();
    const back = useNavigate();
    const [loading, setLoading] = useState(true);

    const [empleado, setEmpleado] = useState({
        id_em: "",
        documento: "",
        n_em: "",
        a_em: "",
        eml_em: "",
        f_em: "",
        dir_em: "",
        lic_emp: "",
        lib_em: "",
        tel_em: "",
        contrato: "",
        barloc_em: "",
        id_doc: "",
        id_pens: "",
        id_eps: "",
        id_arl: "",
        id_ces: "",
        id_rh: "",
        estado: ""
    });
    const usersPhoto = require.context("../../../assets/empleados", true)

    useEffect(() => {
        fetchData();
    }, []);

    var act_ina = empleado.estado



    const fetchData = () => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempleado&id=${empleadoid}`)
            .then((response) => response.json())
            .then((data) => {
                setEmpleado(data.contenido[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    return (
        <div className='box-mayor-ver-emple'>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div key={empleado.id_em} >
                    <div className='row '>
                        <div className=' row col-9  '>
                            <div className=' col-5' > <p className="t h3 mb-2 mt-3">Información personal del Empleado </p></div>
                        
                        </div>

                        <div className='col-1 mt-2' >
                            <button className="buton-editar btnfs btn btn-primary ">Editar  </button>
                            
                        </div>
                        <div className='col-1 mt-2' >
                            <button className="buton-baja btnfd btn btn-primary ">Dar de baja </button>
                        
                        </div>



                        <div className='col-1 mt-2' >
                            <button type="button" className="buton-regresar btnfa btn btn-primary " onClick={() => back('/consultar-empleados')}>Regresar</button>
                        </div>

                    </div>
                    <div className={`mb-3 mt-2 borsupd border-3 `}></div>
                    <div className="row">
                        <div className="ud-e col-2  card border-photho ">
                        <div className='col-12  mt-1 text-center' >{act_ina === "0" ? (<a className="link-successs">Actualmente: Activo</a>) : (<a className="link-dangerr">Actualmente: Inactivo</a>)}</div>
                            <img src={usersPhoto('./empleado.png')} className="card-img-top  img-emple" alt="Image by rawpixel.com on Freepik" />
                            <button className=" buton-contrato  btnfs btn btn-primary " href={empleado.contrato} target="_blank" rel="noreferrer">Contrato {empleado.n_em}</button>
                        </div>

                        <div className='col-9-uxin '>
                            <div className='row box-datos-basicos '>
                                <div className='col-6 caja-input  '>
                                    <span className="t-box">Nombres y apellidos: </span>
                                    <input className='i-box form-control ' disabled value={empleado.n_em + ' ' + empleado.a_em} />
                                    <span className="t-box">{empleado.N_TDoc}:</span>
                                    <input className='i-box form-control' disabled value={empleado.documento} />
                                    <span className="t-box">Dirección - Barrio y localidad: </span>
                                    <input className='i-box form-control' disabled value={empleado.dir_em + " - " + empleado.barloc_em} />
                                    <span className="t-box">Telefono celular: </span>
                                    <input className='i-box form-control' disabled value={empleado.tel_em} />
                                </div>

                                <div className='col-6 caja-input'>
                                    <span className="t-box">Email: </span>
                                    <input className='i-box form-control' disabled value={empleado.eml_em} />
                                    <span className="t-box">Libreta militar:  </span>
                                    <input className='i-box form-control' disabled value={empleado.lib_em} />
                                    <span className="t-box">Licencia de conducción:  </span>
                                    <input className='i-box form-control' disabled value={empleado.lic_emp} />
                                    <span className="t-box">Tipo de RH:  </span>
                                    <input className='i-box form-control' disabled value={empleado.T_RH} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='row '>
                        <p className="t h3 mt-3  ">Parafiscales</p>
                        <div className={`mb-3 mt-3 borsupd-para border-3 `}></div>

                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pension</TableCell>
                                        <TableCell>Censantias</TableCell>
                                        <TableCell>EPS</TableCell>
                                        <TableCell>ARL</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>

                                            {empleado.N_pens}

                                        </TableCell>
                                        <TableCell>

                                            {empleado.N_ces}

                                        </TableCell>
                                        <TableCell>

                                            {empleado.N_eps}

                                        </TableCell>
                                        <TableCell>

                                            {empleado.N_arl}

                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}
            <div>
                <ContactoEmergencia id={empleadoid} />
            </div>
        </div>
    )
}
