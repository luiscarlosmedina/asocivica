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
import swal from 'sweetalert';

export default function Encargados({ id }) {
  const [data, setData] = useState([]);
  const [newEncargado, setNewEncargado] = useState({
    ID_S: id,
    Est_en: "0",
    N_En: "",
    tel1: "",
    tel2: "",
    tel3: "",
  });
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [editMode, setEditMode] = useState({});

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readTelSede&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Filtrar encargados activos (Est_en === "0")
        const activeEncargados = data.contenido.filter((item) => item.Est_en === "0");
        setData(activeEncargados);
      })
      .catch((error) => {
        console.log(error);
      });
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editeEnc = (ID_En) => {
    // Activar el modo de edición para el encargado con ID_En
    setEditMode({
      ...editMode,
      [ID_En]: true,
    });
  };

  const deleteEnc = async (ID_En) => {
    const dt = {
      ID_En,
      Est_en: '1'
    };

    try {
      const confirmation = await swal({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado no podrá recuperar este dato',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      });

      if (confirmation) {
        const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=deleteencargado`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dt),
        });

        const responseData = await response.json();

        if (responseData) {
          swal('Eliminado con éxito', { icon: 'success' });
          fetchData();
        }
      } else {
        swal('Informacion a salvo')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInsertSubmit = async () => {
    // Validación básica antes de enviar datos al servidor
    if (!newEncargado.N_En || !newEncargado.tel1) {
      return swal('Campos requeridos', 'Por favor complete el nombre del encargado y al menos un teléfono.', 'error');
    }

    try {
      const response = await fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=createencargado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEncargado),
      });
      const responseData = await response.json();

      if (responseData) {
        fetchData();
        // Restablecer los campos del formulario después de la inserción
        setNewEncargado({
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
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowInsertForm(!showInsertForm)}
      >
        {showInsertForm ? "Cancelar" : "Agregar encargado"}
      </Button>

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
                    value={newEncargado.N_En}
                    onChange={(e) => setNewEncargado({ ...newEncargado, N_En: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel1"
                    label="Telefono 1"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel1}
                    onChange={(e) => setNewEncargado({ ...newEncargado, tel1: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel2"
                    label="Telefono 2"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel2}
                    onChange={(e) => setNewEncargado({ ...newEncargado, tel2: e.target.value })}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel3"
                    label="Telefono 3"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel3}
                    onChange={(e) => setNewEncargado({ ...newEncargado, tel3: e.target.value })}
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
              <TableCell>Nombre encargado</TableCell>
              <TableCell>Telefono 1</TableCell>
              <TableCell>Telefono 2</TableCell>
              <TableCell>Telefono 3</TableCell>
              <TableCell>Opciones</TableCell>
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
                        onClick={() => editeEnc(item.ID_En)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteEnc(item.ID_En)}
                      >
                        Eliminar
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
