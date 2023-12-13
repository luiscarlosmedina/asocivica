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
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAuth } from "../../../autenticate";


export default function EmpleadoVer({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const {user} = useAuth();
  const [filterStates, setFilterStates] = useState({
    active: true,
    inactive: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_sisinov/public/api/readminempleado`)
      .then((response) => response.json())
      .then((data) => {
        //setData(data.data); LARAVEL
        setData(data.contenido);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error en la solicitud fetch:', error);
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
      (filterStates.inactive && item.estado === "1");
  
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
      <p className="t-principal-activo h2 mb-4  mt-3">Empleados registrados </p>
      <TextField
        label="Buscar por nombre o documento"
        variant="outlined"
        fullWidth
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
              checked={filterStates.inactive}
              onChange={handleFilterChange}
              name="inactive"
            />
          }
          label="Inactivo"
        />
      </div>
      <div className={`mb-1 mt-1 borsupd border-3 `}></div>
      <TableContainer component={Paper} className="my-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="">Documento</TableCell>
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
                <TableCell colSpan={7} align="centr">
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 && user.ID_rol !== 3 ? (
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
                      : "Inactivo"}
                  </TableCell>
                  <TableCell>
                    <Link to={`/consultar-empleados/${(item.id_em)}`}>
                      <button className="btnfa btn btn-primary">
                         Ver mas
                      </button>
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