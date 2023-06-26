import React from "react";
import "../../../../style/Empleado/form-emple/b.css";
const B_emple = () => {
    return (
      <form class="box-main">
        <div className="box-main2">
          <div >  
          <label for="validationDefault02" class="form-label">Tipo de Documento</label>
            <select class="form-select" id="validationDefault04" required>
              <option select value="">Seleccione una opción </option>
              <option select value="">Cedula de ciudadania</option>
              <option select value="">Cedula de estrangeria</option>
              <option select value="">Targeta de indentidad</option>
            </select>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Numero de Documento</label>  
            <input type="Number" class="form-control" id="validationDefault01"  required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Barrio</label>
            <input type="text" class="form-control" id="validationBarriot02" required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Dirección</label>
            <input type="text" class="form-control" id="validationBarriot02" required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Telefono celular</label>
            <input type="Number" class="form-control" id="validationBarriot02" required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Telefono fijo</label>
            <input type="Number" class="form-control" id="validationBarriot02" required/>
          </div>

          </div>
    </form>

        
    );
}

export default B_emple;