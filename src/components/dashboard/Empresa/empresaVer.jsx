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

export default function EmpresaVer({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStates, setFilterStates] = useState({
    active: true,
    inStudy: true,
    inactive: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_sisinov/public/api/empresas`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
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
      item.Nom_E.toLowerCase().includes(searchTermLower) ||
      item.Nit_E.toLowerCase().includes(searchTermLower);
  
    // Verificar si el estado cumple con alguna de las condiciones en filterStates
    const matchesFilter =
      (filterStates.active && item.Est_E === "0") ||
      (filterStates.inStudy && item.Est_E === "1") ||
      (filterStates.inactive && item.Est_E === "2");
  
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
      <h3>Empresas</h3>
      <TextField
        label="Buscar por nombre o NIT"
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
              checked={filterStates.inStudy}
              onChange={handleFilterChange}
              name="inStudy"
            />
          }
          label="En estudio"
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
      <TableContainer component={Paper} className="my-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nit</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Representante</TableCell>
              <TableCell>N° Documento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id_e}>
                  <TableCell>{item.Nit_E}</TableCell>
                  <TableCell>{item.Nom_E}</TableCell>
                  <TableCell>{item.Eml_E}</TableCell>
                  <TableCell>{item.telefonoGeneral}</TableCell>
                  <TableCell>{item.Nom_Rl}</TableCell>
                  <TableCell>{item.CC_Rl}</TableCell>
                  <TableCell>
                    {item.Est_E === "0"
                      ? "Activo"
                      : item.Est_E === "1"
                      ? "En Estudio"
                      : "Inactivo"}
                  </TableCell>
                  <TableCell>
                    <Link to={`/consultar-empresas/${(item.id_e)}`}>
                      <Button variant="contained" color="primary">
                        Ver mas
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
