import { useEffect, useState } from "react";
import { ajaxFunction } from "../../utilities/crud";
import { Header } from "../header";
import { URL_USUARIOS } from "../../utilities/router";

export const DirectivoListDirectivo = () => {
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

  return(
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
    </>
  );
}