import { obtenerProductos, Producto } from "./utils.js";
import { obtenerUsuarioEnSesion } from "../session.js";


const renderizarProductos = async () => {
    const productosContainer = document.getElementById('productos');
    const cartCounter = document.getElementById('cart-counter');
    let contadorProductos = localStorage.getItem('cartCounter') || 0;

    const actualizarContador = () => {
        cartCounter.textContent = contadorProductos;
    };

    const data = await obtenerProductos();

    actualizarContador();

    data.familiadeproductos.forEach(productoData => {
        const producto = new Producto(productoData);
        const productoCard = producto.render();
        productosContainer.appendChild(productoCard);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
        window.location.href ="../login.html";
        return;
    }
    renderizarProductos();
});
