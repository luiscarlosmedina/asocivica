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

export default function ContactoEmergencia({ id }) {
    const [data, setData] = useState([]);
    const [newContEmg, setNewContEmg] = useState({
        id_em: id,
        N_CoE: "",
        Csag: "",
        T_CEm: "",
    });
    const [showInsertForm, setShowInsertForm] = useState(false);
    const [editMode, setEditMode] = useState({});
    const [errors, setErrors] = useState({}); // Estado para almacenar errores

    const fetchData = () => {
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readTelSede&id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Función para validar números de teléfono
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{7,10}$/;
        return phoneRegex.test(phone);
    };

    const handleInputChange = (e, ID_En, fieldName) => {
        const { value } = e.target;
        const newData = data.map((item) => {
            if (item.ID_En === ID_En) {
                return { ...item, [fieldName]: value };
            }
            return item;
        });
        setData(newData);
    };

    const saveEnc = async (ID_En, updatedEncargado) => {
        try {
            const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updateencargado`, {
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
                    [ID_En]: false,
                });

                // Quitar mensaje de error si existe
                setErrors({ ...errors, [`N_En_${ID_En}`]: "", [`tel1_${ID_En}`]: "", [`tel2_${ID_En}`]: "", [`tel3_${ID_En}`]: "" });
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
        if (!newContEmg.N_En || !newContEmg.tel1) {
            // Mostrar errores
            setErrors({
                N_En: !newContEmg.N_En ? "Nombre encargado es requerido" : "",
                tel1: !newContEmg.tel1 ? "Teléfono 1 es requerido" : "",
            });
            return;
        }

        // Validar números de teléfono
        if (!validatePhone(newContEmg.tel1) || !validatePhone(newContEmg.tel2) || !validatePhone(newContEmg.tel3)) {
            // Mostrar errores
            setErrors({
                tel1: !validatePhone(newContEmg.tel1) ? "Teléfono 1 no es válido" : "",
                tel2: !validatePhone(newContEmg.tel2) ? "Teléfono 2 no es válido" : "",
                tel3: !validatePhone(newContEmg.tel3) ? "Teléfono 3 no es válido" : "",
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=createencargado`, {
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
                    ID_S: id,
                    N_En: "",
                    tel1: "",
                    tel2: "",
                    tel3: "",
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
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h3>Contactos de emergencia</h3>
                </div>
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setShowInsertForm(!showInsertForm)}
                    >
                        {showInsertForm ? "Cancelar" : "Agregar encargado"}
                    </Button>
                </div>
            </div>
            <hr />
            {showInsertForm && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        name="N_En"
                                        label="Nombre encargado"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.N_En}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, N_En: e.target.value })}
                                        onBlur={() => {
                                            if (!newContEmg.N_En) {
                                                // Establecer error
                                                setErrors({ ...errors, N_En: "Nombre encargado es requerido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, N_En: "" });
                                            }
                                        }}
                                        error={Boolean(errors.N_En)}
                                        helperText={errors.N_En}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="tel1"
                                        label="Telefono 1"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.tel1}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, tel1: e.target.value })}
                                        onBlur={() => {
                                            if (!newContEmg.tel1) {
                                                // Establecer error
                                                setErrors({ ...errors, tel1: "Teléfono 1 es requerido" });
                                            } else if (!validatePhone(newContEmg.tel1)) {
                                                // Establecer error si el teléfono no es válido
                                                setErrors({ ...errors, tel1: "Teléfono 1 no es válido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, tel1: "" });
                                            }
                                        }}
                                        error={Boolean(errors.tel1)}
                                        helperText={errors.tel1}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="tel2"
                                        label="Telefono 2"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.tel2}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, tel2: e.target.value })}
                                        onBlur={() => {
                                            if (newContEmg.tel2 && !validatePhone(newContEmg.tel2)) {
                                                // Establecer error si el teléfono no es válido
                                                setErrors({ ...errors, tel2: "Teléfono 2 no es válido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, tel2: "" });
                                            }
                                        }}
                                        error={Boolean(errors.tel2)}
                                        helperText={errors.tel2}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="tel3"
                                        label="Telefono 3"
                                        variant="outlined"
                                        size="small"
                                        value={newContEmg.tel3}
                                        onChange={(e) => setNewContEmg({ ...newContEmg, tel3: e.target.value })}
                                        onBlur={() => {
                                            if (newContEmg.tel3 && !validatePhone(newContEmg.tel3)) {
                                                // Establecer error si el teléfono no es válido
                                                setErrors({ ...errors, tel3: "Teléfono 3 no es válido" });
                                            } else {
                                                // Quitar mensaje de error si se cumple la validación
                                                setErrors({ ...errors, tel3: "" });
                                            }
                                        }}
                                        error={Boolean(errors.tel3)}
                                        helperText={errors.tel3}
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.ID_En}>
                                <TableCell>
                                    {editMode[item.ID_En] ? (
                                        <TextField
                                            name="N_En"
                                            label="Nombre encargado"
                                            variant="outlined"
                                            size="small"
                                            value={item.N_En}
                                            onChange={(e) => handleInputChange(e, item.ID_En, "N_En")}
                                            onBlur={() => {
                                                if (!item.N_En) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`N_En_${item.ID_En}`]: "Nombre encargado es requerido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`N_En_${item.ID_En}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`N_En_${item.ID_En}`])}
                                            helperText={errors[`N_En_${item.ID_En}`]}
                                        />
                                    ) : (
                                        item.N_En
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_En] ? (
                                        <TextField
                                            name="tel1"
                                            label="Telefono 1"
                                            variant="outlined"
                                            size="small"
                                            value={item.tel1}
                                            onChange={(e) => handleInputChange(e, item.ID_En, "tel1")}
                                            onBlur={() => {
                                                if (!item.tel1) {
                                                    // Establecer error
                                                    setErrors({ ...errors, [`tel1_${item.ID_En}`]: "Teléfono 1 es requerido" });
                                                } else if (!validatePhone(item.tel1)) {
                                                    // Establecer error si el teléfono no es válido
                                                    setErrors({ ...errors, [`tel1_${item.ID_En}`]: "Teléfono 1 no es válido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`tel1_${item.ID_En}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`tel1_${item.ID_En}`])}
                                            helperText={errors[`tel1_${item.ID_En}`]}
                                        />
                                    ) : (
                                        item.tel1
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_En] ? (
                                        <TextField
                                            name="tel2"
                                            label="Telefono 2"
                                            variant="outlined"
                                            size="small"
                                            value={item.tel2}
                                            onChange={(e) => handleInputChange(e, item.ID_En, "tel2")}
                                            onBlur={() => {
                                                if (item.tel2 && !validatePhone(item.tel2)) {
                                                    // Establecer error si el teléfono no es válido
                                                    setErrors({ ...errors, [`tel2_${item.ID_En}`]: "Teléfono 2 no es válido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`tel2_${item.ID_En}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`tel2_${item.ID_En}`])}
                                            helperText={errors[`tel2_${item.ID_En}`]}
                                        />
                                    ) : (
                                        item.tel2
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_En] ? (
                                        <TextField
                                            name="tel3"
                                            label="Telefono 3"
                                            variant="outlined"
                                            size="small"
                                            value={item.tel3}
                                            onChange={(e) => handleInputChange(e, item.ID_En, "tel3")}
                                            onBlur={() => {
                                                if (item.tel3 && !validatePhone(item.tel3)) {
                                                    // Establecer error si el teléfono no es válido
                                                    setErrors({ ...errors, [`tel3_${item.ID_En}`]: "Teléfono 3 no es válido" });
                                                } else {
                                                    // Quitar mensaje de error si se cumple la validación
                                                    setErrors({ ...errors, [`tel3_${item.ID_En}`]: "" });
                                                }
                                            }}
                                            error={Boolean(errors[`tel3_${item.ID_En}`])}
                                            helperText={errors[`tel3_${item.ID_En}`]}
                                        />
                                    ) : (
                                        item.tel3
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editMode[item.ID_En] ? (
                                        <Button
                                            color="primary"
                                            onClick={() => saveEnc(item.ID_En, {
                                                ID_En: item.ID_En,
                                                N_En: item.N_En,
                                                tel1: item.tel1,
                                                tel2: item.tel2,
                                                tel3: item.tel3,
                                            })}
                                        >
                                            Guardar
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                color="primary"
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
