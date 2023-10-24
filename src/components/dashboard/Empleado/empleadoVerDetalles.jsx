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
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div key={empleado.id_em} >
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h3>Datos Basicos</h3>
                        </div>
                        <div>
                            <button type="button" className="btn btn-link" onClick={() => back('/consultar-empleados')}>Salir</button>
                            <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editarempresa" data-bs-whatever="@mdo"> Editar </button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="card border border-0 col-md-2">
                            <img src={usersPhoto('./pablo.jpg')} className="card-img-top" alt="Image by rawpixel.com on Freepik" />
                            <a href={empleado.contrato} target="_blank" rel="noreferrer">Contrato {empleado.n_em}</a>
                        </div>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='col-md-4 m-auto'>
                                    <p><i className="bi bi-person-fill text-primary"></i> {empleado.n_em + " " + empleado.a_em}</p>
                                    <p><i className="bi bi-envelope-fill text-primary"></i> {empleado.eml_em}</p>
                                    <p><i className="bi bi-buildings-fill text-primary"></i> {empleado.dir_em + " " + empleado.barloc_em}</p>
                                    <p><i className="bi bi-telephone-fill text-primary"></i> {empleado.tel_em}</p>
                                </div>
                                <div className='col-md-4 m-auto'>
                                    <p><span className="text-primary">{empleado.N_TDoc}</span> {empleado.documento}</p>
                                    <p><span className="text-primary">Libreta militar: </span> {empleado.lib_em}</p>
                                    <p><span className="text-primary">Licencia de conduccion: </span>{empleado.lic_emp}</p>
                                    <p><span className="text-primary">Estado: </span> {empleado.estado}</p>  
                                    <p><span className="text-primary">RH: </span> {empleado.T_RH}</p>  
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row my-5'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h3>Parafiscales</h3>
                            </div>
                            <div>

                            </div>
                        </div>
                        <hr />
                        <TableContainer component={Paper}>
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
