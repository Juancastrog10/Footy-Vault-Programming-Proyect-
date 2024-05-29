import { obtenerProductos, Producto } from "./utils.js";
import { obtenerUsuarioEnSesion } from "../session.js";

const renderizarProductos = async (productos = null) => {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = ''; // Limpiar productos existentes
    const cartCounter = document.getElementById('cart-counter');
    let contadorProductos = localStorage.getItem('cartCounter') || 0;

    const actualizarContador = () => {
        cartCounter.textContent = contadorProductos;
    };

    const data = productos || await obtenerProductos();

    actualizarContador();

    data.familiadeproductos.forEach(productoData => {
        const producto = new Producto(productoData);
        const productoCard = producto.render();
        productosContainer.appendChild(productoCard);
    });
};

const filtrarProductos = async (termino) => {
    const data = await obtenerProductos();
    const productosFiltrados = data.familiadeproductos.filter(producto => 
        producto.name.toLowerCase().includes(termino.toLowerCase())
    );
    renderizarProductos({ familiadeproductos: productosFiltrados });
};

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActivo = obtenerUsuarioEnSesion();
    if (!usuarioActivo) {
        window.location.href = "../login.html";
        return;
    }

    renderizarProductos();

    const inputBusqueda = document.getElementById('busq');
    inputBusqueda.addEventListener('input', (event) => {
        filtrarProductos(event.target.value);
    });
});
