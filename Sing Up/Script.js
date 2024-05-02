document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signup-button');

    signUpButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const fullName = document.getElementById('Full-Name').value;
        const email = document.getElementById('Email').value;
        const password = document.getElementById('Password').value;
        const confirmPassword = document.getElementById('Confirm-Password').value;
        const phoneNumber = document.getElementById('Phone-Number').value;

    
        if (fullName === '' || email === '' || password === '' || confirmPassword === '' || phoneNumber === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(fullName)) {
            alert('El nombre solo debe contener letras.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

    
        if (!/(?=(.*[A-Z]){2})(?=.*[!@#$%^&*])(?=.*[0-9])/.test(password)) {
            alert('La contraseña debe contener al menos 2 mayúsculas, un caracter especial y números.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            alert('El número de teléfono solo debe contener números.');
            return;
        }

        alert('¡Registro exitoso!');
    });
});
