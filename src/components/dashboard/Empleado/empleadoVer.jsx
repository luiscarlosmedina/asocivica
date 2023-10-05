import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function EmpleadoVer({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStates, setFilterStates] = useState({
    active: true,
    disabled: false,
    inactive: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readminempleado`)
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

  const searchTermLower = searchTerm.toLowerCase();

  // Filtrar el arreglo data
  const filteredData = data.filter((item) => {
    // Verificar si searchTermLower está en n_em o documento
    const containsSearchTerm =
      item.n_em.toLowerCase().includes(searchTermLower) ||
      item.documento.toLowerCase().includes(searchTermLower);
  
    // Verificar si el estado cumple con alguna de las condiciones en filterStates
    const matchesFilter =
      (filterStates.active && item.estado === "0") ||
      (filterStates.disabled && item.estado === "1") ||
      (filterStates.inactive && item.estado === "2");
  
    // Retornar true si ambas condiciones se cumplen
    return containsSearchTerm && matchesFilter;
  });
  

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilterStates((prevFilterStates) => ({
      ...prevFilterStates,
      [name]: checked,
    }));
  };

  return (
    <div className="consultar-container">
      <h3>Empleados</h3>
      <TextField
        label="Buscar por nombre o documento"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterStates.active}
              onChange={handleFilterChange}
              name="active"
            />
          }
          label="Activo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterStates.disabled}
              onChange={handleFilterChange}
              name="disabled"
            />
          }
          label="Incapacitado"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filterStates.inactive}
              onChange={handleFilterChange}
              name="inactive"
            />
          }
          label="Inactivo"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id_em}>
                  <TableCell>{item.documento}</TableCell>
                  <TableCell>{item.n_em}</TableCell>
                  <TableCell>{item.a_em}</TableCell>
                  <TableCell>{item.eml_em}</TableCell>
                  <TableCell>{item.tel_em}</TableCell>
                  <TableCell>
                    {item.estado === "0"
                      ? "Activo"
                      : item.estado === "1"
                      ? "Incapacitado"
                      : "Inactivo"}
                  </TableCell>
                  <TableCell>
                    <Link to={item.id_em}>
                      <Button variant="contained" color="primary">
                        Ver mas
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}