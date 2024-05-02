document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const username = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        
        if (!/[^A-Za-z0-9]/.test(username)) {
            alert('El nombre de usuario debe incluir al menos un carácter especial.');
            return;
        }

        if (!/(?=(.*[A-Z]){2})(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password)) {
            alert('La contraseña debe contener al menos 2 mayúsculas, un caracter especial y números.');
            return;
        }

        alert('¡Inicio de sesión exitoso!');
    });
});
