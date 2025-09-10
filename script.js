const form = document.getElementById('formRegistro');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombreApellido = document.getElementById('nombreApellido').value;
    const cedula = document.getElementById('cedula').value;
    const celular = document.getElementById('celular').value;
    const marcaAuto = document.getElementById('marcaAuto').value;
    const placaAuto = document.getElementById('placaAuto').value;
    const colorAuto = document.getElementById('colorAuto').value;

    // Validación de Cédula: 10 dígitos numéricos
    if (!/^\d{10}$/.test(cedula)) {
        mensaje.textContent = 'La cédula debe tener exactamente 10 dígitos numéricos.';
        mensaje.className = 'error';
        return;
    }

    // Validación de Celular: 10 dígitos numéricos
    if (!/^\d{10}$/.test(celular)) {
        mensaje.textContent = 'El celular debe tener exactamente 10 dígitos numéricos.';
        mensaje.className = 'error';
        return;
    }

    // Validación de Placa: alfanumérico
    if (!/^[a-zA-Z0-9]+$/.test(placaAuto)) {
        mensaje.textContent = 'La placa solo puede contener letras y números, sin espacios.';
        mensaje.className = 'error';
        return;
    }

    const data = new URLSearchParams();
    data.append('nombreApellido', nombreApellido);
    data.append('cedula', cedula);
    data.append('celular', celular);
    data.append('marcaAuto', marcaAuto);
    data.append('placaAuto', placaAuto);
    data.append('colorAuto', colorAuto);

    // Mostrar mensaje de éxito inmediatamente
    mensaje.textContent = 'Registro guardado exitosamente. Contactate con el administrador por WhatsApp para enviarte las claves de acceso.';
    mensaje.className = 'success';

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzQnKveuc5tsxg6-n_zojDUrJg1RTMY1c7WpvqluhfAQWOAYMgOYU9NejjqakSyOGcx1Q/exec', {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (result.status === 'success') {
            // Redirigir después de 3 segundos
            setTimeout(() => {
                window.location.href = 'reglamento.html';
            }, 3000);
        } else {
            mensaje.textContent = 'Error al guardar en el servidor, por favor intentalo nuevamente';
            mensaje.className = 'error';
        }
    } catch (error) {
        mensaje.textContent = `Error: ${error.message}`;
        mensaje.className = 'error';
        console.error('Error detallado:', error);
    }
});