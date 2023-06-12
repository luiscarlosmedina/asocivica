import React from 'react'
import logo from "../img/logosf.png"

const User = () => {
    return (
        <div className="card mb-3 bg-primary text-white" >
            <div className="row g-0">
                <div className="col-md-4">
                    <img  src={logo} className="img-fluid rounded-start" alt="foto usuario" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-title">Nombre</h6>
                        <p className="card-text">Rol</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
