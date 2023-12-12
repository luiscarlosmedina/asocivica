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

export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

export default function ContactoEmergencia({ id }) {
    const [data, setData] = useState([]);
    const [newContEmg, setNewContEmg] = useState({
        N_CoE: "",
        Csag: "",
        id_em: id,
        T_CEm: "",
    });
    
    const [showInsertForm, setShowInsertForm] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [errors, setErrors] = useState({}); // Estado para almacenar errores

    const fetchData = () => {
        fetch(`https://localhost/api_sisinov/public/api/readcontemg/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.contenido);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleInputChange = (e, ID_CEm, fieldName) => {
        const { value } = e.target;
        const newData = data.map((item) => {
            if (item.ID_CEm === ID_CEm) {
                return { ...item, [fieldName]: value };
            }
            return item;
        });
        setData(newData);
    };

    const saveEnc = async (ID_CEm, updatedEncargado) => {
        try {
            const response = await fetch(`https://localhost/api_sisinov/public/api/updatecontemg`, {
                method: 'PUT',
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
                    [ID_CEm]: false,
                });

                // Quitar mensaje de error si existe
                setErrors({ ...errors, [`N_En_${ID_CEm}`]: "", [`tel1_${ID_CEm}`]: "", [`tel2_${ID_CEm}`]: "", [`tel3_${ID_CEm}`]: "" });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const editeContEmg = (ID_CEm) => {
        // Activar el modo de edición para el contacto de emergencia
        setEditMode({
            ...editMode,
            [ID_CEm]: true,
        });
    };

    const handleInsertSubmit = async () => {
        // Reiniciar los errores antes de realizar una nueva validación
        setErrors({});

        // Validación básica antes de enviar datos al servidor
        if (!newContEmg.N_CoE || !newContEmg.T_CEm) {
            // Mostrar errores
            setErrors({
                N_CoE: !newContEmg.N_CoE ? "Nombre encargado es requerido" : "",
                T_CEm: !newContEmg.T_CEm ? "Teléfono es requerido" : "",
            });
            return;
        }

        // Validar números de teléfono
        if (!validatePhone(newContEmg.T_CEm)) {
            // Mostrar errores
            setErrors({
                T_CEm: !validatePhone(newContEmg.T_CEm) ? "Teléfono no es válido" : "",
            });
            return;
        }

        try {
            const response = await fetch(`https://localhost/api_sisinov/public/api/createcontemg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContEmg),
            });
            const responseData = await response.json();

            if (responseData) {
                fetchData();
                // Restablecer los campos del formulario después de la inserción
                setNewContEmg({
                    N_CoE: "",
                    Csag: "",
                    id_em: id,
                    T_CEm: "",
                });
                setShowInsertForm(false);
            }
        } catch (error) {
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
                    <p className="t h3 mb-0 ">Contactos de emergencia</p>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowInsertForm(!showInsertForm)}
                    >
                        {showInsertForm ? "Cancelar" : "Agregar contacto"}
                    </Button>
                </div>
            </div>
            <div className={`mb-3 mt-3  border-3 `}></div>
            {showInsertForm && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="N_CoE"
                                        label="Nombre contacto"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.N_CoE}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, N_CoE: e.target.value })}
                                        onBlur={() => {
                                            if (!newContEmg.N_CoE) {
                                                // Establecer error
                                                setErrors({ ...errors, N_CoE: "Nombre de contacto es requerido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, N_CoE: "" });
                                            }
                                        }}
                                        error={Boolean(errors.N_CoE)}
                                        helperText={errors.N_CoE}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="Csag"
                                        label="Parentesco"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.Csag}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, Csag: e.target.value })}
                                        onBlur={() => {
                                            if (!newContEmg.Csag) {
                                                // Establecer error
                                                setErrors({ ...errors, Csag: "Campo es requerido" });
                                            }
                                        }}
                                        error={Boolean(errors.Csag)}
                                        helperText={errors.Csag}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="T_CEm"
                                        label="Telefono"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.T_CEm}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, T_CEm: e.target.value })}
                                        onBlur={() => {
                                            if (newContEmg.T_CEm && !validatePhone(newContEmg.T_CEm)) {
                                                // Establecer error si el teléfono no es válido
                                                setErrors({ ...errors, T_CEm: "Teléfono no es válido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, T_CEm: "" });
                                            }
                                        }}
                                        error={Boolean(errors.T_CEm)}
                                        helperText={errors.T_CEm}
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
                            <TableCell>Nombre</TableCell>
                            <TableCell>Parentesco</TableCell>
                            <TableCell>Telefono</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.ID_CEm}>
                                <TableCell>
                                    {editMode[item.ID_CEm] ? (
                                        <TextField
                                            name="N_CoE"
                                            label="Nombre encargado"
                                            variant="outlined"
                                            size="small"
                                            value={item.N_CoE}
                                            onChange={(e) => handleInputChange(e, item.ID_CEm, "N_CoE")}
                                            onBlur={() => {
                                                if (!item.N_CoE) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`N_CoE_${item.ID_CEm}`]: "Nombre encargado es requerido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`N_CoE_${item.ID_CEm}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`N_CoE_${item.ID_CEm}`])}
                                            helperText={errors[`N_CoE_${item.ID_CEm}`]}
                                        />
                                    ) : (
                                        item.N_CoE
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_CEm] ? (
                                        <TextField
                                            name="Csag"
                                            label="parentesco"
                                            variant="outlined"
                                            size="small"
                                            value={item.Csag}
                                            onChange={(e) => handleInputChange(e, item.ID_CEm, "Csag")}
                                            onBlur={() => {
                                                if (!item.Csag) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`Csag_${item.ID_CEm}`]: "Campo es requerido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`Csag_${item.ID_CEm}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`Csag_${item.ID_CEm}`])}
                                            helperText={errors[`Csag_${item.ID_CEm}`]}
                                        />
                                    ) : (
                                        item.Csag
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_CEm] ? (
                                        <TextField
                                            name="T_CEm"
                                            label="Telefono"
                                            variant="outlined"
                                            size="small"
                                            value={item.T_CEm}
                                            onChange={(e) => handleInputChange(e, item.ID_CEm, "T_CEm")}
                                            onBlur={() => {
                                                if (item.T_CEm && !validatePhone(item.T_CEm)) {
                                                    // Establecer error si el teléfono no es válido
                                                    setErrors({ ...errors, [`T_CEm_${item.ID_CEm}`]: "Teléfono no es válido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`T_CEm_${item.ID_CEm}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`T_CEm_${item.ID_CEm}`])}
                                            helperText={errors[`T_CEm_${item.ID_CEm}`]}
                                        />
                                    ) : (
                                        item.T_CEm
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_CEm] ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => saveEnc(item.ID_CEm, {
                                                    N_CoE: item.N_CoE,
                                                    Csag: item.Csag,
                                                    T_CEm: item.T_CEm,
                                                    ID_CEm: item.ID_CEm,
                                                })}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={() => !setEditMode(item.ID_CEm)}
                                            >
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="info"
                                                onClick={() => editeContEmg(item.ID_CEm)}
                                            >
                                                Editar
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
