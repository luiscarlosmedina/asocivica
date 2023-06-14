import React from "react";
import "../style/home.css";
import banA from "../img/bner2.png";
import banB from "../img/bner1.jpg";
import banC from "../img/bner3.jpg";


const Home = () => {
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={banA} className="d-block w-100 " alt="..." />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img src={banB} className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
        <img src={banC} className="d-block w-100 bg-white" alt="..." />
          <div className="carousel-caption d-flex flex-justify-center d-md-block">
            <h5>Nuestro equipo</h5>
            <p>
              Somos una persona jurídica de beneficio social sin ánimo de lucro
              regido por estatutos, creada con el propósito de mejorar y
              mantener el entorno de Paloquemao en beneficio de la comunidad y
              la actividad comercial.
            </p>
            <p>
              Objetivo 1: Planear, organizar y dirigir acciones con apoyo de la
              Policía Nacional y las autoridades legítimamente constituidas en
              la localidad con el fin de colaborar en el mantenimiento de la
              seguridad ciudadana y prevención del delito.
            </p>
            <p>
              Objetivo 2: Promover la integración, capacitación informal y
              entrenamiento de sus miembros para que participen activamente en
              los planes, programas, proyectos y actividades específicas de la
              Asociación.
            </p>
            <p>
              Objetivo 3: Desarrollar programas de servicio comunitario, así
              como procurar el bienestar y material de sus afiliados.
            </p>
            <p>
              Objetivo 4: Planear, organizar y desarrollar actividades de aseo,
              ornato y embellecimiento y velar por el ordenamiento del tránsito
              y trasporte dentro de su radio de acción.
            </p>

            <p>
              Objetivo 05: Realizar campañas publicitarias institucionales o
              cualquier otra actividad tendiente al progreso del sector.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Home;
