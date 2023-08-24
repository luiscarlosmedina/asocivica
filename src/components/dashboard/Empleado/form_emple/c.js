import React from "react";
import "../../../../style/Empleado/form-emple/c.css";
const C_emple = () => {
    return (
      <form class="box-main">
        <div className="box-main2">
          <div >  
          <label for="validationDefault02" class="form-label">Tipo de libreta militar</label>
            <select class="form-select" id="validationDefault04" required>
              <option select value="">Seleccione una opción </option>
              <option select value="">Libreta de primera clase</option>
              <option select value="">Libreta de segunda clase </option>
            </select>
          </div>
          <div >  
          <label for="validationDefault02" class="form-label">Tipo de licencia de conducción</label>
            <select class="form-select" id="validationDefault04" required>
              <option select value="">Seleccione una opción </option>
              <option select value="">A1</option>
              <option select value="">A2</option>
              <option select value="">B1</option>
              <option select value="">B2</option>
              <option select value="">B3</option>
              <option select value="">C1</option>
              <option select value="">C2</option>
            </select>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Eps</label>  
            <input type="Text" class="form-control" i   d="validationDefault01"  required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Fondo pensional</label>
            <input type="text" class="form-control" id="validationBarriot02" required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Fondo de cesantias </label>
            <input type="text" class="form-control" id="validationBarriot02" required/>
          </div>
          <div>
            <label for="validationDefault02" class="form-label">Arl</label>
            <input type="Number" class="form-control" id="validationBarriot02" required/>
          </div>

          </div>
    </form>

        
    );
}

export default C_emple;