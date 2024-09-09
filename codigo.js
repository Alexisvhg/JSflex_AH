let nombre_evento;
let lugar_evento;
let fecha_evento;
let hora_evento;
let participantes = [];

function crear_evento() {
    nombre_evento = prompt("Ingrese el nombre del evento:");

    if (!nombre_evento) {
        alert("Debe ingresar un nombre para el evento.");
        return;
    }

    lugar_evento = prompt("Ingrese el lugar del evento:");
    fecha_evento = prompt("Ingrese la fecha del evento (dd/mm/aaaa):");
    hora_evento = prompt("Ingrese la hora del evento (hh:mm):");

    //let participantes = []; //Array de participantes del evento
    
    let agregar_otro = true;

    while (agregar_otro) {
    
        if (confirm("¿Desea agregar un nuevo participante?")) {
            let nombre = prompt("Ingrese el nombre del participante:");

            if (nombre) {
                let telefono = prompt("Ingrese el teléfono del participante (opcional):");
                

                participantes.push({
                    nombre: nombre,
                    telefono: telefono || "No proporcionado"
                });
            } else {
                alert("Debe ingresar un nombre válido.");
            }
        } else {
            agregar_otro = false;
        }
    }
   // mostrarLista(nombre_evento,lugar_evento,fecha_evento,hora_evento, participantes);
}

function mostrarLista(nombre_evento,lugar_evento,fecha_evento,hora_evento, participantes) {
    
    let mensaje = `Evento: ${nombre_evento}\nLugar: ${lugar_evento}\nFecha: ${fecha_evento}\nHora: ${hora_evento}\n\nParticipantes:\n`;

    if (participantes.length > 0) {
        for (let i = 0; i < participantes.length; i++) {
            mensaje += `${i + 1}. Nombre: ${participantes[i].nombre}, Teléfono: ${participantes[i].telefono}\n`;
        }
    } else {
        mensaje += "No hay participantes registrados.";
    }
    alert(mensaje);
}



crear_evento();

mostrarLista(nombre_evento,lugar_evento,fecha_evento,hora_evento, participantes);