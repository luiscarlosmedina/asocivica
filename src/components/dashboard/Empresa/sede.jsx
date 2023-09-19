import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
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

import CrearSede from './crearsede';
import Encargados from './encargados';

export default function Sede({ id }) {
  // Estados
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [expandedSede, setExpandedSede] = useState(null);
  const [errors, setErrors] = useState({});

  // Efecto para cargar datos
  useEffect(() => {
    fetchData();
  }, []);

  // Función para cargar datos
  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readsede&id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.contenido);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (id) => {
    const isEditable = data.find((item) => item.ID_S === id).est_sed !== '1';
    if (isEditable) {
      setEditing({ ...editing, [id]: true });
    }
  };

  // Función para guardar localmente los cambios en un campo
  const handleSaveLocally = (id, field, newValue) => {
    const updatedData = data.map((item) => (item.ID_S === id ? { ...item, [field]: newValue } : item));
    setData(updatedData);
  };

  // Función para validar direcciones colombianas
  const isColombianAddressValid = (address) => {
    const colombianAddressRegex = /^[A-Za-z0-9\s#-]+$/; // Expresión regular para validar direcciones en Colombia
    return colombianAddressRegex.test(address);
  };

  // Función para manejar el evento onBlur de un campo
  const handleBlur = (id, field, value) => {
    if (field === 'Dic_S' && !isColombianAddressValid(value)) {
      setErrors({ ...errors, [id]: 'La dirección ingresada no es válida.' });
    } else {
      setErrors({ ...errors, [id]: '' });
    }
  };

  // Función para guardar los cambios en la API
  const handleSaveToAPI = (id, field, newValue) => {
    // Realiza la validación aquí antes de enviar los datos a la API
    let isValid = true;
  
    if (field === 'Dic_S' && !isColombianAddressValid(newValue)) {
      // Si el campo es 'Dic_S' y la dirección no es válida, establece isValid en falso
      isValid = false;
      setErrors({ ...errors, [id]: 'La dirección ingresada no es válida para Colombia.' });
    } else {
      setErrors({ ...errors, [id]: '' });
    }
  
    if (isValid) {
      // Si todos los campos son válidos, procede a enviar los datos a la API
      const editedRow = data.find((row) => row.ID_S === id);
      editedRow[field] = newValue;
  
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
            setEditing({ ...editing, [id]: false });
            fetchData();
          } else {
            console.error('Error al actualizar los datos');
          }
        })
        .catch((error) => {
          console.error('Error al actualizar los datos:', error);
        });
    }
  };
  

  // Función para expandir o colapsar una sede
  const handleExpandSede = (id) => {
    setExpandedSede((prevExpanded) => (prevExpanded === id ? null : id));
  };

  // Función para cambiar el estado de una sede
  const handleToggleSede = (id, estado) => {
    const deleteConfirmation = () => {
      swal({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado no podrá recuperar este dato',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((confirmation) => {
        if (confirmation) {
          performDeleteSede(id)
            .then(() => {
              swal('Eliminado con éxito', { icon: 'success' });
              fetchData();
            })
            .catch((error) => {
              console.error('Error al eliminar la sede:', error);
            });
        } else {
          swal('Información a salvo');
        }
      });
    };

    if (estado === '2') {
      deleteConfirmation();
    } else {
      performDeleteSede(id, estado).catch((error) => {
        console.error('Error al cambiar el estado de la sede:', error);
      });
    }
  };

  // Función para realizar la eliminación de una sede
  const performDeleteSede = (id, estado) => {
    const dataToSend = {
      ID_S: id,
      est_sed: estado,
    };

    return fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=updateestsd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          const updatedData = data.map((item) =>
            item.ID_S === id ? { ...item, est_sed: estado } : item
          );
          setData(updatedData);
        } else {
          console.error('Error al cambiar el estado de la sede');
        }
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
                  <TableCell colSpan={4} align="center">
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <React.Fragment key={item.ID_S}>
                    {item.est_sed !== '2' && (
                      <TableRow>
                        <TableCell>
                          {editing[item.ID_S] ? (
                            <>
                              <TextField
                                value={item.Dic_S}
                                onChange={(e) => handleSaveLocally(item.ID_S, 'Dic_S', e.target.value)}
                                onBlur={(e) => handleBlur(item.ID_S, 'Dic_S', e.target.value)}
                              />
                              {errors[item.ID_S] && <div className="text-danger">{errors[item.ID_S]}</div>}
                            </>
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
                                disabled={item.est_sed === '1'}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="contained"
                                color="info"
                                onClick={() => handleExpandSede(item.ID_S)}
                                disabled={item.est_sed === '1'}
                              >
                                Encargados
                              </Button>
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {item.est_sed === '0' ? (
                            <button className='btn' onClick={() => handleToggleSede(item.ID_S, '1')}>
                              <i className="bi bi-emoji-smile  text-success"></i>
                            </button>
                          ) : (
                            <button className='btn' onClick={() => handleToggleSede(item.ID_S, '0')}>
                              <i className="bi bi-emoji-frown text-warning"></i>
                            </button>
                          )}
                          <Button onClick={() => handleToggleSede(item.ID_S, '2')}>
                            <i className="bi bi-trash3 text-danger"></i>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
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
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
