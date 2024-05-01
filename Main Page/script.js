import { cargarInformacion } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const renderizarProductos = async () => {
        const actualizarContador = () => {
            cartCounter.textContent = contadorProductos;
        };

        const data = await cargarInformacion();
        const productosContainer = document.getElementById('productos');
        const cartCounter = document.getElementById('cart-counter');
        let contadorProductos = localStorage.getItem('cartCounter') || 0;

        actualizarContador();

        const crearTarjetaProducto = (producto) => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('items');

            const imagen = new Image();
            imagen.src = producto.image; // Asegúrate de que el campo 'image' en el objeto producto tenga la URL de la imagen
            imagen.alt = producto.name;
            imagen.width = 200;
            imagen.height = 200;

            const nombreProducto = document.createElement('p');
            nombreProducto.textContent = producto.name;
            nombreProducto.classList.add('nombre-producto');

            const precioProducto = document.createElement('p');
            precioProducto.textContent = `$${producto.price}`;
            precioProducto.classList.add('precio-producto');

            const link = document.createElement('a');
            link.href = `des.html?id=${producto.id}`;

            const botonAgregar = document.createElement('button');
            botonAgregar.textContent = 'Agregar a Favoritos';
            botonAgregar.addEventListener('click', () => {
                contadorProductos++;
                actualizarContador();
                localStorage.setItem('cartCounter', contadorProductos);
            });

            link.appendChild(imagen);
            link.appendChild(nombreProducto);
            link.appendChild(precioProducto);
            link.appendChild(botonAgregar);

            productoCard.appendChild(link);

            productosContainer.appendChild(productoCard);
        };

        data.familiadeproductos.forEach(producto => {
            crearTarjetaProducto(producto);
        });
    };

    await renderizarProductos();
});
