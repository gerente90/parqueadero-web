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
        mensaje.textContent = 'La placa solo puede contener letras y números.';
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

    try {
        const response = await fetch('https://script.google.com/macros/library/d/1Gcw70hNA2kh2fG5FfLIEhU-ZBwK6GIy1b9WOiGD73nbNWkdp4qXHTH77/3', {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (result.status === 'success') {
            mensaje.textContent = 'Registro guardado exitosamente. Redirigiendo a Reglamento...';
            mensaje.className = '';
            setTimeout(() => {
                window.location.href = 'reglamento.html';
            }, 2000); // Redirige después de 2 segundos
        } else {
            mensaje.textContent = 'Error al guardar en el servidor.';
            mensaje.className = 'error';
        }
    } catch (error) {
        mensaje.textContent = `Error: ${error.message}`;
        mensaje.className = 'error';
        console.error('Error detallado:', error);
    }
});