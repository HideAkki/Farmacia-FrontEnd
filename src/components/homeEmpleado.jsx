import { Header } from "./header";

export const HomeEmpleado = function () {
  return (
    <>
      <Header></Header>

      <div
        className="container-fluid p-4"
        style={{ backgroundColor: "#e0ffff", minHeight: "100vh" }}
      >
        <div className="row justify-content-center g-4">   

          {/* Card 2 */}
          <div className="col-12 col-sm-6 col-md-4">
            <div
              className="card text-center border-0 shadow-lg"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <div className="icon mb-3 fs-1 text-success">💊</div>
                <h5 className="fw-bold text-dark">
                  <a
                    className="text-decoration-none text-dark"
                    href="/empleado/medicamentos"
                  >
                    Medicamentos
                  </a>
                </h5>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-12 col-sm-6 col-md-4">
            <div
              className="card text-center border-0 shadow-lg"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <div className="icon mb-3 fs-1 text-danger">📄</div>
                <h5 className="fw-bold text-dark">
                  <a
                    className="text-decoration-none text-dark"
                    href="/empleado/facturas"
                  >
                    Facturas
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
