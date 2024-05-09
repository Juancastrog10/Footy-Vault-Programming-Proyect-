export const obtenerProductos = async () => {
  const response = await fetch("https://raw.githubusercontent.com/Juancastrog10/Footy-Vault-Programming-Proyect-/main/Main%20Page/data.json");
  const data = await response.json();
  return data;
};

export class Producto {
  constructor({ id, image, name, price }) {
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

    const link = document.createElement('a');
    link.href = `des.html?id=${this.id}`;

    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar a Favoritos';
    botonAgregar.addEventListener('click', () => {
        this.agregarAFavoritos();
    });

    link.appendChild(imagen);
    link.appendChild(nombreProducto);
    link.appendChild(precioProducto);
    link.appendChild(botonAgregar);

    productoCard.appendChild(link);

    return productoCard;
  }

  agregarAFavoritos() {
    let contadorProductos = localStorage.getItem('cartCounter') || 0;
    contadorProductos++;
    localStorage.setItem('cartCounter', contadorProductos);
    actualizarContador();
  }
}
