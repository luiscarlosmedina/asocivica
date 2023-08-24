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
                        <div className='circle-options'>
                        <i className="bi bi-check-circle-fill"></i> 
                        <i class="bi bi-x-circle-fill"></i>
                        </div>
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Información empleados 1</div>
                        <div className='circle-options'>
                        <i className="bi bi-check-circle-fill"></i> 
                        <i class="bi bi-x-circle-fill"></i>
                        </div>
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Información personal 2</div>
                        <div className='circle-options'>
                        <i className="bi bi-check-circle-fill"></i> 
                        <i class="bi bi-x-circle-fill"></i>
                        </div>
                        </div>
                    </button>

                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Contactos emergencia</div>
                        <div className='circle-options'>
                        <i className="bi bi-check-circle-fill"></i> 
                        <i class="bi bi-x-circle-fill"></i>
                        </div>
                        </div>
                    </button>
                    <button className='sub-menu'>
                        <div className='box-options'>
                        <div>Contrato empleado</div>
                        <div className='circle-options'>
                        <i className="bi bi-check-circle-fill"></i> 
                        <i class="bi bi-x-circle-fill"></i>
                        </div>
                        </div>
                    </button>
                </div>
            </header>
            <section className='secundary-box'>
            <div className='container'>
                <F_efmple />
              </div>
            </section>
    
        </div>

    </div>
  )
}