import { obtenerUsuarioEnSesion, updateUserPassword, logout } from "./session.js";

const render = () => {
    const nombreField = document.getElementById("nombre");
    const correoField = document.getElementById("correo");
    const confirmButton = document.getElementById("confirmButton");
    const signOutButton = document.getElementById("signOutButton");

    // Fetch user information
    const userInfo = obtenerUsuarioEnSesion();
    if (!userInfo) {
        window.location.href = "login.html"; // Redirect to login if not signed in
        return;
    }

    // Populate user info
    nombreField.value = `${userInfo.firstName} ${userInfo.lastName}`;
    correoField.value = userInfo.email;

    // Handle password change
    confirmButton.addEventListener("click", async () => {
        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        try {
            await updateUserPassword(oldPassword, newPassword);
            alert("Password updated successfully!");
        } catch (error) {
            alert(error.message);
        }
    });

    // Handle sign out
    signOutButton.addEventListener("click", () => {
        logout();
        window.location.href = "login.html";
    });
};

document.addEventListener("DOMContentLoaded", render);
