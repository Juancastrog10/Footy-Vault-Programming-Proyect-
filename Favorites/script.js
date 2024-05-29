import { Favoritos, eliminarFavorito } from './utils.js';
import { obtenerFavoritos, revisarSesion } from "../session.js";

const renderFavs = async (favs = null) => {
    const usuario = revisarSesion();
    if (!usuario) {
        // Si no hay usuario activo, redirigir a la página de inicio de sesión
        window.location.href = 'login.html';
        return;
    }

    const data = favs || await obtenerFavoritos();
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    if (data.length === 0) {
        // Si no hay favoritos, mostrar un mensaje
        const noFavoritosMessage = document.createElement('p');
        noFavoritosMessage.textContent = 'Aún no has agregado ningún favorito.';
        productosContainer.appendChild(noFavoritosMessage);
    } else {
        data.forEach(favorito => {
            const favoritoObj = new Favoritos(
                favorito.id,
                favorito.image,
                favorito.name,
                favorito.price
            );
            const productoRender = favoritoObj.render();
            productoRender.querySelector('.eliminar-favorito').addEventListener('click', async () => {
                await eliminarFavorito(favorito.id);
                await renderFavs(); // Recargar la página después de eliminar un favorito
            });
            productosContainer.appendChild(productoRender);
        });
    }
};

const filtrarFavoritos = async (termino) => {
    const data = await obtenerFavoritos();
    const favoritosFiltrados = data.filter(favorito => 
        favorito.name.toLowerCase().includes(termino.toLowerCase())
    );
    renderFavs(favoritosFiltrados);
};

document.addEventListener('DOMContentLoaded', () => {
    renderFavs();

    const inputBusqueda = document.getElementById('busq');
    inputBusqueda.addEventListener('input', (event) => {
        filtrarFavoritos(event.target.value);
    });
});
