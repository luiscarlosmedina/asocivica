import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useAuth } from "../../../../autenticate";

export default function ContactoEmergencia({ id, estado }) {

  // Estado para manejar los errores de validación
  const [errores, setErrores] = useState({});
  const [errorestwo, setErrorestwo] = useState({});
  const {token} = useAuth();

  // Obtener la lista de contactos de emergencia al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Estado para almacenar la lista de contactos de emergencia
  const [data, setData] = useState([
    {
      id_cem: "",
      n_coe: "",
      csag: "",
      t_cem: ""
    }
  ]);

  // Estdo para manejar la edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


  // Obtener y cambiar el estado para empezar edición
  const comenzarEdicion = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
  };

  // Obtener y cambiar el estado para cancelar
  const cancelarEdicion = () => {
    swal({
      title: "¿Estás seguro de cancelar la edición?",
      text: "Perderás los cambios realizados.",
      icon: "warning",
      buttons: ["Cancelar", "Confirmar"],
      dangerMode: true,
    }).then((confirmado) => {
      if (confirmado) {
        setIsEditing(false);
        swal("¡Edición cancelada!", {
          icon: "success",
        });
      } else {
        swal("Continuar editando.", {
          icon: "info",
        });
      }
    });
  };

  // Crear un nuevo contacto de emergencia
  const fetchDatatwoCreate = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nuevoContacto
      }),

    };
    fetch(`https://localhost/api_sisinov/public/api/createcontemg`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        swal("¡Éxito!", "Los datos del empleado se creado correctamente.", "success");
        limpiarCampos();
        fetchData();
      })
      .catch((error) => {
        console.error('Error al actualizar los datos del empleado:', error);
        swal("Error", "Hubo un problema al actualizar los datos del empleado.", "error");
      });
  };


  // Obtener la lista de contactos de emergencia
  const fetchData = () => {
    fetch(`http://localhost/api_sisinov/public/api/readcontemg/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "nToken": token }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          setData(result.contenido);
        } else {
          console.error(result.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Actualizar un contacto de emergencia
  const fetchDatacmgUpdate = (contactoId) => {
    const contactoActualizado = data.find((contacto) => contacto.id_cem === contactoId);
    console.log(contactoActualizado)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactoActualizado),
    };

    fetch(`https://localhost/api_sisinov/public/api/updatecontemg`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          swal("¡Éxito!", "Los datos del contacto de emergencia se han actualizado correctamente.", "success");
          setIsEditing(false);
          fetchData();
        } else {
          swal("Error", "Hubo un problema al actualizar los datos del contacto de emergencia.", "error");
        }
      })
      .catch((error) => {
        console.error('Error al actualizar los datos del contacto de emergencia:', error);
        swal("Error", "Hubo un problema al actualizar los datos del contacto de emergencia.", "error");
      });
  };

  const eliminarContacto = (contactoId) => {
    if (data.length === 1) {
      swal("Imposible eliminar", "Debe haber al menos un contacto de emergencia.", "warning");
      return;
    }

    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este contacto de emergencia.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Usuario hizo clic en "Eliminar"
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_cem: contactoId,
          }),
        };
        fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=deletecontemg`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (!data.error) {
              swal("¡Éxito!", "El contacto de emergencia se ha eliminado correctamente.", "success");
              // Actualizar la lista de contactos después de eliminar
              fetchData();
            } else {
              swal("Error", "Hubo un problema al eliminar el contacto de emergencia.", "error");
            }
          })
          .catch((error) => {
            console.error('Error al actualizar los datos del contacto de emergencia:', error);
            swal("Error", "Hubo un problema al actualizar los datos del contacto de emergencia.", "error");
          });

      } else {
        // Usuario hizo clic en "Cancelar"
        swal("Operación cancelada", "El contacto de emergencia no ha sido eliminado.", "info");
      }

    });
  };



  // Estado para almacenar los datos del nuevo contacto
  const [nuevoContacto, setNuevoContacto] = useState({
    id_em: id,
    n_coe: "",
    csag: "",
    t_cem: ""
  });



  const handleInputChangeUpdate = (e, field, index) => {

    const value = e.target.value;
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [field]: value,
      };
      return newData;
    });
    validarCampoUpdate(field, value)
  };

  // Manejar cambios en los campos del nuevo contacto
  const handleNuevoContactoChange = (campo, valor) => {
    setNuevoContacto((prevState) => ({
      ...prevState,
      [campo]: valor
    }));
    validarCampoCreate(campo, valor);
  };

  // Validar si el teléfono existe antes de crear un nuevo contacto
  const fetchDataValidaciontel = () => {
    fetch(`http://localhost/api_proyecto.github.io/api.php?apicall=readtelcontact&t_cem=${nuevoContacto.t_cem}`)
      .then((response) => response.json())
      .then((respuesta) => {
        if (respuesta.encontrado) {
          swal("¡Telefono existente!", "El Teléfono ya existe en el sistema.", "error");
        } else {
          fetchDatatwoCreate();
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Error", "Hubo un error al validar en el sistema. Por favor, inténtalo de nuevo.", "error");
      });
  };


  // Validar campos antes de agregar un nuevo contacto
  const validarcamposc = () => {
    let campos = ["n_coe", "csag", "t_cem"];
    let documentosValidos = true;

    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampoCreate(campo, nuevoContacto[campo]);
      }
    });

    if (documentosValidos) {
      fetchDataValidaciontel();
    } else {
      swal("¡Completa los campos!", "Por favor. Verifica los campos para seguir con el proceso...", "error");
    }

    return documentosValidos;
  };

  const validarEditar = (index) => {
    let campos = ["n_coe", "csag", "t_cem"];
    let documentosValidos = true;

    campos.forEach((campo) => {
      if (documentosValidos) {
        documentosValidos = validarCampoUpdate(campo, data[index][campo]);
      }
    });

    if (documentosValidos) {
      fetchDatacmgUpdate(data[index].id_cem);
    } else {
      swal(
        "¡Completa los campos!",
        "Por favor. Verifica los campos para seguir con el proceso...",
        "error"
      );
    }
  };

  // Validar un campo específico create
  const validarCampoCreate = (nombreCampo, valorCampo) => {
    const nuevosErrores = { ...errores };

    switch (nombreCampo) {
      case "n_coe":
        if (!valorCampo.trim()) {
          nuevosErrores.n_coe = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 30) {
          nuevosErrores.n_coe = "El campo debe tener entre 2 y 30 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.n_coe = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.n_coe;
        }
        break;

      case "csag":
        if (!valorCampo.trim()) {
          nuevosErrores.csag = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
          nuevosErrores.csag = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrores.csag = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrores.csag;
        }
        break;

      case "t_cem":
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(valorCampo)) {
          nuevosErrores.t_cem = "Por favor, ingrese un número de teléfono válido";
        } else {
          delete nuevosErrores.t_cem;
        }
        break;

      default:
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };



  // Validar un campo específico Update
  const validarCampoUpdate = (nombreCampo, valorCampo) => {
    const nuevosErrorestwo = { ...errorestwo };

    switch (nombreCampo) {
      case "n_coe":
        if (!valorCampo.trim()) {
          nuevosErrorestwo.n_coe = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 30) {
          nuevosErrorestwo.n_coe = "El campo debe tener entre 2 y 30 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrorestwo.n_coe = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrorestwo.n_coe;
        }
        break;

      case "csag":
        if (!valorCampo.trim()) {
          nuevosErrorestwo.csag = "Por favor, este campo no puede estar vacío";
        } else if (valorCampo.length < 2 || valorCampo.length > 20) {
          nuevosErrorestwo.csag = "El campo debe tener entre 2 y 19 caracteres";
        } else if (!/^[A-Za-z\s]+$/.test(valorCampo)) {
          nuevosErrorestwo.csag = "Ingrese solo letras y espacios en blanco";
        } else {
          delete nuevosErrorestwo.csag;
        }
        break;

      case "t_cem":
        const telefonoRegex = /^[0-9]{10}$/;
        if (!telefonoRegex.test(valorCampo)) {
          nuevosErrorestwo.t_cem = "Por favor, ingrese un número de teléfono válido";
        } else {
          delete nuevosErrorestwo.t_cem;
        }
        break;

      default:
        break;
    }

    setErrorestwo(nuevosErrorestwo);
    return Object.keys(nuevosErrorestwo).length === 0;
  };




  // Limpiar campos después de agregar un nuevo contacto
  const limpiarCampos = () => {
    setNuevoContacto({
      id_em: id,
      n_coe: "",
      csag: "",
      t_cem: ""
    });
    setErrores({});
    document.getElementById("modalAgregar").classList.remove("show");
    document.body.classList.remove("modal-open");
    const backdrop = document.getElementsByClassName("modal-backdrop")[0];
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
  };

  return (
    <div className={`mt-4 mb-5 ${estado === "0" ? (isEditing ? 'editing-box-main-parafis ' : 'canceled-box-main-parafis') : 'inactive-box-main-parafis'}`}>
      <div className="my-2 row">
        <div className="col-11">
          <p className={estado === "0" ? '  tc t-secundario-activo h4 mb-1 mt-1' : ' tc t-secundario-inativo h4 mb-1 mt-1'}>Contactos de emergencia</p>
        </div>
        <div className="col-1">
          {estado === "0" ? (
            <button className="btn btnfs btn-primary " data-bs-toggle="modal" data-bs-target="#modalAgregar">
              Agregar
            </button>
          ) : null}
        </div>
      </div>
      <div>
        <div className="row">
          {estado === "0" ?

            (<div className="table-contacto-act">
              {/* Encabezado de columnas */}
              <div className="row ">
                <div className="col-act">
                  <strong className="t-box-ver-4" >Nombre Completo</strong>
                </div>
              </div>
              {isEditing ? (
                // Datos de contacto en modo de edición
                data.map((contacto, index) => (
                  <div key={contacto.id_cem} className={`row mb-2 ${isEditing && editingIndex === index ? 'editing-row' : ''}`}>
                    <div className="col-act">
                      <input
                        className={`mt-2 i-para-con-act i-box form-control ${!isEditing || editingIndex !== index ? 'con-disabled' : errorestwo.n_coe ? "is-invalid" : data[index]?.n_coe ? "is-valid" : ""}`}
                        name="n_coe"
                        onChange={(e) => {
                          handleInputChangeUpdate(e, 'n_coe', index)
                        }}
                        type="text"
                        value={data[index]?.n_coe}
                        disabled={!isEditing || editingIndex !== index}
                      />

                      <div className="invalid-feedback">{errorestwo.n_coe}</div>
                    </div>
                    <div className="col-act">
                      <input
                        className={`mt-2 i-para-con-act i-box form-control ${!isEditing || editingIndex !== index ? 'con-disabled' : errorestwo.csag ? "is-invalid" : data[index]?.csag ? "is-valid" : ""}`}
                        name="csag"
                        onChange={(e) => {
                          handleInputChangeUpdate(e, 'csag', index);
                        }}
                        type="text"
                        value={data[index]?.csag}
                        disabled={!isEditing || editingIndex !== index}
                      />
                      <div className="invalid-feedback">{errorestwo.csag}</div>
                    </div>
                    <div className="col-act">
                      <input
                        className={`mt-2 i-para-con-act i-box form-control ${!isEditing || editingIndex !== index ? 'con-disabled' : errorestwo.t_cem ? "is-invalid" : data[index]?.t_cem ? "is-valid" : ""}`}
                        name="t_cem"
                        onChange={(e) => {
                          handleInputChangeUpdate(e, 't_cem', index);
                        }}
                        type="text"
                        value={data[index]?.t_cem}
                        disabled={!isEditing || editingIndex !== index}
                      />
                      <div className="invalid-feedback">{errorestwo.t_cem}</div>
                    </div>
                    <div className="col-2">
                      <div className="row">
                        {editingIndex === index ? (
                          <>
                            <div className="col-6" onClick={() => validarEditar(index)}>
                              <button className="btn btnfs btn-primary editar-btn">
                                <i className="bi bi-arrow-down-square editar-icon"></i>
                                Guardar
                              </button>
                            </div>

                            <div className="col-6" onClick={() => cancelarEdicion()}>
                              <button className="btn btnfd btn-primary eliminar-btn">
                                <i className="bi bi-x-square eliminar-icon"></i>
                                Cancelar
                              </button>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Datos de contacto en modo no de edición
                data.map((contacto, index) => (
                  <div key={contacto.id_cem} className="row mb-2">
                    <div className="col-act">
                      <input disabled className={`e mt-2 i-para-con-act i-box form-control`} value={data[index]?.n_coe} />
                    </div>
                    <div className="col-act">
                      <input disabled className={`e mt-2 i-para-con-act i-box form-control`} value={data[index]?.csag} />
                    </div>
                    <div className="col-act">
                      <input disabled className={`e mt-2 i-para-con-act i-box form-control`} value={data[index]?.t_cem} />
                    </div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col-6" onClick={() => comenzarEdicion(index)}>
                          <button className="btn btnfs btn-primary editar-btn">
                            <i className="bi bi-pencil-square editar-icon" ></i>
                            Editar
                          </button>
                        </div>
                        <div className="col-6">
                          <button className="btn btnfd btn-danger eliminar-btn" onClick={() => eliminarContacto(data.id_cem)}>
                            <i className="bi bi-trash eliminar-icon"></i>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))

              )}
            </div>
            ) : (
              <div className="table-contacto-desa">
                <div className="row mb-2">
                  <div className="col-4">
                    <strong className="t-box-ver-4">Nombre</strong>
                  </div>
                  <div className="col-4">
                    <strong className="t-box-ver-4" >Parentesco</strong>
                  </div>
                  <div className="col-4">
                    <strong className="t-box-ver-4" >Teléfono</strong>
                  </div>

                </div>

                {/* Datos de contacto */}
                {data.map((data) => (
                  <div key={data.id_cem} className="row mb-3">
                    <div className="col-4">
                      <input disabled className={` i-box form-control`} value={data.n_coe} />
                    </div>
                    <div className="col-4">
                      <input disabled className={` i-box form-control`} value={data.csag} />
                    </div>
                    <div className="col-4">
                      <input disabled className={` i-box form-control`} value={data.t_cem} />
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>



      </div >
      <div className="modal fade" id="modalAgregar" aria-hidden="true" data-bs-hidden="limpiarCampos">
        <div className="modal-dialog">
          <div className="modal-content  modal-contenido">
            <div className="modal-header">
              <label className="h4 t-principal-activo">Agregar contacto de emergencia</label>
              <button type="button" onClick={limpiarCampos} className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
            </div>
            <div className="modal-body">
              {/* Formulario para agregar un nuevo contacto */}
              <div className="mb-2">
                <input
                  type="text"
                  name="n_coe"
                  placeholder="Nombre completo"
                  className={`form-control ${errores.n_coe ? "is-invalid" : nuevoContacto.n_coe ? "is-valid" : ""}`}
                  value={nuevoContacto.n_coe}
                  onChange={(e) => handleNuevoContactoChange("n_coe", e.target.value)}
                />
                <div className="invalid-feedback">{errores.n_coe}</div>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className={`form-control ${errores.csag ? "is-invalid" : nuevoContacto.csag ? "is-valid" : ""}`}
                  name="csag"
                  placeholder="Parentesco"
                  value={nuevoContacto.csag}
                  onChange={(e) => handleNuevoContactoChange("csag", e.target.value)}
                />
                <div className="invalid-feedback">{errores.csag}</div>
              </div>
              <div className="mb-2">
                <input
                  type="tel"
                  className={`form-control ${errores.t_cem ? "is-invalid" : nuevoContacto.t_cem ? "is-valid" : ""}`}
                  name="t_cem"
                  placeholder="Teléfono celular o fijo"
                  value={nuevoContacto.t_cem}
                  onChange={(e) => handleNuevoContactoChange("t_cem", e.target.value)}
                />
                <div className="invalid-feedback">{errores.t_cem}</div>
              </div>
              {/* Botón para guardar el nuevo contacto */}
              <button className="btn btnfs btn-primary float-end" onClick={() => validarcamposc()}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}


