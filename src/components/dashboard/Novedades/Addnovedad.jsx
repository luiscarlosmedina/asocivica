import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
} from "@mui/material";
import swal from "sweetalert";
import { useAuth } from "../../../autenticate";


export default function Addnovedad() {
    const [data, setData] = useState([]);
    const [newtpnovedad, setNewtpnovedad] = useState({
        Nombre_Tn: "",
        descrip_Tn: "",
    });
    const { user } = useAuth();
    const [showInsertForm, setShowInsertForm] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [errors, setErrors] = useState({}); // Estado para almacenar errores

    const fetchData = () => {
        fetch(`http://localhost/api_sisinov/public/api/tpnov`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleInputChange = (e, T_Nov, fieldName) => {
        const { value } = e.target;
        const newData = data.map((item) => {
            if (item.T_Nov === T_Nov) {
                return { ...item, [fieldName]: value };
            }
            return item;
        });
        setData(newData);
    };

    const saveEnc = async (T_Nov, updatedEncargado) => {
        // Reiniciar los errores antes de realizar una nueva validación
        setErrors({});

        // Validación básica antes de enviar datos al servidor
        if (!newtpnovedad.Nombre_Tn || !newtpnovedad.descrip_Tn) {
            // Mostrar errores
            setErrors({
                Tipo_Novedad: !newtpnovedad.Nombre_Tn ? "Campo es requerido" : "",
                descripcion: !newtpnovedad.descrip_Tn ? "Campo es requerido" : "",
            });
            return;
        }
        try {
            const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updatetpnovedad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEncargado),
            });
            const responseData = await response.json();

            if (responseData) {
                fetchData();
                // Desactivar el modo de edición
                setEditMode({
                    ...editMode,
                    [T_Nov]: false,
                });

                // Quitar mensaje de error si existe
                setErrors({ ...errors, [`N_En_${T_Nov}`]: "", [`tel1_${T_Nov}`]: "", [`tel2_${T_Nov}`]: "", [`tel3_${T_Nov}`]: "" });
            }
        } catch (error) {
            swal("Error!", "Tipo de novedad ya existe", "error");
            console.error("Error:", error);
        }
    };

    const editeTpnov = (T_Nov) => {
        // Activar el modo de edición para el contacto de emergencia
        setEditMode({
            ...editMode,
            [T_Nov]: true,
        });
    };

    const handleInsertSubmit = async () => {
        // Reiniciar los errores antes de realizar una nueva validación
        setErrors({});

        // Validación básica antes de enviar datos al servidor
        if (!newtpnovedad.Nombre_Tn || !newtpnovedad.descrip_Tn) {
            // Mostrar errores
            setErrors({
                Tipo_Novedad: !newtpnovedad.Nombre_Tn ? "Campo es requerido" : "",
                descripcion: !newtpnovedad.descrip_Tn ? "Campo es requerido" : "",
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost/api_sisinov/public/api/tpnov`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newtpnovedad),
            });
            const responseData = await response.json();

            if (responseData) {
                fetchData();
                // Restablecer los campos del formulario después de la inserción
                setNewtpnovedad({
                    Nombre_Tn: "",
                    descrip_Tn: "",
                });
                setShowInsertForm(false);
            }
        } catch (error) {
            swal("Error!", "Tipo de novedad ya existe", "error");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-3">
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <p className="t h2 mb-4  mt-3">Tipos de novedades</p>
                </div>
                {user.ID_rol !== 3 ? <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowInsertForm(!showInsertForm)}
                    >
                        {showInsertForm ? "Cancelar" : "Agregar"}
                    </Button>
                </div> : ""}
            </div>
            <div className={`mb-1 mt-1 borsupd border-3 `}></div>
            {showInsertForm && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="Tipo_Novedad"
                                        label="Tipo de novedad"
                                        variant="outlined"
                                        size="small"
                                        value={newtpnovedad.Nombre_Tn}
                                        onChange={(e) => setNewtpnovedad({ ...newtpnovedad, Nombre_Tn: e.target.value })}
                                        onBlur={() => {
                                            if (!newtpnovedad.Nombre_Tn) {
                                                // Establecer error
                                                setErrors({ ...errors, Nombre_Tn: "tipo de novedad es requerido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, Nombre_Tn: "" });
                                            }
                                        }}
                                        error={Boolean(errors.Nombre_Tn)}
                                        helperText={errors.Nombre_Tn}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="descripcion"
                                        label="Descripcion"
                                        variant="outlined"
                                        value={newtpnovedad.descrip_Tn}
                                        onChange={(e) => setNewtpnovedad({ ...newtpnovedad, descrip_Tn: e.target.value })}
                                        onBlur={() => {
                                            if (!newtpnovedad.descrip_Tn) {
                                                // Establecer error
                                                setErrors({ ...errors, descrip_Tn: "Campo es requerido" });
                                            }
                                        }}
                                        error={Boolean(errors.descrip_Tn)}
                                        helperText={errors.descrip_Tn}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleInsertSubmit}
                                    >
                                        Agregar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Descripcion</TableCell>
                            {user.ID_rol !== 3 ? <TableCell>Mas opciones</TableCell> : ""}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.T_Nov}>
                                <TableCell>
                                    {editMode[item.T_Nov] ? (
                                        <TextField
                                            name="Tipo_Novedad"
                                            label="Tipo de novedad"
                                            variant="outlined"
                                            size="small"
                                            value={item.Tipo_Novedad}
                                            onChange={(e) => handleInputChange(e, item.T_Nov, "Tipo_Novedad")}
                                            onBlur={() => {
                                                if (!item.Tipo_Novedad) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`Tipo_Novedad_${item.T_Nov}`]: "Nombre encargado es requerido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`Tipo_Novedad_${item.T_Nov}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`Tipo_Novedad_${item.T_Nov}`])}
                                            helperText={errors[`Tipo_Novedad_${item.T_Nov}`]}
                                        />
                                    ) : (
                                        item.Nombre_Tn
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.T_Nov] ? (
                                        <TextField
                                            name="descripcion"
                                            label="descripcion"
                                            variant="outlined"
                                            value={item.descripcion}
                                            onChange={(e) => handleInputChange(e, item.T_Nov, "descripcion")}
                                            onBlur={() => {
                                                if (!item.descripcion) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`descripcion_${item.T_Nov}`]: "Campo es requerido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`descripcion_${item.T_Nov}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`descripcion_${item.T_Nov}`])}
                                            helperText={errors[`descripcion_${item.T_Nov}`]}
                                        />
                                    ) : (
                                        item.descrip_Tn
                                    )}
                                </TableCell>
                                {user.ID_rol !== 3 ? <TableCell>
                                    {editMode[item.T_Nov] ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => saveEnc(item.T_Nov, {
                                                    T_Nov: item.T_Nov,
                                                    Nombre_Tn: item.Tipo_Novedad,
                                                    descrip_Tn: item.descripcion,
                                                })}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() => !setEditMode(item.T_Nov)}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                onClick={() => editeTpnov(item.T_Nov)}
                                            >
                                                Editar
                                            </Button>
                                        </>
                                    )}
                                </TableCell> : ""}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
