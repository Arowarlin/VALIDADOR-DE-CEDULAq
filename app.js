const API_URL = 'http://localhost:3000/api/validacion';

document.getElementById('formularioValidacion').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cedulaInput = document.getElementById('cedula');
    const cedula = cedulaInput.value.trim();
    
    if (!cedula) {
        mostrarError('Por favor ingrese un número de cédula');
        return;
    }
    
    await validarCedula(cedula);
});

document.getElementById('cedula').addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 3 && valor.length <= 10) {
        valor = valor.slice(0, 3) + '-' + valor.slice(3);
    } else if (valor.length > 10) {
        valor = valor.slice(0, 3) + '-' + valor.slice(3, 10) + '-' + valor.slice(10, 11);
    }
    
    e.target.value = valor;
});

async function validarCedula(cedula) {
    try {
        const response = await fetch(`${API_URL}/cedula`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cedula })
        });
        
        const data = await response.json();
        
        if (data.error) {
            mostrarError(data.error);
            return;
        }
        
        mostrarResultado(data);
        
    } catch (error) {
        mostrarError('Error al conectar con el servidor. Asegúrese de que el servidor esté corriendo en http://localhost:3000');
        console.error('Error:', error);
    }
}

function mostrarResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    const iconoResultado = document.getElementById('iconoResultado');
    const tituloResultado = document.getElementById('tituloResultado');
    
    resultadoDiv.classList.remove('oculto', 'valido', 'invalido');
    
    if (data.valido) {
        resultadoDiv.classList.add('valido');
        iconoResultado.textContent = '✓';
        tituloResultado.textContent = 'Cédula Válida';
    } else {
        resultadoDiv.classList.add('invalido');
        iconoResultado.textContent = '✗';
        tituloResultado.textContent = 'Cédula Inválida';
    }
    
    if (data.informacion) {
        document.getElementById('cedulaIngresada').textContent = data.informacion.cedulaFormateada || data.cedula;
        document.getElementById('secuencia').textContent = data.informacion.secuencia || 'N/A';
        document.getElementById('numeroDocumento').textContent = data.informacion.numeroDocumento || 'N/A';
        document.getElementById('digitoVerificador').textContent = data.digitoVerificador || 'N/A';
        document.getElementById('digitoCalculado').textContent = data.digitoCalculado || 'N/A';
    }
    
    document.getElementById('mensajeValidacion').textContent = data.mensaje || '';
    
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const iconoResultado = document.getElementById('iconoResultado');
    const tituloResultado = document.getElementById('tituloResultado');
    
    resultadoDiv.classList.remove('oculto', 'valido');
    resultadoDiv.classList.add('invalido');
    
    iconoResultado.textContent = '⚠';
    tituloResultado.textContent = 'Error';
    
    document.getElementById('cedulaIngresada').textContent = '-';
    document.getElementById('secuencia').textContent = '-';
    document.getElementById('numeroDocumento').textContent = '-';
    document.getElementById('digitoVerificador').textContent = '-';
    document.getElementById('digitoCalculado').textContent = '-';
    document.getElementById('mensajeValidacion').textContent = mensaje;
    
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}