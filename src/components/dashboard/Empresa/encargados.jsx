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
  const [loading, setLoading] = useState(true);
  const [newEncargado, setNewEncargado] = useState({
    ID_S: id,
    Est_en:"0",
    N_En: "",
    tel1: "",
    tel2: "",
    tel3: "",
  });
  const [showInsertForm, setShowInsertForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost/api_proyecto.github.io/api.php?apicall=readTelSede&id=${id}`
      );
      const result = await response.json();
      setData(result.contenido);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const deleteEnc = async (a) => {
    const dt = {
      ID_En: a,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEncargado({ ...newEncargado, [name]: value });
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
        setLoading(false);
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
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel1"
                    label="Telefono 1"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel1}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel2"
                    label="Telefono 2"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel2}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="tel3"
                    label="Telefono 3"
                    variant="outlined"
                    size="small"
                    value={newEncargado.tel3}
                    onChange={handleInputChange}
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
              item.Est_en === "0" && (
                <TableRow key={item.ID_En}>
                  <TableCell>{item.N_En}</TableCell>
                  <TableCell>{item.telefono.split(',')[0]}</TableCell>
                  <TableCell>{item.telefono.split(',')[1]}</TableCell>
                  <TableCell>{item.telefono.split(',')[2]}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteEnc(item.ID_En)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}