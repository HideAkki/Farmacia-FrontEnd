import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { URL_PRODUCTOS } from "../../utilities/router"
import { ajaxFunction } from "../../utilities/crud";

export const CrearMedicamentoForm = function() {

  const [ bandera, setBandera ] = useState(false);

  const navigate = useNavigate()

  const user = {
    nombre: '',
    cantidad: 0,
    fechaEntrada: '',
    fechaCaducidad: '',
    precio: 0,
    clasficiacion: '',
    proveedor: ''
  }

  async function enviarForm() {

    const url = `${URL_PRODUCTOS}`;

    let response = await ajaxFunction(user, "POST", url);

    console.log(response);

    if(response.ok) {
        navigate('/admin/medicamentos');
    }
    
    if(!response.ok) {
      console.log("No se puede crear el medicamento");
      setBandera(true);
    }
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#e6ffff" }}
    >
      <div className="row w-100">
        {/* Contenedor del Formulario */}
        <div className="col-md-8 offset-md-2 col-lg-4 offset-lg-4 bg-white p-4 rounded shadow">
          <h4 className="text-center mb-4">REGISTRO DE MEDICAMENTO</h4>
          <form>

          <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-bold">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingrese su dato"
                onChange={e => user.nombre = e.target.value}
              />
          </div>

          <div className="mb-3">
              <label htmlFor="apellido" className="form-label fw-bold">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="apellido"
                placeholder="Ingrese su dato"
                onChange={e => user.cantidad = e.target.value}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechai" className="form-label fw-bold">
                Fecha Entrada
              </label>
              <input
                type="date"
                className="form-control"
                id="fechai"
                placeholder="Ingrese su dato"
                onChange={e => user.fechaEntrada = e.target.value}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechao" className="form-label fw-bold">
                Fecha Vencimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="fechao"
                placeholder="Ingrese su dato"
                onChange={e => user.fechaCaducidad = e.target.value}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="precio" className="form-label fw-bold">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                placeholder="Ingrese su dato"
                onChange={e => user.precio = e.target.value}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="clasificion" className="form-label fw-bold">
                Clasificacion
              </label>
              <input
                type="text"
                className="form-control"
                id="clasificion"
                placeholder="Ingrese su dato"
                onChange={e => user.clasficiacion = e.target.value}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="proveedor" className="form-label fw-bold">
                Proveedor
              </label>
              <input
                type="text"
                className="form-control"
                id="proveedor"
                placeholder="Ingrese su dato"
                onChange={e => user.proveedor = e.target.value}
              />
            </div>

            <div className="d-grid">
              <button onClick={(e) => {
                e.preventDefault()

                enviarForm()
              }} className="btn btn-info text-white fw-bold">
                Registrar nuevo medicamento
              </button>
            </div>

            {(bandera)? <small className="text-danger font-bold">Error al registrar el medicamento</small> : <small></small>}
          </form>
        </div>

      </div>
    </div>
  )
}
