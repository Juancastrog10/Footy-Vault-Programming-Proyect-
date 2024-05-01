import { cargarInformacion } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await cargarInformacion();
    const productosContainer = document.getElementById('productos');
    const cartCounter = document.getElementById('cart-counter');
    let contadorProductos = localStorage.getItem('cartCounter') || 0;

    actualizarContador();

    data.familiadeproductos.forEach(producto => {

        const productContainer = document.createElement('section');
        productContainer.className= "card-container"

        const productoCard = document.createElement('div');
        productoCard.classList.add('items');

        const imagen = new Image();
        imagen.src = producto.image;
        imagen.alt = producto.name;
        imagen.width = 200;
        imagen.height = 200;

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = producto.name;
        nombreProducto.classList.add('nombre-producto'); // Agrega la clase para el nombre del producto

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `$${producto.price}`;
        precioProducto.classList.add('precio-producto'); // Agrega la clase para el precio del producto

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar de Favoritos';
        botonEliminar.addEventListener('click', () => {
        if (contadorProductos > 0) {
        contadorProductos--;
        actualizarContador();
        localStorage.setItem('cartCounter', contadorProductos);
    }
});


        productoCard.appendChild(imagen);
        productoCard.appendChild(nombreProducto);
        productoCard.appendChild(precioProducto);
        productoCard.appendChild(botonEliminar);

        productosContainer.appendChild(productoCard);
    });
    function actualizarContador() {
        cartCounter.textContent = contadorProductos;
    }
});


document.addEventListener("DOMContentLoaded", render);
