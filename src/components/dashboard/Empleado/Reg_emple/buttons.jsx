import React from "react";

function Botones({ onClick }) {


const handleClick = (label) => {
        onClick(label); 
      };


  return (
    <div>
      <div className="box-main">
        <header className="primary-box">
          <div className="box-menu">
            <button onClick={() => handleClick(1)} className="buton_uno sub-menu">
              <div className="box-options">
                <h5>Información empresa</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <button onClick={() => handleClick(2)} className="buton_dos sub-menu">
              <div className="box-options">
              <h5>Información basica 1</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <button onClick={() => handleClick(3)}   className="buton_tres sub-menu">
              <div className="box-options">
                <h5>Información basica 2</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>

            <button onClick={() => handleClick(4)} className="buton_cuatro sub-menu">
              <div className="box-options">
              <h5>Contactos emergencia</h5>
                <div className="circle-options">
                </div>
              </div>
            </button>
            <button onClick={() => handleClick(5)} className="buton_cinco sub-menu">
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
