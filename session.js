import { cargarInformacion } from "./Main Page/desutils.js";
const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";
//obtener datos de los usuarios del local storage
const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    return usuarios ? JSON.parse(usuarios) : [];
};
//decir cual ususario esta activo en la sesion 
export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);
    if (!usuarioActivo) {
        return null;
    }
    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.id === parseInt(usuarioActivo)) || null;
};
//obtiene los favoritos de una sesion y los devuelve en un arreglo
export const obtenerFavoritos = async () => {
    const user = obtenerUsuarioEnSesion();
    const favoritos = [];
  
    const data = await cargarInformacion();
  
    for (const llave in data) {
      const listaProductos = data[llave]; 
      //obteniendo la lista de productos que le corresponde a esa llave del api
  
      //Recorrer la lista de productos buscando aquellos productos cuyo ID este en el arreglo de favoritos del usuario.
      for (const product of listaProductos) {
        if (user.favoritos.includes(product.id)) {
          favoritos.push(product);
        }
      }
    }
  
    return favoritos;
  };
//registra un nuevo usuario, hace las validaciones de que las contraseñas coincidan y el email no esté registrado
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
//agregar el nuevo usuario si cumple con todo 
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};
//verifica los datos y guarda el usuario que queda activo o iniciado sesion 
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

//para cerrar sesion remueve el id obtenido en la anterior funcion
export const logout = () => {
    localStorage.removeItem(USUARIO_ACTIVO_KEY);
};
//actualiza la info de un usuario en el local storage
export const actualizarUsuario = (usuarioActualizado) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(usuario => usuario.id === usuarioActualizado.id);
    if (index !== -1) {
        usuarios[index] = usuarioActualizado;
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    }
};
//actualizar la contraseña del usuario que tenga iniciada sesion  y verificar que la anterior se la que estaba antes 
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
//verifica si hay un usuario con sesion iniciada
export const revisarSesion = obtenerUsuarioEnSesion;
