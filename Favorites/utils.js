import { obtenerUsuarioEnSesion, actualizarUsuario } from "../session.js";

export class Favoritos {
    constructor(id, image, name, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
    }

    render() {
        const productoCard = document.createElement('div');
        productoCard.classList.add('items');

        const imagen = new Image();
        imagen.src = this.image;
        imagen.alt = this.name;
        imagen.width = 200;
        imagen.height = 200;

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = this.name;
        nombreProducto.classList.add('nombre-producto');

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `$${this.price}`;
        precioProducto.classList.add('precio-producto');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar de Favoritos';
        botonEliminar.addEventListener('click', () => {
            this.eliminarDeFavoritos();
        });

        productoCard.appendChild(imagen);
        productoCard.appendChild(nombreProducto);
        productoCard.appendChild(precioProducto);
        productoCard.appendChild(botonEliminar);

        return productoCard;
    }

    eliminarDeFavoritos() {
        const usuario = obtenerUsuarioEnSesion();
        usuario.favoritos = usuario.favoritos.filter(id => id !== this.id);
        actualizarUsuario(usuario);
        // Actualizar el contador de productos favoritos
    }
}
