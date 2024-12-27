import { useEffect, useState } from "react";
import { URL_PRODUCTOS } from "../../utilities/router";
import { Header } from "../header";
import { ajaxFunction } from "../../utilities/crud";

export const MedicamentosList = function() {

  const [ bandera, setBandera ] = useState(false);

  const [idClickBtn, setIdClickBtn] = useState("");

  /*------------------------- EDITAR -------------------------*/
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fechai, setFechai] = useState("");
  const [fechao, setFechao] = useState("");
  const [precio, setPrecio] = useState(0);
  const [clasificacion, setClasificacion] = useState("");
  const [proveedor, setProveedor] = useState("");

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
      case "cantidad":
        setCantidad(e.target.value);
        break;
      case "fachai":
        setFechai(e.target.value);
        break;
      case "fechao":
        setFechao(e.target.value);
        break;
      case "precio":
        setPrecio(e.target.value);
        break;
      case "clasificacion":
        setClasificacion(e.target.value);
        break;
      case "proveedor":
        setProveedor(e.target.value);
        break;
      default:
        break;
    }
  };

  // Función para manejar la edición
  const handleEdit = async () => {
    try {
      await ajaxFunction({
        id: idToEdit,
        nombre: nombre,
        cantidad: cantidad,
        fechaEntrada: fechai,
        fechaCaducidad: fechao,
        precio: precio,
        clasficiacion: clasificacion,
        proveedor: proveedor
      }, "PUT", URL_PRODUCTOS + '/' + idToEdit);

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
          const dataProductos = await ajaxFunction("", "GET", URL_PRODUCTOS + '/' + idClickBtn);
          const jsonData = await dataProductos.json();
          
          console.log(jsonData);

          setIdToEdit(jsonData.id);
          setNombre(jsonData.nombre);
          setCantidad(jsonData.cantidad);
          setFechai(jsonData.fechaEntrada);
          setFechao(jsonData.fechaCaducidad);
          setPrecio(jsonData.precio);
          setClasificacion(jsonData.clasficiacion);
          setProveedor(jsonData.proveedor);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

      getId();
  }, [idClickBtn]);

  /*--------------------- ELIMIANR ----------------------------*/
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

  const url = URL_PRODUCTOS;

  // Estado para almacenar los datos
  const [data, setData] = useState([]);

  // Llamada asíncrona para obtener los datos
  useEffect(() => {
    async function fetchData() {
      try {
        const dataProductos = await ajaxFunction("", "GET", url);
        const jsonData = await dataProductos.json();
        setData(jsonData); // Actualiza el estado

        const hayProductosAgotados = jsonData.some((info) => info.cantidad <= 0);
        setBandera(hayProductosAgotados);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    fetchData();
  }, [url]); // El efecto se ejecutará cuando cambie la URL


  return (
    <>
    <Header></Header>

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
                      id="precio"
                    />
                    <label className="form-check-label" htmlFor="precio">
                      Precio
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="precioMin"
                      placeholder="5000"
                    />
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="apellidoAZ"
                    />
                    <label className="form-check-label" htmlFor="apellidoAZ">
                      Nombre A-Z
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="apellidoZA"
                    />
                    <label className="form-check-label" htmlFor="apellidoZA">
                      Nombre Z-A
                    </label>
                  </div>
                </div>
                <h6>Acciones Rápidas</h6>
                <button type="button" className="btn btn-success mr-2 m-1">
                  <i className="fas fa-user-plus"><a href="/admin/medicamentos/crear" className="text-white">Agregar</a></i>
                </button>
                <button type="button" className="btn btn-danger m-1">
                    <i className="fas fa-user-minus" data-bs-toggle="modal"
                data-bs-target="#deleteModal">Eliminar</i>
                  </button>
              </form>

            </div>
          </div>
              {/* ALERT COMPONENT */}
              {(bandera)? <div className="mt-2 alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Advertencia! </strong><p>Se están agotando algunos medicamentos.</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>: <span></span>}
        </div>

        {/* Tabla */}
        <div className="col-md-9">
          <table className="table table-bordered mt-3">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad Disponible</th>
                <th scope="col">Fecha de Entrada</th>
                <th scope="col">Fecha de Vencimiento</th>
                <th scope="col">Precio</th>
                <th scope="col">Clasificación</th>
                <th scope="col">Proveedor</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                  data.map((info, index) => (
                    <tr key={index}>
                      <td>{info.id}</td>
                      <td>{info.nombre}</td>
                      {(info.cantidad <= 0)? <td className="badge text-bg-danger mt-5">{"Agotado: " + info.cantidad}</td> : <td>{info.cantidad}</td>}
                      <td>{info.fechaEntrada}</td>
                      <td>{info.fechaCaducidad}</td>
                      <td>{info.precio}</td>
                      <td>{info.clasficiacion}</td>
                      <td>{info.proveedor}</td>
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
                    <td colSpan="8" className="text-center">
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

      {/* Modal para Editar */}
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
                Editar Producto
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
                    placeholder="ID del producto"
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
                  <label htmlFor="Cantidad">Cantidad:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Cantidad"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleInputChange}
                    placeholder="Cantidad"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechai">Fecha Entrada:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechai"
                    name="fechai"
                    value={fechai}
                    onChange={handleInputChange}
                    placeholder="fechai"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fechao">Fecha vencimiento:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechao"
                    name="fechao"
                    value={fechao}
                    onChange={handleInputChange}
                    placeholder="Fecha vencimiento"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="precio">Precio:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    value={precio}
                    onChange={handleInputChange}
                    placeholder="precio"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="clasificacion">Clasificacion:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="clasificacion"
                    name="clasificacion"
                    value={clasificacion}
                    onChange={handleInputChange}
                    placeholder="clasificacion"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Proveedor">Proveedor:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Proveedor"
                    name="proveedor"
                    value={proveedor}
                    onChange={handleInputChange}
                    placeholder="Proveedor"
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