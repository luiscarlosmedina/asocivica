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
  MenuItem,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CrearSede from './crearsede'; // Importa tu componente EditarSede aquí
import Encargados from './encargados'; // Importa tu componente Encargados aquí

export default function Sede({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

  const handleToggleSede = (id, isActive) => {
    // Llama a la API para cambiar el estado de activo/inactivo de la sede
    const newIsActive = !isActive; // Invierte el estado actual

    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=togglesede&id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          // Actualiza el estado de activo/inactivo localmente
          const updatedData = data.map((item) => {
            if (item.ID_S === id) {
              return { ...item, activo: newIsActive };
            }
            return item;
          });
          setData(updatedData);
        } else {
          console.error('Error al cambiar el estado de la sede');
        }
      })
      .catch((error) => {
        console.error('Error al cambiar el estado de la sede:', error);
      });
  };

  const handleEliminarSede = (id) => {
    // Llama a la API para eliminar la sede
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=deletesede&id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          // Elimina la sede localmente
          const updatedData = data.filter((item) => item.ID_S !== id);
          setData(updatedData);
        } else {
          console.error('Error al eliminar la sede');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la sede:', error);
      });
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h3>Sedes y encargados</h3>
        </div>
        <div>
          <Button variant="outlined" color="primary" data-bs-toggle="modal" data-bs-target="#sede">
            Agregar sede
          </Button>
        </div>
        {/* Modal */}
        <div className="modal fade" id="sede" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <CrearSede id={id} />
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
                <TableCell>Detalles</TableCell>
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
                    <TableRow>
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
                          <Select
                            fullWidth
                            value={item.Sec_V}
                            onChange={(e) => handleSaveLocally(item.ID_S, 'Sec_V', e.target.value)}
                          >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                          </Select>
                        ) : (
                          item.Sec_V
                        )}
                      </TableCell>
                      <TableCell>
                        {editing[item.ID_S] ? (
                          <>
                            <Button
                              color="primary"
                              onClick={() => handleSaveToAPI(item.ID_S, 'ID_S', item.ID_S)}
                            >
                              Guardar
                            </Button>
                            <button className="btn btn-danger ml-2" onClick={() => setEditing({ ...editing, [item.ID_S]: false })}>
                              <i className="fa fa-times"></i> Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <Button
                              color="primary"
                              onClick={() => handleEdit(item.ID_S)}
                            >
                              Editar
                            </Button>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleExpandSede(item.ID_S)}
                            >
                              Encargados
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.est_sed ? <button className='btn'
                          onClick={() => handleToggleSede(item.ID_S, item.est_sed)}
                        ><i className="bi bi-emoji-smile  text-success"></i></button> : <button className='btn'
                          onClick={() => handleToggleSede(item.ID_S, item.Est_sed)}
                        ><i className="bi bi-emoji-frown text-danger"></i></button>}
                        <Button
                          onClick={() => handleEliminarSede(item.ID_S)}
                        >
                          <i className="bi bi-trash3 text-danger"></i>
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedSede === item.ID_S && (
                      <TableRow>
                        <TableCell colSpan={4}>
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
                  <TableCell colSpan={4} align="center">
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
