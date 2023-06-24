import React from 'react'
import "../../../style/Empleado/empleadofr.css";
import F_emple from './form_emple/a';

export default function Empleadofr() {
  return (
    <div>
      <h2>Esta plantilla corresponde a la gestion Empleados, esto esta sujeto a sus correspondinetes ajustes</h2>
      <div className='main-box'>
            <header className='primary-box'>
                <div className= "box-menu">
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Información empresa</div>
                        <i className="bi bi-check-circle-fill"></i> 
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Información empleados 1</div>
                        <i className="bi bi-check-circle-fill"></i> 
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Información personal 2</div>
                        <i className="bi bi-check-circle-fill"></i> 
                        </div>
                    </button>

                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Contactos emergencia</div>
                        <i className="bi bi-check-circle-fill"></i> 
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Contrato empleado</div>
                        <i className="bi bi-check-circle-fill"></i> 
                        </div>
                    </button>
                </div>
            </header>
            <section className='secundary-box'>
            <div className='container'>
                <F_emple />
              </div>
            </section>
            
        </div>

    </div>
  )
}