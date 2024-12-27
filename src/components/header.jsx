export const Header = function() {
  return (
    <>
      <header className="header p-3 d-flex justify-content-between align-items-center">
          <div className="fw-bold fs-4">LOGO</div>
          <a href="/" className="logout fw-bold">Cerrar Sesion</a>
      </header>
    </>
  );
}