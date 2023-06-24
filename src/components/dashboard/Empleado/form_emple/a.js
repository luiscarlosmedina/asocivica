import React from "react";
import "../../../../style/Empleado/form-emple/a.css";
const F_emple = () => {
    return (
      <form class="box-main">
      <div className="box-main2">
        <div >  
        <label>Estado</label>
        <select class="form-select" id="validationDefault04" required>
        <option select value="">..</option>
          <option select value="">Activo</option>
          <option select value="">Inactivo</option>
        </select>
        </div>

      <div >
        <label  >First name</label>
        <input type="text" class="form-control" id="validationDefault01"  required/>
      </div>


      <div >
        <label for="validationDefault02" class="form-label">Last name</label>
        <input type="text" class="form-control" id="validationDefault02" required/>
      </div>


      <div >
        <label for="validationDefaultUsername" class="form-label">Username</label>
        <div class="input-group">
          <span class="input-group-text" id="inputGroupPrepend2">@</span>
          <input type="text" class="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required/>
        </div>
      </div>


      <div >
        <label for="validationDefault03" class="form-label">City</label>
        <input type="text" class="form-control" id="validationDefault03" required/>
      </div>


      <div >
        <label for="validationDefault05" class="form-label">Zip</label>
        <input type="text" class="form-control" id="validationDefault05" require/>
      </div>
      
      </div>
    </form>

        
    );
}

export default F_emple;