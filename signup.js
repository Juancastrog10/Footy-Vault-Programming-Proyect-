import { registrar } from "./session.js";

const render = () => {
    const signUpButton = document.querySelector("#signUpButton");

    signUpButton.addEventListener("click", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("correo").value;
        const password = document.getElementById("contrasena").value;
        const confirmPassword = document.getElementById("confirmarContrasena").value;

        try {
            registrar(firstName, lastName, email, password, confirmPassword);
            alert("User registered successfully!");
            window.location.href = "login.html";
        } catch (error) {
            alert(error.message);
        }
    });
};

document.addEventListener("DOMContentLoaded", render);
