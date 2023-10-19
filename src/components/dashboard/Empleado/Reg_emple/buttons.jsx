import React from "react";

function Botones() {

  return (
    <div>
      <figure className="figure1">
        <blockquote class="blockquote">
          <p>Una cita conocida, contenida en un elemento blockquote.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          Alguien fomoso en <cite title="Título fuente">Título fuente</cite>
        </figcaption>
      </figure>
      <div className="box-main">
        <header className="primary-box">
          <div className="box-menu">
            <button className="buton_uno sub-menu">
              <div className="box-options">
                <h5>Información empresa</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <div className="sep1"></div>
            <button className="buton_dos sub-menu">
              <div className="box-options">
                <h5>Información basica 1</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <div className="sep2"></div>
            <button className="buton_tres sub-menu">
              <div className="box-options">
                <h5>Información basica 2</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <div className="sep3"></div>
            <button className="buton_cuatro sub-menu">
              <div className="box-options">
                <h5>Contactos emergencia</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <div className="sep4"></div>
            <button className="buton_cinco sub-menu">
              <div className="box-options">
                <h5>Contrato empleado</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Botones;
