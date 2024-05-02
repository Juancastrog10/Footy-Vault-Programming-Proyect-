document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.querySelector('.bc');

    confirmButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        const oldPasswordInput = document.getElementById('ipi');
        const newPasswordInput = document.querySelectorAll('#ipi')[1];

        if (oldPasswordInput.value.trim() === '' || newPasswordInput.value.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newPassword = newPasswordInput.value;
        if (!/(?=(.*[A-Z]){2})(?=.*[!@#$%^&*])/.test(newPassword)) {
            alert('La nueva contraseña debe contener al menos 2 mayúsculas y un caracter especial.');
            return;
        }
        
        const oldPassword = oldPasswordInput.value;
        if (oldPassword === newPassword) {
            alert('La nueva contraseña no puede ser igual a la antigua.');
            return;
        }

        alert('Contraseña actualizada correctamente!');
    });
});
