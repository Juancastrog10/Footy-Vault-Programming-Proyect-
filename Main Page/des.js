import { cargarInformacion } from './utils.js';

class Producto {
    constructor({ id, image, name, size, description, kit, price }) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.size = size;
        this.description = description;
        this.kit = kit;
        this.price = price;
    }
}

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

            const imgElement = document.querySelector('.product-image');
            const nameElement = document.querySelector('.product-name');
            const sizeElement = document.querySelector('.product-size');
            const descriptionElement = document.querySelector('.product-description');
            const kitElement = document.querySelector('.product-kit');
            const priceElement = document.querySelector('.product-price');

            if (imgElement) imgElement.src = producto.image;
            if (nameElement) nameElement.textContent = producto.name;
            if (sizeElement) sizeElement.textContent = `Size: ${producto.size}`;
            if (descriptionElement) descriptionElement.textContent = `Description: ${producto.description}`;
            if (kitElement) kitElement.textContent = `Kit: ${producto.kit}`;
            if (priceElement) priceElement.textContent = `Price: $${producto.price}`;
        } else {
            console.error('Producto no encontrado en la lista de productos');
        }
    } catch (error) {
        console.error('Error al cargar la información del producto:', error);
    }
};

document.addEventListener('DOMContentLoaded', mostrarDetalleProducto);
