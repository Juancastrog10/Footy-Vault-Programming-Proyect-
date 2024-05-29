export const cargarInformacion = async () => {
    const response = await fetch("https://raw.githubusercontent.com/Juancastrog10/Footy-Vault-Programming-Proyect-/main/Main%20Page/data.json");
    const data = await response.json();
    console.log('Datos cargados desde el JSON:', data); // Agrega este log para verificar los datos cargados
    return data;
  };
  
  export class Producto {
    constructor({ id, image, name, size, description, kit, price }) {
      this.id = id;
      this.image = image;
      this.name = name;
      this.size = size;
      this.description = description;
      this.kit = kit;
      this.price = price;
    }
  
    renderDetalle() {
      const detalleContainer = document.getElementById("detalle-container");
  
      if (!detalleContainer) {
        console.error('El contenedor de detalles no se encontró.');
        return;
      }
  
      const productDetails = document.createElement("div");
      productDetails.classList.add("product-details");
  
      const productImageContainer = document.createElement("div");
      productImageContainer.classList.add("product-image-container");
  
      const imgElement = document.createElement("img");
      imgElement.classList.add("product-image");
      imgElement.src = this.image;
      imgElement.alt = this.name;
  
      productImageContainer.appendChild(imgElement);
  
      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");
  
      const nameElement = document.createElement("h2");
      nameElement.classList.add("product-name");
      nameElement.textContent = this.name;
  
      const sizeElement = document.createElement("p");
      sizeElement.classList.add("product-size");
      sizeElement.textContent = `Size: ${this.size}`;
  
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("product-description");
      descriptionElement.textContent = `Description: ${this.description}`;
  
      const kitElement = document.createElement("p");
      kitElement.classList.add("product-kit");
      kitElement.textContent = `Kit: ${this.kit}`;
  
      const priceElement = document.createElement("p");
      priceElement.classList.add("product-price");
      priceElement.textContent = `Price: $${this.price}`;
  
      productInfo.appendChild(nameElement);
      productInfo.appendChild(sizeElement);
      productInfo.appendChild(descriptionElement);
      productInfo.appendChild(kitElement);
      productInfo.appendChild(priceElement);
  
      productDetails.appendChild(productImageContainer);
      productDetails.appendChild(productInfo);
  
      detalleContainer.appendChild(productDetails);
    }
  }
  