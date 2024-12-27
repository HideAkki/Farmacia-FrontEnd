import { useEffect, useState } from "react";
import { URL_USUARIOS } from "../../utilities/router";
import { Header } from "../header";
import { ajaxFunction } from "../../utilities/crud";

export const DirectivoList = function() {


  const [idClickBtn, setIdClickBtn] = useState("");

  /*------------------------- EDITAR -------------------------*/
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cargo, setCargo] = useState("");

  // Función para manejar la apertura del modal de edición
  const handleShowEdit = (id) => {
    setIdToEdit(id);
    setShowModalEdit(true);
  };

  // Función para manejar el cierre del modal de edición
  const handleCloseEdit = () => {
    setShowModalEdit(false);
  };

  // Funciones para manejar los cambios en los campos de entrada
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "idToEdit":
        setIdToEdit(e.target.value);
        break;
      case "nombre":
        setNombre(e.target.value);
        break;
      case "apellido":
        setApellido(e.target.value);
        break;
      case "usuario":
        setUsuario(e.target.value);
        break;
      case "contraseña":
        setContraseña(e.target.value);
        break;
      case "cargo":
        setCargo(e.target.value);
        break;
      default:
        break;
    }
  };

  // Función para manejar la edición
  const handleEdit = async () => {
    try {
      await ajaxFunction(
        {
          id: idToEdit,
          nombre: nombre,
          apellido: apellido,
          usuario: usuario,
          contrasena: contraseña,
          tipoUsuario: cargo,
        },
        "PUT",
        URL_USUARIOS + "/" + idToEdit
      );

      location.reload();
    } catch (error) {
      console.error("Error al editar", error);
    }

    handleCloseEdit(); // Cerrar el modal
  };

  /* GET ENTITY FOR ID */
  useEffect(() => {
    async function getId() {
      try {
        const dataProductos = await ajaxFunction(
          "",
          "GET",
          URL_USUARIOS + "/" + idClickBtn
        );
        const jsonData = await dataProductos.json();

        setIdToEdit(jsonData.id);
        setNombre(jsonData.nombre);
        setApellido(jsonData.apellido);
        setUsuario(jsonData.usuario);
        setContraseña(jsonData.contrasena);
        setCargo(jsonData.tipoUsuario);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    getId();
  }, [idClickBtn]);


  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  
  // Función para manejar el cierre del modal
  const handleClose = () => setShowModal(false);

  // Función para manejar el cambio en el input del ID
  const handleInputChange2 = (e) => setIdToDelete(e.target.value);

  // Función para manejar el envío del formulario
  const handleDelete = () => {
    // Aquí puedes implementar la lógica para eliminar el registro con el ID proporcionado
    console.log("Eliminando ID:", idToDelete);
      async function fetchDelete() {
        try {
          await ajaxFunction("", "DELETE", url + "/" + idToDelete);
        } catch (error) {
          console.error("Error al eliminar", error);
        }
      }
  
    fetchDelete();
    location.reload();
  };

  const url = URL_USUARIOS;

  // Estado para almacenar los datos
  const [data, setData] = useState([]);

  // Llamada asíncrona para obtener los datos
  useEffect(() => {
    async function fetchData() {
      try {
        const dataEmpleados = await ajaxFunction("", "GET", url);
        const jsonData = await dataEmpleados.json();
        setData(jsonData); // Actualiza el estado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchData();
  }, [url]); // El efecto se ejecutará cuando cambie la URL

  // Filtrar solo cargos del tipo "Empleado"
  const empleados = data.filter((info) => info.tipoUsuario === "directivo");

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          {/* Panel de Acciones */}
          <div className="col-md-3">
            <div className="card mt-3">
              <div className="card-header">
                <h5>Panel de Acciones</h5>
              </div>
              <div className="card-body">
                <h6>Filtrar por:</h6>
                <form>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="cargo"
                      />
                      <label className="form-check-label" htmlFor="cargo">
                        Cargo
                      </label>
                    </div>
                  </div>
                  <h6>Acciones Rápidas</h6>
                  <button type="button" className="btn btn-success me-2 m-1">
                    <i className="fas fa-user-plus">
                      <a href="/register" className="text-white">Agregar</a>
                    </i>
                  </button>
                  <button type="button" className="btn btn-danger m-1">
                    <i className="fas fa-user-minus" data-bs-toggle="modal"
                data-bs-target="#deleteModal">Eliminar</i>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Tabla Principal */}
          <div className="col-md-9">
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                {empleados.length > 0 ? (
                  empleados.map((info, index) => (
                    <tr key={index}>
                      <td>{info.id}</td>
                      <td>{info.nombre}</td>
                      <td>{info.apellido}</td>
                      <td>{info.usuario}</td>
                      <td>{info.contrasena}</td>
                      <td>{info.tipoUsuario}</td>
                      <td>
                      <button
                        type="button"
                        className="btn btn-warning m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal" // Activa el modal de edición
                        onClick={() => setIdClickBtn(info.id)}
                      >
                        <i className="fas fa-user-edit"></i> Editar
                      </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No hay datos disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para eliminar */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Eliminar Producto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose} // Cierra el modal cuando se hace clic en la X
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="idToDelete">Ingrese el ID para eliminar:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="idToDelete"
                    value={idToDelete}
                    onChange={handleInputChange2}
                    placeholder="ID del producto"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose} // Cierra el modal al hacer clic en Cancelar
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete} // Llama a la función de eliminación
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showModalEdit ? "show" : ""}`}
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden={!showModalEdit}
        style={{ display: showModalEdit ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Editar Usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseEdit} // Cierra el modal cuando se hace clic en la X
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="idToEdit">ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="idToEdit"
                    name="idToEdit"
                    value={idToEdit}
                    onChange={handleInputChange}
                    placeholder="ID del usuario"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="usuario">Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    name="usuario"
                    value={usuario}
                    onChange={handleInputChange}
                    placeholder="Usuario"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contraseña">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="contraseña"
                    name="contraseña"
                    value={contraseña}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cargo">Cargo:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cargo"
                    name="cargo"
                    value={cargo}
                    onChange={handleInputChange}
                    placeholder="Cargo"
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseEdit} // Cierra el modal al hacer clic en Cancelar
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit} // Llama a la función de edición
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}