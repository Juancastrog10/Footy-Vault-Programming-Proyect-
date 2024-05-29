import { login } from "./session.js";

const render = () => {
    const loginButton = document.querySelector("#login-button");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            if (login(email, password)) {
                window.location.href = "../Main Page/mainpage.html";
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            alert(error.message);
        }
    });
};

document.addEventListener("DOMContentLoaded", render);
