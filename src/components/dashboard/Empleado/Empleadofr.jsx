import React from "react";
import A_emple from "./form_emple/a";
import B_emple from "./form_emple/b";
import C_emple from "./form_emple/c";
import D_emple from "./form_emple/d";
import E_emple from "./form_emple/e";

class Empleadofr extends React.Component {
  state = {
    paso: 1,
  };

  siguientePaso = () => {
    const { paso } = this.state;
    this.setState({
      paso: paso + 1,
    });
  };

  handleInputChange = (event) => {
    const { paso } = this.state;
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  anteriorPaso = () => {
    const { paso } = this.state;
    this.setState({
      paso: paso - 1,
    });
  };

  render() {
    switch (this.state.paso) {
      case 1:
        return (
          <A_emple
            handleInputChange={this.handleInputChange}
            siguientePaso={this.siguientePaso}
          />
        );
      case 2:
        return (
          <B_emple
            handleInputChange={this.handleInputChange}
            siguientePaso={this.siguientePaso}
            anteriorPaso={this.anteriorPaso}
          />
        );
      case 3:
        return (
          <C_emple
            handleInputChange={this.handleInputChange}
            siguientePaso={this.siguientePaso}
            anteriorPaso={this.anteriorPaso}
          />
        );

      case 4:
        return (
          <D_emple
            handleInputChange={this.handleInputChange}
            siguientePaso={this.siguientePaso}
            anteriorPaso={this.anteriorPaso}
          />
        );
      case 5:
        return (
          <E_emple
            handleInputChange={this.handleInputChange}
            siguientePaso={this.siguientePaso}
            anteriorPaso={this.anteriorPaso}
          />
        );

      default:
        return <div>error</div>;
    }
  }
}

export default Empleadofr;
