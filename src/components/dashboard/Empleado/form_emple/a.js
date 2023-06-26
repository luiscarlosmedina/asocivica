import React from "react";
import "../../../../style/Empleado/form-emple/a.css";
const A_emple = () => {
    return (
      <form class="box-main">
        <div className="box-main2">
          <div >  
          <label for="validationDefault02" class="form-label">Estado</label>
            <select class="form-select" id="validationDefault04" required>
              <option select value="">Seleccione una opción </option>
              <option select value="">Activo</option>
              <option select value="">Inactivo</option>
            </select>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Rol</label>
            <input type="text" class="form-control" id="validationDefault01"  required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="validationDefault02" required/>
          </div>
          <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" class="form-text">aqui un texto por una exclamación</div>
          </div>
          <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="exampleInputPassword1"/>
            <div id="emailHelp" class="form-text">aqui un texto por una exclamación</div>
          </div>
          <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
              <label class="form-check-label" for="exampleCheck1">Mostrar contraseña</label>
          </div>
          </div>
    </form>

        
    );
}

export default A_emple;