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

    const data = {
        nombreApellido,
        cedula,
        celular,
        marcaAuto,
        placaAuto,
        colorAuto
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby8cqYSGNOtEOidmxW-7b4BL4OlOknvJTUPV3t3nAHSJq_RAVPS1X_YprQUwZuG7W2t2A/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            //mode: 'no-cors' // Para localhost
        });

        // Con 'no-cors', no podemos leer la respuesta, pero los datos deberían guardarse
        mensaje.textContent = 'Registro exitoso. Comunicate con el administrador para obtener tus claves de acceso.';
        mensaje.className = '';
        form.reset();
    } catch (error) {
        mensaje.textContent = `Error: ${error.message}`;
        mensaje.className = 'error';
        console.error('Error detallado:', error);
    }
});