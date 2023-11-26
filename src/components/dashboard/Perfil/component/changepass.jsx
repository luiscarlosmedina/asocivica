import React, { useState } from 'react'

export default function Changepass({ id }) {
    const [show, setShow] = useState(false)
    const verificar = () => { (setShow(true)) }
    const cambiar = () => { (setShow(false)) }
    return (
        <div>
            {!show ?
                <div className='row caja-input d-flex align-items-center'>
                    <div className='col'>
                        <label className="t-box">Constraseña actual: </label>
                        <input type="text" className='form-control' />
                    </div>
                    <div className='col'>
                        <button type="button" className="btn btn-outline-primary" onClick={verificar}>Cambiar contraseña</button>
                    </div>
                </div> :
                <div className='row caja-input d-flex align-items-center'>
                    <div className='col'>
                        <label className="t-box">Nueva Constraseña: </label>
                        <input type="text" className='form-control' />
                    </div>
                    <div className='col'>
                        <label className="t-box">Confirme constraseña: </label>
                        <input type="text" className='form-control' />
                    </div>
                    <div className='col'>
                        <button type="button" className="btn btn-outline-primary" onClick={cambiar}>Guardar contraseña</button>
                    </div>
                </div>
            }
        </div>
    )
}
