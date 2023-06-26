import React from "react";
import Navbar from "./navbar";
import Options from "./options";
import User from "./User";
import Content from "./Content";
import Home from "./Home";
import "../../style/app.css";

export default function Dashboard() {
  return(
  <div>
    <Navbar />
    <div className="container-fluid d-flex flex-column">
      <div className="row">
        <div className="col-1 uno">
          <User />
          <Options />
        </div>
        <div className="col container-fluid dos">
          <Content />
        </div>
      </div>
    </div>
  </div>
  );
}
