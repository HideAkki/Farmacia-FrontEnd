import { useEffect, useState } from 'react';
import { ajaxFunction } from '../utilities/crud';
import { URL_FACTURAS, URL_PRODUCTOS } from '../utilities/router';

export const FacturasTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const [data, setData] = useState([]);

    const handleShowModal = (factura) => {
        setSelectedFactura(factura);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFactura(null);
    };

    async function facturas() {
        try {
            const response = await ajaxFunction("", "GET", URL_FACTURAS);
            const jsonData = await response.json(); // Espera a que se resuelva la promesa
            setData(jsonData); // Ahora jsonData es un array
            console.log(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        facturas();
    }, [])

    const [productosDetalles, setProductosDetalles] = useState([]); // Estado para los productos

    // Método para consultar los productos de la factura
    async function consultarProductos() {
        const detalles = await Promise.all(
            selectedFactura.productos.map(async (element) => {
                try {
                    const response = await ajaxFunction("", "GET", URL_PRODUCTOS + '/' + element.id);
                    const data = await response.json();
                    return { ...data, id: element.id }; // Retorna los detalles con el ID
                } catch (error) {
                    console.log(error);
                    return null; // Manejar errores devolviendo null
                }
            })
        );
        setProductosDetalles(detalles.filter(producto => producto)); // Filtra productos válidos
    }

    // Cargar los productos cuando se recibe una factura
    useEffect(() => {
        if (selectedFactura?.productos) {
            consultarProductos();
        }
    }, [selectedFactura]);

    return (
        <div className="container-fluid">
            <div className="row bg-primary text-white py-2">
                <div className="col-md-1">
                    <img src="logo.png" alt="LOGO" className="img-fluid" />
                </div>
            </div>

            <div className="row">
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
                                        <input className="form-check-input" type="checkbox" id="fecha" />
                                        <label className="form-check-label" htmlFor="fecha">
                                            Fecha
                                        </label>
                                        <input type="date" className="form-control" id="fechaMin" />
                                        <input type="date" className="form-control mt-2" id="fechaMax" />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="monto" />
                                        <label className="form-check-label" htmlFor="monto">
                                            Monto
                                        </label>
                                        <input type="number" className="form-control" id="montoMin" placeholder="Min" />
                                        <input type="number" className="form-control mt-2" id="montoMax" placeholder="Max" />
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="apellidoAZ" />
                                        <label className="form-check-label" htmlFor="apellidoAZ">
                                            Apellido A-Z
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="apellidoZA" />
                                        <label className="form-check-label" htmlFor="apellidoZA">
                                            Apellido Z-A
                                        </label>
                                    </div>
                                </div>                               
                            </form>
                            <button type="button" className="btn btn-success me-2 m-1">
                                <i className="fas fa-user-plus">
                                    <a href="/empleado/facturas/crear" className="text-white">Agregar</a>
                                </i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <table className="table table-bordered mt-3">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Código de Factura</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((factura) => (
                                <tr key={factura.id}>
                                    <td>{factura.id}</td>
                                    <td>{factura.fechaVenta}</td>
                                    <td>
                                        <button
                                            onClick={() => handleShowModal(factura)}
                                            className="btn btn-info"
                                        >
                                            Ver más
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedFactura && (
                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Factura {selectedFactura.id}</h5>
                            </div>
                            <div className="modal-body">
                                <p><strong>Código:</strong> {selectedFactura.id}</p>
                                <p><strong>Fecha:</strong> {selectedFactura.fechaVenta}</p>
                                <p><strong>Cantidad:</strong> {selectedFactura.cantidad}</p>
                                <p><strong>Total:</strong> {selectedFactura.total}</p>
                                <hr />
                                <p><strong>Productos:</strong> {productosDetalles.length > 0 ? (
                                    productosDetalles.map((data) => (
                                        <div key={data.id}>
                                            <p className='m-2'><strong>Nombre:</strong> {data.nombre}</p>
                                            <p className='m-2'><strong>Precio:</strong> {data.precio}</p>
                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p>Cargando productos...</p>
                                )}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
