let invitados = [];
let datosEvento = {};
let indiceEdicionInvitado = null;

// Esperar a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    // Asignar eventos con addEventListener
    document.getElementById('botonGuardarEvento').addEventListener('click', guardarEvento);
    document.getElementById('botonNuevoEvento').addEventListener('click', nuevoEvento);
    document.getElementById('botonAgregarInvitado').addEventListener('click', agregarInvitado);

    // Cargar datos del localStorage si existen
    cargarDatosEvento();
    cargarInvitados();

    // Agregar cabecera al grid de invitados
    const listaInvitados = document.getElementById('listaInvitados');
    listaInvitados.innerHTML = `
        <div class="header">Nombre</div>
        <div class="header">Teléfono</div>
        <div class="header">Confirmación</div>
        <div class="header">Pagó</div>
        <div class="header">Acciones</div>
    `;
});

function guardarEvento() {
    datosEvento = {
        nombre: document.getElementById('nombreEvento').value,
        lugar: document.getElementById('lugarEvento').value,
        fecha: document.getElementById('fechaEvento').value,
        hora: document.getElementById('horaEvento').value,
        costo: document.getElementById('costoEvento').value
    };

    // Guardar evento en localStorage
    localStorage.setItem('datosEvento', JSON.stringify(datosEvento));

    alert(`Evento guardado: ${datosEvento.nombre} en ${datosEvento.lugar} el ${datosEvento.fecha} a las ${datosEvento.hora}. Costo por invitado: $${datosEvento.costo}`);

    document.getElementById('nombreEvento').disabled = true;
    document.getElementById('lugarEvento').disabled = true;
    document.getElementById('fechaEvento').disabled = true;
    document.getElementById('horaEvento').disabled = true;
    document.getElementById('costoEvento').disabled = true;

    document.getElementById('botonGuardarEvento').style.display = 'none';
    document.getElementById('botonNuevoEvento').style.display = 'inline-block';
}

function agregarInvitado() {
    const invitado = {
        nombre: document.getElementById('nombreInvitado').value,
        telefono: document.getElementById('telefonoInvitado').value,
        confirmacion: document.getElementById('confirmacionInvitado').value,
        pago: document.getElementById('pagoInvitado').value
    };

    if (indiceEdicionInvitado !== null) {
        invitados[indiceEdicionInvitado] = invitado;
        indiceEdicionInvitado = null;
    } else {
        invitados.push(invitado);
    }

    // Guardar invitados en localStorage
    localStorage.setItem('invitados', JSON.stringify(invitados));

    actualizarListaInvitados();
    document.getElementById('formularioInvitado').reset();
}

function editarInvitado(indice) {
    const invitado = invitados[indice];

    document.getElementById('nombreInvitado').value = invitado.nombre;
    document.getElementById('telefonoInvitado').value = invitado.telefono;
    document.getElementById('confirmacionInvitado').value = invitado.confirmacion;
    document.getElementById('pagoInvitado').value = invitado.pago;

    indiceEdicionInvitado = indice;
}

function eliminarInvitado(indice) {
    if (confirm('¿Estás seguro de que deseas eliminar este invitado?')) {
        invitados.splice(indice, 1);

        // Actualizar invitados en localStorage
        localStorage.setItem('invitados', JSON.stringify(invitados));

        actualizarListaInvitados();
    }
}

function actualizarListaInvitados() {
    const listaInvitados = document.getElementById('listaInvitados');
    listaInvitados.innerHTML = `
        <div class="header">Nombre</div>
        <div class="header">Teléfono</div>
        <div class="header">Confirmación</div>
        <div class="header">Pagó</div>
        <div class="header">Acciones</div>
    `;

    invitados.forEach((invitado, indice) => {
        listaInvitados.innerHTML += `
            <div>${invitado.nombre}</div>
            <div>${invitado.telefono}</div>
            <div>${invitado.confirmacion}</div>
            <div>${invitado.pago}</div>
            <div class="acciones">
                <button class="edit">Editar</button>
                <button class="btnrojo">Eliminar</button>
            </div>
        `;

        const botones = listaInvitados.querySelectorAll('.acciones:last-child button');
        botones[0].addEventListener('click', () => editarInvitado(indice));
        botones[1].addEventListener('click', () => eliminarInvitado(indice));
    });
}

function cargarDatosEvento() {
    const datosEventoGuardado = localStorage.getItem('datosEvento');
    if (datosEventoGuardado) {
        datosEvento = JSON.parse(datosEventoGuardado);

        document.getElementById('nombreEvento').value = datosEvento.nombre;
        document.getElementById('lugarEvento').value = datosEvento.lugar;
        document.getElementById('fechaEvento').value = datosEvento.fecha;
        document.getElementById('horaEvento').value = datosEvento.hora;
        document.getElementById('costoEvento').value = datosEvento.costo;

        document.getElementById('nombreEvento').disabled = true;
        document.getElementById('lugarEvento').disabled = true;
        document.getElementById('fechaEvento').disabled = true;
        document.getElementById('horaEvento').disabled = true;
        document.getElementById('costoEvento').disabled = true;

        document.getElementById('botonGuardarEvento').style.display = 'none';
        document.getElementById('botonNuevoEvento').style.display = 'inline-block';
    }
}

function cargarInvitados() {
    const invitadosGuardados = localStorage.getItem('invitados');
    if (invitadosGuardados) {
        invitados = JSON.parse(invitadosGuardados);
        actualizarListaInvitados();
    }
}

function nuevoEvento() {
    if (confirm('¿Estás seguro de que quieres crear un nuevo evento? Se perderá toda la información actual.')) {
        datosEvento = {};
        invitados = [];

        // Limpiar localStorage
        localStorage.removeItem('datosEvento');
        localStorage.removeItem('invitados');

        document.getElementById('listaInvitados').innerHTML = '';
        document.getElementById('formularioEvento').reset();

        document.getElementById('nombreEvento').disabled = false;
        document.getElementById('lugarEvento').disabled = false;
        document.getElementById('fechaEvento').disabled = false;
        document.getElementById('horaEvento').disabled = false;
        document.getElementById('costoEvento').disabled = false;

        document.getElementById('botonGuardarEvento').style.display = 'inline-block';
        document.getElementById('botonNuevoEvento').style.display = 'none';

        alert('El evento ha sido reiniciado. Puedes crear un nuevo evento.');
    }
}
