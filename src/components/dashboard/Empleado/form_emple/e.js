import React from "react";
import "../../../../style/Empleado/form-emple/e.css";
const E_emple = () => {
    return (
      <form class="box-main">
        <div className="box-main2">
        <div >  
          <label for="validationDefault02" class="form-label">Tipo de contrato</label>
            <select class="form-select" id="validationDefault04" required>
              <option select value="">Seleccione una opción </option>
              <option select value="">Contrato a término Fijo</option>
              <option select value="">Contrato a término indefinido</option>
              <option select value="">Contrato de obra o labor</option>
              <option select value="">Contrato civil por prestación de servicios</option>
              <option select value="">Contrato de aprendizaje</option>
              <option select value="">Contrato ocasional, accidental o transitorio de trabajo</option>
            </select>
          </div>
          <div class="box1">
                <label for="validationDefault02" class="form-label"> Descripcion del contrato </label>  
                <input type="Text" class="form-control" id="validationDefault01"  required/>
          </div>

          <div class="mb-3">
                <label for="validationDefault02" class="form-label"> Archivo decontrato</label>  
                <input type="file" class="form-control" aria-label="file example" required/>
                <div class="invalid-feedback">Example invalid form file feedback</div>
          </div>



          </div>
    </form>

    );
}

export default E_emple;