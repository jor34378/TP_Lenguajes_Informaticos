// ===================================
// NOTICIAS - BUSCADOR (Ema)
// ===================================

document.addEventListener("DOMContentLoaded", function () {
    const buscador = document.getElementById("buscador-noticias");
    const contador = document.getElementById("contador-noticias");
    const columnas = document.querySelectorAll("#listado .row > div");

    if (!buscador || !contador || columnas.length === 0) {
        return;
    }

    function normalizar(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function filtrar() {
        const busqueda = normalizar(buscador.value.trim());
        let visibles = 0;

        columnas.forEach(function (columna) {
            const coincide = normalizar(columna.textContent).includes(busqueda);
            columna.classList.toggle("d-none", !coincide);
            if (coincide) {
                visibles++;
            }
        });

        contador.textContent = visibles === 0
            ? "No se encontraron noticias para tu búsqueda."
            : "Mostrando " + visibles + " de " + columnas.length + " noticias.";
    }

    buscador.addEventListener("input", filtrar);
    filtrar();
});

// Jorge Modo Oscuro

/*const btnModo = document.getElementById("btn-modo");
btnModo.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    const modoActivo = document.body.classList.contains("modo-oscuro");
    btnModo.textContent = modoActivo ? "☀ Modo claro" : "🌙";
});*/

const btnModoOscuro = document.querySelector('#btn-modo');

function actualizarBoton(activado) {
  if (!btnModoOscuro) return;
  btnModoOscuro.textContent = activado ? '☀ Modo claro' : '🌙';
}

// Sincroniza el texto del botón al entrar a cada página
const estaGuardado = localStorage.getItem('modoOscuro') === 'activado';
if (estaGuardado) {
  document.body.classList.add('modo-oscuro');
  document.documentElement.classList.add('modo-oscuro');
}
actualizarBoton(estaGuardado);

if (btnModoOscuro) {
  btnModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    const estaActivado = document.body.classList.contains('modo-oscuro');
    document.documentElement.classList.toggle('modo-oscuro', estaActivado);
    localStorage.setItem('modoOscuro', estaActivado ? 'activado' : 'desactivado');
    actualizarBoton(estaActivado);
  });
}

// ===================================
// CONTACTO - VALIDACIÓN Y FEEDBACK (Santiago)
// ===================================

documnent.addEventListener("DOMContentLoaded", () =>{
    const formContacto = document.getElementById("form-contacto");
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputMensaje = document.getElementById("mensaje");
    const checkPrivacidad = document.getElementById("privacidad");
    const contadorCaracteres = document.getElementById("contador-caracteres");
    const cajaFeedback = document.getElementById("feedback-contacto");
    
    if (!formContacto){
        return;
    }
    //Contador de caracteres
    if (inputMensaje && contadorCaracteres){
        inputMensaje.addEventListener("input", () => {
            const cantidad = inputMensaje.value.length;
            contadorCaracteres.textContent = `${cantidad} / 300 caracteres`;
        });
    }
    formContacto.addEventListener("submit", (event) => {
        event.preventDefault();
        const nombre = inputNombre.value.trim();
        const email = inputEmail.value.trim();
        const mensaje = inputMensaje.value.trim();

        if (nombre === "" || mensaje === "") {
            cajaFeedback.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Por favor, completá tu nombre y tu mensaje antes de enviar.
                </div>
            `;
            return;
        }
        if (!email.includes("@") || email.length <= 3) {
            cajaFeedback.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Ingresá un correo electrónico válido (debe contener @).
                </div>
            `;
            return;
        }
        if (!checkPrivacidad.checked) {
            cajaFeedback.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Debés aceptar la política de privacidad para continuar.
                </div>
            `;
            return;
        }
        // Si pasó todas las validaciones, generamos la tarjeta de confirmación dinámica
        cajaFeedback.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">¡Consulta enviada con éxito, ${nombre}!</h4>
                <p class="mb-1">Te responderemos a la brevedad a <strong>${email}</strong>.</p>
                <hr>
                <p class="mb-0 small"><strong>Tu mensaje:</strong> "${mensaje}"</p>
            </div>
        `;
        // Limpiamos el formulario y reiniciamos el contador
        formContacto.reset();
        if (contadorCaracteres) {
            contadorCaracteres.textContent = "0 / 300 caracteres";
        }
    });
});

        