import React from "react";
import logo from "../../img/logosf.png";

const User = () => {
  return (
    <div className="card my-1 bg-primary text-white text-center p-1">
      <img
        src={logo}
        className="img-fluid m-0"
        alt="foto usuario"
      />
      <div className="card-body p-0">
        <p className="card-title">Nombre</p>
        <p className="card-text">Rol</p>
      </div>
    </div>
  );
};

export default User;
