import React, { useState, useEffect } from 'react';

function TiempoTranscurrido({ fechaDada }) {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState('');

  useEffect(() => {
    const fechaDadaObj = new Date(fechaDada);
    const fechaActual = new Date();

    const diferenciaEnMilisegundos = fechaActual - fechaDadaObj;
    const diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));
    const diferenciaEnHoras = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60));
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    const diferenciaEnSemanas = Math.floor(diferenciaEnDias / 7);
    const diferenciaEnMeses = Math.floor(diferenciaEnSemanas / 4);
    const diferenciaEnAnios = Math.floor(diferenciaEnMeses / 12);

    if (diferenciaEnMinutos < 60) {
      setTiempoTranscurrido(`Hace ${diferenciaEnMinutos} minutos`);
    } else if (diferenciaEnHoras < 24) {
      setTiempoTranscurrido(`Hace ${diferenciaEnHoras} horas`);
    } else if (diferenciaEnDias < 7) {
      setTiempoTranscurrido(`Hace ${diferenciaEnDias} días`);
    } else if (diferenciaEnSemanas < 4) {
      setTiempoTranscurrido(`Hace ${diferenciaEnSemanas} semana${diferenciaEnSemanas !== 1 ? 's' : ''}`);
    } else if (diferenciaEnMeses < 12) {
      setTiempoTranscurrido(`Hace ${diferenciaEnMeses} mes${diferenciaEnMeses !== 1 ? 'es' : ''}`);
    } else {
      setTiempoTranscurrido(`Hace ${diferenciaEnAnios} año${diferenciaEnAnios !== 1 ? 's' : ''}`);
    }
  }, [fechaDada]);

  return <>{tiempoTranscurrido}</>;
}

export default TiempoTranscurrido;
