import { useNavigate } from "react-router-dom"
import { ajaxFunction } from "../utilities/crud"
import { URL_USUARIOS } from "../utilities/router"
import { useState } from "react"

export const LoginForm = function() {

  const [ bandera, setBandera ] = useState(false);
  const navigate = useNavigate()

  const user = {
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    tipoUsuario: 'empleado'
  }

  async function enviarForm() {

    const url = `${URL_USUARIOS}/login`;

    let response = await ajaxFunction(user, "POST", url);

    console.log(response);

    if(response.ok) {
      if(user.tipoUsuario == 'empleado') {
        //Reedirige a la vista de empleados
        navigate('/empleado');
      }
  
      if(user.tipoUsuario == 'directivo') {
        //Reedirige a la vista de directivo
        navigate('/directivo');
      }
  
      if(user.tipoUsuario == 'admin') {
        //Reedirige a la vista de admin
        navigate('/admin');
      }
    }
    
    if(!response.ok) {
      console.log("No se puede iniciar sesión");
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
          <h4 className="text-center mb-4">INICIAR SESIÓN</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label fw-bold">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Ingrese su usuario"
                onChange={e => user.usuario = e.target.value}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contrasena" className="form-label fw-bold">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                placeholder="Ingrese su contraseña"
                onChange={e => user.contrasena = e.target.value}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rol" className="form-label fw-bold">
                Selecciona el rol
              </label>
              <br />
              <select name="rol" id="rol" className="form-select" onChange={e => user.tipoUsuario = e.target.value}>
                <option defaultValue="empleado" >Empleado</option>
                <option value="admin">Admin</option>
                <option value="directivo">Directivo</option>
              </select>
            </div>

            <div className="d-grid">
              <button onClick={(e) => {
                e.preventDefault()

                enviarForm()
              }} className="btn btn-info text-white fw-bold">
                Ingresar
              </button>
            </div>



            {(bandera)? <small className="text-danger font-bold">Error al iniciar sesión, credenciales incorrectas</small> : <small></small>}
          </form>
        </div>
      </div>
    </div>
  )
}
