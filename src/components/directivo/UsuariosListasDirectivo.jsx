import { Header } from "../header";

export const DirectivoUsuarioList = () => {
  return(
    <>

    <Header></Header>

    <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="container">
              <div className="row justify-content-center">
                  
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                      <div className="card border-0 shadow-lg hover-zoom" style={{width: "auto"}}>
                          <img src="https://via.placeholder.com/250x300?text=Empleado" className="card-img-top" alt="Empleados"/>
                          <div className="card-body text-center">
                              <h5 className="fw-bold"><a href="/directivo/usuarios/empleado">EMPLEADOS </a></h5>
                          </div>
                      </div>
                  </div>
                  
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                      <div className="card border-0 shadow-lg hover-zoom" style={{width: "auto"}}>
                          <img src="https://via.placeholder.com/250x300?text=Administrador" className="card-img-top" alt="Administradores"/>
                          <div className="card-body text-center">
                              <h5 className="fw-bold"><a href="/directivo/usuarios/administrador">ADMINISTRADORES</a></h5>
                          </div>
                      </div>
                  </div>
                  
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-4">
                      <div className="card border-0 shadow-lg hover-zoom" style={{width: "auto"}}>
                          <img src="https://via.placeholder.com/250x300?text=Directivo" className="card-img-top" alt="Directivos"/>
                          <div className="card-body text-center">
                              <h5 className="fw-bold"><a href="/directivo/usuarios/directivos">DIRECTIVOS</a></h5>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}