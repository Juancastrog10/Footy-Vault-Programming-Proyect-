const USUARIOS_KEY = "usuarios";
const USUARIO_ACTIVO_KEY = "usuario-activo";

const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem(USUARIOS_KEY);
    return usuarios ? JSON.parse(usuarios) : [];
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

export const obtenerUsuarioEnSesion = () => {
    const usuarioActivo = localStorage.getItem(USUARIO_ACTIVO_KEY);
    if (!usuarioActivo) {
        return null;
    }

    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.id === parseInt(usuarioActivo)) || null;
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

export const agregarFavorito = (favorito) => {
    const usuario = obtenerUsuarioEnSesion();
    if (!usuario) {
        throw new Error("No user is currently logged in");
    }

    usuario.favoritos.push(favorito);
    actualizarUsuario(usuario);
};

export const obtenerFavoritos = () => {
    const usuario = obtenerUsuarioEnSesion();
    if (!usuario) {
        throw new Error("No user is currently logged in");
    }

    return usuario.favoritos;
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
