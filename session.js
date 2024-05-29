// session.js general
import { cargarInformacion } from "./Main Page/desutils.js";
const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    return usuarios ? JSON.parse(usuarios) : [];
};

export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);
    if (!usuarioActivo) {
        return null;
    }
    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.id === parseInt(usuarioActivo)) || null;
};

export const obtenerFavoritos = async () => {
    const user = obtenerUsuarioEnSesion();
    const favoritos = [];
  
    const data = await cargarInformacion();
  
    for (const llave in data) {
      const listaProductos = data[llave]; //obteniendo la lista de productos que le corresponde a esa llave
  
      //Recorrer la lista de productos buscando aquellos productos cuyo ID este en el arreglo de favoritos del usuario.
      for (const product of listaProductos) {
        if (user.favoritos.includes(product.id)) {
          favoritos.push(product);
        }
      }
    }
  
    return favoritos;
  };



export const registrar = (firstName, lastName, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const usuarios = obtenerUsuarios();

    for (const usuario of usuarios) {
        if (usuario.email === email) {
            throw new Error("Email is already registered");
        }
    }

    usuarios.push({
        id: new Date().getTime(),
        firstName,
        lastName,
        email,
        password,
        favoritos: [],
    });

    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

export const login = (email, password) => {
    const usuarios = obtenerUsuarios();
    for (const usuario of usuarios) {
        if (usuario.email === email && usuario.password === password) {
            localStorage.setItem(USUARIO_ACTIVO_KEY, usuario.id);
            return usuario;
        }
    }

    throw new Error("Incorrect email or password");
};


export const logout = () => {
    localStorage.removeItem(USUARIO_ACTIVO_KEY);
};

export const actualizarUsuario = (usuarioActualizado) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(usuario => usuario.id === usuarioActualizado.id);
    if (index !== -1) {
        usuarios[index] = usuarioActualizado;
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    }
};

export const updateUserPassword = async (oldPassword, newPassword) => {
    const usuario = obtenerUsuarioEnSesion();
    if (!usuario) {
        throw new Error("No user is currently logged in");
    }

    if (usuario.password !== oldPassword) {
        throw new Error("Old password is incorrect");
    }

    usuario.password = newPassword;
    actualizarUsuario(usuario);
};

export const revisarSesion = obtenerUsuarioEnSesion;
