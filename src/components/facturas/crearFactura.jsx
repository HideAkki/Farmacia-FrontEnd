import { useEffect, useState } from "react";
import { ajaxFunction } from "../../utilities/crud";
import { Header } from "../header";
import { URL_FACTURAS, URL_PRODUCTOS } from "../../utilities/router";

export const CrearFactura = () => {
  const [ bandera, setBandera ] = useState(false);

  const [total, setTotal] = useState(0); // Total acumulado
  const [productos, setProductos] = useState([]); // IDs de los productos
  const [cantidades, setCantidades] = useState([]); // Cantidades ingresadas
  const [data, setData] = useState([]); // Datos de la base de datos
  const [fecha, setFecha] = useState(''); // Datos de la base de datos

  const factura = {
    fechaVenta: fecha,
    cantidad: 0,
    total: total,
    productos: []
  }

  // Obtener la lista de productos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxFunction("", "GET", URL_PRODUCTOS);
        const jsonData = await response.json();
        setData(jsonData);

        const hayProductosAgotados = jsonData.some((info) => info.cantidad <= 0);
        setBandera(hayProductosAgotados);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  // Función para manejar cambios en los inputs de producto y cantidad
  const handleInputChange = (index, type, value) => {
    if (type === "producto") {
      const newProductos = [...productos];
      newProductos[index] = value;
      setProductos(newProductos);
    } else if (type === "cantidad") {
      const newCantidades = [...cantidades];
      newCantidades[index] = parseInt(value) || 0;
      setCantidades(newCantidades);
    }
  };

  // Función para crear factura y actualizar cantidades
  const handleFactura = async (e) => {
    e.preventDefault();
    let nuevoTotal = 0;

    for (let i = 0; i < productos.length; i++) {
      const id = productos[i];
      const cantidadInput = cantidades[i] || 0;

      if (id && cantidadInput > 0) {
        try {
          // Obtener el producto actual
          const response = await ajaxFunction("", "GET", `${URL_PRODUCTOS}/${id}`);
          const producto = await response.json();

          // Calcular el total acumulado (precio * cantidad)
          const subtotal = producto.precio * cantidadInput;
          nuevoTotal += subtotal;

          // Actualizar la cantidad en la base de datos
          const nuevaCantidad = producto.cantidad - cantidadInput;
          await ajaxFunction({ cantidad: nuevaCantidad }, "PUT", `${URL_PRODUCTOS}/${id}`);
        } catch (error) {
          console.error(`Error al actualizar el producto ${id}:`, error);
        }
      }
    }

    setTotal(nuevoTotal); // Actualizar el total acumulado

    factura.total = nuevoTotal;

    cantidades.forEach(el => {
      factura.cantidad = factura.cantidad + el;
    })

    productos.forEach(el => {
      factura.productos.push({
        id: el
      });
    })

    requestFacturaasync();
  };

  async function requestFacturaasync() {
    try {
      const response = await ajaxFunction(factura, "POST", URL_FACTURAS)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      <div className="container d-flex">
        <div className="container">
          <h4 className="text-center mb-4 mt-5">Registrar una factura</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label fw-bold">
                Fecha Venta
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="mb-4 my-2">
              <label className="form-label fw-bold">Productos</label>
              {[0, 1, 2, 3].map((index) => (
                <div className="d-flex my-2" key={index}>
                  <input
                    type="text"
                    className="form-control w-auto"
                    placeholder="ID del producto"
                    onChange={(e) => handleInputChange(index, "producto", e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cantidad"
                    onChange={(e) => handleInputChange(index, "cantidad", e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label htmlFor="total" className="form-label fw-bold">
                Total
              </label>
              <input type="number" className="form-control" id="total" value={total} disabled />
            </div>

            <div className="d-grid">
              <button onClick={handleFactura} className="btn btn-info text-white fw-bold">
                Crear Factura
              </button>
            </div>
          </form>
          {/* ALERT COMPONENT */}
          {(bandera)? <div className="mt-2 alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Advertencia! </strong><p>Se están agotando algunos medicamentos.</p>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>: <span></span>}
        </div>
        

        {/* Tabla de productos */}
        <div className="row container">
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
};
