import { useEffect, useState } from "react";
import { URL_PRODUCTOS } from "../../utilities/router";
import { Header } from "../header";
import { ajaxFunction } from "../../utilities/crud";

export const MedicamentosListDirectivo = () => {

  const [ bandera, setBandera ] = useState(false);

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
    </>
  );
}