import { cargarInformacion, Producto } from "./desutils.js";

const mostrarDetalleProducto = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log('ID del producto:', productId);

        if (!productId) {
            console.error('ID del producto no proporcionado en la URL');
            return;
        }

        const data = await cargarInformacion();
        console.log('Lista de productos:', data.familiadeproductos);

        const productos = data.familiadeproductos.map(item => new Producto(item));
        const producto = productos.find(item => item.id === productId);

        if (producto) {
            console.log('Producto encontrado:', producto);
            producto.render();
        } else {
            console.error('Producto no encontrado en la lista de productos');
        }
    } catch (error) {
        console.error('Error al cargar la información del producto:', error);
    }
};

document.addEventListener('DOMContentLoaded', mostrarDetalleProducto);
