import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Accordion,
  AccordionDetails,
  Button,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import EditarSede from './editarsede'; // Importa tu componente EditarSede aquí
import Encargados from './encargados'; // Importa tu componente Encargados aquí

export default function Sede({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ids, setIds] = useState(null);
  const [editing, setEditing] = useState({}); // Para rastrear las filas que se están editando
  const [expandedSede, setExpandedSede] = useState(null); // Para rastrear la sede expandida

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readsede&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.contenido);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleActual = (b) => {
    setIds(b);
  };

  const handleEdit = (id) => {
    // Rastrea el estado de edición para la fila
    setEditing({ ...editing, [id]: true });
  };

  const handleSaveLocally = (id, field, newValue) => {
    // Obtiene el valor editado y el campo correspondiente
    const updatedData = data.map((item) => {
      if (item.ID_S === id) {
        return { ...item, [field]: newValue };
      }
      return item;
    });

    setData(updatedData);
  };

  const handleSaveToAPI = (id, field, newValue) => {
    // Obtiene el objeto de datos correspondiente
    const editedRow = data.find((row) => row.ID_S === id);

    // Actualiza el campo editado en el objeto de la fila
    editedRow[field] = newValue;

    // Envía los datos actualizados a la API
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updatesede`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedRow),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          // Actualiza el estado de edición para esta fila
          setEditing({ ...editing, [id]: false });
          // Puedes realizar una nueva solicitud para actualizar los datos si es necesario
          fetchData();
        } else {
          console.error('Error al actualizar los datos');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar los datos:', error);
      });
  };

  const handleExpandSede = (id) => {
    // Rastrea qué sede está expandida
    setExpandedSede(id === expandedSede ? null : id);
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h3>Sedes y encargados</h3>
        </div>
        <div>
          <button variant="outlined" color="primary" data-bs-toggle="modal" data-bs-target="#sede">
            Agregar sede
          </button>
        </div>
        {/* Modal */}
        <div className="modal fade" id="sede" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <EditarSede id={id} />
        </div>
      </div>
      <hr className='pb-3' />
      <div className="container mt-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Direccion</TableCell>
                <TableCell>Sector de vigilancia</TableCell>
                <TableCell>Mas opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : Array.isArray(data) ? (
                data.map((item) => (
                  <React.Fragment key={item.ID_S}>
                    <TableRow style={{ cursor: 'pointer' }}>
                      <TableCell>
                        {editing[item.ID_S] ? (
                          <TextField
                            fullWidth
                            value={item.Dic_S}
                            onChange={(e) => handleSaveLocally(item.ID_S, 'Dic_S', e.target.value)}
                          />
                        ) : (
                          item.Dic_S
                        )}
                      </TableCell>
                      <TableCell>
                        {editing[item.ID_S] ? (
                          <TextField
                            fullWidth
                            value={item.Sec_V}
                            onChange={(e) => handleSaveLocally(item.ID_S, 'Sec_V', e.target.value)}
                          />
                        ) : (
                          item.Sec_V
                        )}
                      </TableCell>
                      <TableCell>
                        {editing[item.ID_S] ? (
                          <Button
                            color="primary"
                            onClick={() => handleSaveToAPI(item.ID_S, 'ID_S', item.ID_S)}
                          >
                            Guardar
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            onClick={() => handleEdit(item.ID_S)}
                          >
                            Editar
                          </Button>
                        )}
                        <Button variant="contained" color="info" onClick={() => handleExpandSede(item.ID_S)}>
                          Encargados
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedSede === item.ID_S && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Accordion expandIcon={<ExpandMoreIcon />}>
                            <AccordionDetails>
                              <Encargados id={item.ID_S} />
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No existen datos registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
