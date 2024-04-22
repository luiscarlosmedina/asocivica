import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TextField,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from "@mui/material";
import { useAuth } from "../../../autenticate";

export default function Trazabilidad() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const {token} = useAuth();

    const fetchData = () => {
        fetch(`http://localhost/api_sisinov/public/api/readtrazabilidad`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nToken:token}),
        })
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

    useEffect(() => {
        fetchData();
    }, []);

    const searchTermLower = searchTerm.toLowerCase();

    // Filtrar el arreglo data
    const filteredData = data.filter((item) => {
        const description = item.descripcion || ''; // Manejar casos donde item.descripcion podría ser null o undefined
        const containsSearchTerm = description.toLowerCase().includes(searchTermLower);
        return containsSearchTerm;
    });

    return (
        <div>
            <p className="t h2 mb-4 mt-3">Trazabilidad de novedades</p>
            <TextField
                label="Buscar por nombre o NIT"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={`mb-1 mt-1 borsupd border-3 `}></div>
            <TableContainer component={Paper} className="my-3">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID_TR</TableCell>
                            <TableCell>Trazabilidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    <CircularProgress color="primary" />
                                </TableCell>
                            </TableRow>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <TableRow key={item.ID_Tra}>
                                    <TableCell>{item.ID_Tra}</TableCell>
                                    <TableCell>{item.descripcion}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
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
