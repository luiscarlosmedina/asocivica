import React from "react";
import "../../../../style/Empleado/form-emple/e.css";
const E_emple = () => {
    return (
      <form class="box-main">
        <div className="box-main2">
                <div class="box1">
                    <label for="validationDefault02" class="form-label">Nombre de contacto 1</label>  
                    <input type="Text" class="form-control" i   d="validationDefault01"  required/>
                </div>
                <div>
                    <label for="validationDefault02" class="form-label">Telefono Celular</label>
                    <input type="text" class="form-control" id="validationBarriot02" required/>
                </div>
                <div className="box2" >
                    <label for="validationDefault02" class="form-label">Telefono fijo</label>
                    <input type="text" class="form-control" id="validationBarriot02" required/>
                </div>


                <div>
                    <label for="validationDefault02" class="form-label">Nombre de contacto 2</label>  
                    <input type="Text" class="form-control" i   d="validationDefault01"  required/>
                </div>
                <div>
                    <label for="validationDefault02" class="form-label">Telefono Celular</label>
                    <input type="text" class="form-control" id="validationBarriot02" required/>
                </div>
                <div>
                    <label for="validationDefault02" class="form-label">Telefono fijo</label>
                    <input type="text" class="form-control" id="validationBarriot02" required/>
                </div>

          </div>
    </form>

        
    );
}

export default E_emple;