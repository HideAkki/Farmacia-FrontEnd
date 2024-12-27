import { Header } from "./header";

export const HomeDirectivo = function () {
  return (
    <>
      <Header></Header>

      <div className="container-fluid p-4" style={{ backgroundColor: "#e0ffff", minHeight: "100vh" }}>
      <div className="row justify-content-center g-4">
        {/* Card 1 */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card text-center border-0 shadow-lg" style={{ borderRadius: "12px" }}>
            <div className="card-body">
              <div className="icon mb-3 fs-1 text-primary">👤</div>
              <h5 className="fw-bold">
                <a href="/directivo/usuarios" className="text-decoration-none text-dark">
                  Usuarios
                </a>
              </h5>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card text-center border-0 shadow-lg" style={{ borderRadius: "12px" }}>
            <div className="card-body">
              <div className="icon mb-3 fs-1 text-success">💊</div>
              <h5 className="fw-bold text-dark"><a className="text-decoration-none text-dark" href="/directivo/medicamentos">Medicamentos</a></h5>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card text-center border-0 shadow-lg" style={{ borderRadius: "12px" }}>
            <div className="card-body">
              <div className="icon mb-3 fs-1 text-danger">📄</div>
              <h5 className="fw-bold text-dark"><a className="text-decoration-none text-dark" href="/directivo/facturas">Facturas</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}