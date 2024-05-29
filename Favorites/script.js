// script.js de favoritos
import { Favoritos } from './utils.js';
import { obtenerFavoritos, revisarSesion } from "../session.js";

const renderFavs = async () => {
    const usuario = revisarSesion();
    if (!usuario) {
        // Si no hay usuario activo, redirigir a la página de inicio de sesión
        window.location.href = 'login.html';
        return;
    }

    const data = await obtenerFavoritos();
    console.log('Datos obtenidos para renderizar:', data);
    const productosContainer = document.getElementById('productos');

    data.forEach(favorito => {
        const favoritoObj = new Favoritos(
            favorito.id,
            favorito.image,
            favorito.name,
            favorito.price
        );
        const productoRender = favoritoObj.render();
        productosContainer.appendChild(productoRender);
    });
};

document.addEventListener('DOMContentLoaded', renderFavs);
