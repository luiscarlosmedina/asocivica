import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VerDetalleNovedad() {
  const [loading, setLoading] = useState(true);
  const { idn } = useParams();
  const back = useNavigate();
  const [Novedad, setNovedad] = useState({
    ID_Novedad: "",
		Fecha_Novedad: "",
		Tipo_Novedad: "",
		Descripcion_Tipo: "",
		Diccionario_Novedad: "",
		Descripcion_Novedad: "",
		Adjunto_Evidencia: "",
		Nombre_Completo_Empleado: "",
		Direccion_Sede: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readnovedad&id=${idn}`)
      .then((response) => response.json())
      .then((data) => {
        setNovedad(data.contenido[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) :(
            <div>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h3>Datos Basicos</h3>
                </div>
                <div>
                  <button type="button" className="btn btn-link" onClick={() => back('/consultar-novedades')}>Salir</button>
                  <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#editarempresa" data-bs-whatever="@mdo"> Editar </button>
                </div>
              </div>
            </div>
        )}
    </div>
  );
      }
