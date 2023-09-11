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
  TablePagination,
} from "@mui/material";

export default function EmpresaVer({ dataUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readempresa&id`)
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

  const handleChangePage = ( newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter(
    (item) =>
      item.Nom_E.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Nit_E.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="consultar-container">
      <h3>Empresas</h3>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
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
                <TableCell colSpan={9} align="center">
                  <CircularProgress color="primary" />
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
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
                        ? "En estudio"
                        : "Inactivo"}
                    </TableCell>
                    <TableCell>
                      <Link to={item.id_e}>
                        <Button variant="contained" color="primary">
                          Ver mas
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
