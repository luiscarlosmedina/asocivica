import React from "react";
import logo from "../../img/logosf.png";
import { useAuth } from "../../autenticate";

const User = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="card my-1 bg-primary text-white text-center p-1">
      <img
        src={logo}
        className="img-fluid m-0"
        alt="foto usuario"
      />
      <div className="card-body p-0">
        <p className="card-title">{user.n_em}</p>
        <p className="card-text">{user.N_rol}</p>
      </div>
    </div>
  );
};

export default User;
