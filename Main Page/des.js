import { cargarInformacion, Producto } from "./desutils.js";

const mostrarDetalleProducto = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = Number(urlParams.get('id')); // Convertir a número
        console.log('ID del producto en URL:', productId);

        if (!productId) {
            console.error('ID del producto no proporcionado en la URL');
            return;
        }

        const data = await cargarInformacion();
        console.log('Datos cargados del JSON:', data);

        const productos = data.familiadeproductos.map(item => new Producto(item));
        console.log('Productos después de mapear:', productos);

        const producto = productos.find(item => item.id === productId);
        console.log('Producto encontrado:', producto);

        if (producto) {
            producto.renderDetalle();
        } else {
            console.error('Producto no encontrado en la lista de productos');
        }
    } catch (error) {
        console.error('Error al cargar la información del producto:', error);
    }
};

document.addEventListener('DOMContentLoaded', mostrarDetalleProducto);