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
  const { user, token } = useAuth();
  const [data, setData] = useState([]);
  const [newtpnovedad, setNewtpnovedad] = useState({
    nToken: token,
    Nombre_Tn: "",
    descrip_Tn: "",
  });
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [editMode, setEditMode] = useState({});
  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost/api_sisinov/public/api/tpnovs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nToken: token }),
        }
      );
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, T_Nov, fieldName) => {
    const { value } = e.target;
    const newData = data.map((item) =>
      item.T_Nov === T_Nov ? { ...item, [fieldName]: value } : item
    );
    setData(newData);
  };

  const saveEnc = async (T_Nov, updatednovedad) => {
    setErrors({});

    if (!updatednovedad.Nombre_Tn || !updatednovedad.descrip_Tn) {
      setErrors({
        Nombre_Tn: !updatednovedad.Nombre_Tn ? "Campo es requerido" : "",
        descrip_Tn: !updatednovedad.descrip_Tn ? "Campo es requerido" : "",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/api_sisinov/public/api/tnov`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatednovedad),
        }
      );
      const responseData = await response.json();

      if (responseData) {
        fetchData();
        setEditMode({
          ...editMode,
          [T_Nov]: false,
        });
        setErrors({
          ...errors,
          [`N_En_${T_Nov}`]: "",
          [`tel1_${T_Nov}`]: "",
          [`tel2_${T_Nov}`]: "",
          [`tel3_${T_Nov}`]: "",
        });
      }
    } catch (error) {
      swal("Error!", "Tipo de novedad ya existe", "error");
      console.error("Error:", error);
    }
  };

  const editeTpnov = (T_Nov) => {
    setEditMode({
      ...editMode,
      [T_Nov]: true,
    });
  };

  const handleInsertSubmit = async () => {
    setErrors({});

    if (!newtpnovedad.Nombre_Tn || !newtpnovedad.descrip_Tn) {
      setErrors({
        Nombre_Tn: !newtpnovedad.Nombre_Tn ? "Campo es requerido" : "",
        descrip_Tn: !newtpnovedad.descrip_Tn ? "Campo es requerido" : "",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost/api_sisinov/public/api/tpnov`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newtpnovedad),
        }
      );
      const responseData = await response.json();

      if (responseData) {
        fetchData();
        setNewtpnovedad({
          nToken: token,
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
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p className="t h2 mb-4 mt-3">Tipos de novedades</p>
        </div>
        {user.ID_rol !== 3 && (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowInsertForm(!showInsertForm)}
            >
              {showInsertForm ? "Cancelar" : "Agregar"}
            </Button>
          </div>
        )}
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
                    onChange={(e) =>
                      setNewtpnovedad({
                        ...newtpnovedad,
                        Nombre_Tn: e.target.value,
                      })
                    }
                    onBlur={() => {
                      if (!newtpnovedad.Nombre_Tn) {
                        setErrors({
                          ...errors,
                          Nombre_Tn: "tipo de novedad es requerido",
                        });
                      } else {
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
                    onChange={(e) =>
                      setNewtpnovedad({
                        ...newtpnovedad,
                        descrip_Tn: e.target.value,
                      })
                    }
                    onBlur={() => {
                      if (!newtpnovedad.descrip_Tn) {
                        setErrors({
                          ...errors,
                          descrip_Tn: "Campo es requerido",
                        });
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
              {user.ID_rol !== 3 && <TableCell>Mas opciones</TableCell>}
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
                      value={item.Nombre_Tn}
                      onChange={(e) =>
                        handleInputChange(e, item.T_Nov, "Nombre_Tn")
                      }
                      onBlur={() => {
                        if (!item.Nombre_Tn) {
                          setErrors({
                            ...errors,
                            [`Nombre_Tn_${item.T_Nov}`]:
                              "Nombre encargado es requerido",
                          });
                        } else {
                          setErrors({
                            ...errors,
                            [`Nombre_Tn_${item.T_Nov}`]: "",
                          });
                        }
                      }}
                      error={Boolean(errors[`Nombre_Tn_${item.T_Nov}`])}
                      helperText={errors[`Nombre_Tn_${item.T_Nov}`]}
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
                      value={item.descrip_Tn}
                      onChange={(e) =>
                        handleInputChange(e, item.T_Nov, "descrip_Tn")
                      }
                      onBlur={() => {
                        if (!item.descrip_Tn) {
                          setErrors({
                            ...errors,
                            [`descrip_Tn_${item.T_Nov}`]:
                              "Campo es requerido",
                          });
                        } else {
                          setErrors({
                            ...errors,
                            [`descrip_Tn_${item.T_Nov}`]: "",
                          });
                        }
                      }}
                      error={Boolean(errors[`descrip_Tn_${item.T_Nov}`])}
                      helperText={errors[`descrip_Tn_${item.T_Nov}`]}
                    />
                  ) : (
                    item.descrip_Tn
                  )}
                </TableCell>
                {user.ID_rol !== 3 && (
                  <TableCell>
                    {editMode[item.T_Nov] ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            saveEnc(item.T_Nov, {
                              nToken: token,
                              T_Nov: item.T_Nov,
                              Nombre_Tn: item.Nombre_Tn,
                              descrip_Tn: item.descrip_Tn,
                            })
                          }
                        >
                          Guardar
                        </Button>
                        <Button
                          color="primary"
                          onClick={() =>
                            setEditMode({
                              ...editMode,
                              [item.T_Nov]: false,
                            })
                          }
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
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
