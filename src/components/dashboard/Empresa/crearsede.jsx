import React, { useState } from 'react';
import swal from 'sweetalert';

export default function CrearSede({ id }) {
  const initialSedeData = {
    Dic_S: '',
    Sec_V: '0', // Inicializar con un valor no válido
    N_En: '',
    tel1: '',
    tel2: '',
    tel3: '',
  };

  const [sedeData, setSedeData] = useState(initialSedeData);
  const [errors, setErrors] = useState({});

  const colombianAddressRegex = /^[A-Za-z0-9\s#áéíóúÁÉÍÓÚñÑ,.-]{5,}$/;
  const phoneRegex = /^\d{7,10}$/;
  const nameRegex = /^[A-Za-z\s]*$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSedeData({
      ...sedeData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'Dic_S':
        if (!colombianAddressRegex.test(value)) {
          error = 'Ingrese una dirección válida.';
        }
        break;
      case 'Sec_V':
        if (value === '0') {
          error = 'Seleccione un sector válido.';
        }
        break;
      case 'N_En':
        if (!nameRegex.test(value)) {
          error = 'Ingrese un nombre válido sin caracteres especiales.';
        }
        break;
      case 'tel1':
      case 'tel2':
      case 'tel3':
        if (!phoneRegex.test(value)) {
          error = 'Ingrese un número de teléfono válido en el formato (123) 456-7890.';
        }
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const isFormValid = () => {
    const fieldNames = ['Dic_S', 'Sec_V', 'N_En', 'tel1', 'tel2', 'tel3'];

    for (const fieldName of fieldNames) {
      if (!sedeData[fieldName]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const fieldNames = ['Dic_S', 'Sec_V', 'N_En', 'tel1', 'tel2', 'tel3'];
    let hasErrors = false;

    const newErrors = {};
    fieldNames.forEach((fieldName) => {
      handleBlur({ target: { name: fieldName, value: sedeData[fieldName] } });
      if (errors[fieldName]) {
        hasErrors = true;
        newErrors[fieldName] = errors[fieldName];
      }
    });

    if (hasErrors || !isFormValid()) {
      setErrors(newErrors);
      swal('Error de validación', 'Por favor, complete todos los campos y corrija los errores antes de enviar el formulario.', 'error');
      return;
    }

    // Todos los campos son válidos y no están vacíos, enviar los datos
    const sede = {
      ...sedeData,
      id_e: id,
      Est_en: '0',
    };

    fetch('http://localhost/api_proyecto.github.io/api.php?apicall=createsede', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sede),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          swal('Ocurrió un error!', 'Error al crear sede', 'error');
        } else {
          setSedeData(initialSedeData);
          setTimeout(function () {
            window.location.reload();
          }, 1200);
          swal('¡Buen trabajo!', 'Sede creada correctamente', 'success');
        }
      })
      .catch((error) => {
        swal('¡Algo salió mal!', 'Inténtalo más tarde', 'error');
        console.log(error);
      });
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="agregarsede">
            Nueva sede
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="Direccion">Dirección de sede </label>
              <input
                type="text"
                id="Direccion"
                className={`form-control ${errors.Dic_S ? 'is-invalid' : ''}`}
                name="Dic_S"
                value={sedeData.Dic_S}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'Dic_S', value: sedeData.Dic_S } })}
              />
              {errors.Dic_S && (
                <div className="invalid-feedback">{errors.Dic_S}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Sector">Sector de vigilancia</label>
              <select
                id="Sector"
                name="Sec_V"
                value={sedeData.Sec_V}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'Sec_V', value: sedeData.Sec_V } })}
                className={`form-select ${errors.Sec_V ? 'is-invalid' : ''}`}
              >
                <option value="0">Seleccione un sector</option>
                <option value="1">Sector 1</option>
                <option value="2">Sector 2</option>
                <option value="3">Sector 3</option>
                <option value="4">Sector 4</option>
              </select>
              {errors.Sec_V && (
                <div className="invalid-feedback">{errors.Sec_V}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="nombre">Nombre encargado</label>
              <input
                type="text"
                id="nombre"
                className={`form-control ${errors.N_En ? 'is-invalid' : ''}`}
                name="N_En"
                value={sedeData.N_En}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'N_En', value: sedeData.N_En } })}
              />
              {errors.N_En && (
                <div className="invalid-feedback">{errors.N_En}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tel1">Teléfono encargado 1</label>
              <input
                type="text"
                id="tel1"
                className={`form-control ${errors.tel1 ? 'is-invalid' : ''}`}
                name="tel1"
                value={sedeData.tel1}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'tel1', value: sedeData.tel1 } })}
              />
              {errors.tel1 && (
                <div className="invalid-feedback">{errors.tel1}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tel2">Teléfono encargado 2</label>
              <input
                type="text"
                id="tel2"
                className={`form-control ${errors.tel2 ? 'is-invalid' : ''}`}
                name="tel2"
                value={sedeData.tel2}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'tel2', value: sedeData.tel2 } })}
              />
              {errors.tel2 && (
                <div className="invalid-feedback">{errors.tel2}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tel3">Teléfono encargado 3</label>
              <input
                type="text"
                id="tel3"
                className={`form-control ${errors.tel3 ? 'is-invalid' : ''}`}
                name="tel3"
                value={sedeData.tel3}
                onChange={handleInputChange}
                onBlur={() => handleBlur({ target: { name: 'tel3', value: sedeData.tel3 } })}
              />
              {errors.tel3 && (
                <div className="invalid-feedback">{errors.tel3}</div>
              )}
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
