import React from "react";

function FormateadorFecha({ fechaDada }) {
  const formatearFecha = (fecha) => {
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    const fechaFormateada = new Date(fecha).toLocaleDateString(
      "es-ES",
      opciones
    );
    return fechaFormateada;
  };

  const fechaFormateada = formatearFecha(fechaDada);

  return <>{fechaFormateada}</>;
}

export default FormateadorFecha;
