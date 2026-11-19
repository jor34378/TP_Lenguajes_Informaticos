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

// =====================================================
// MODO OSCURO - compartido por todas las paginas
// =====================================================
// - La eleccion se guarda en el navegador (localStorage) y se aplica en cada pagina.
// - Funciona tambien en las paginas que todavia no tienen el boton.
// - El boton es accesible: aria-pressed indica si el modo oscuro esta activo.

const CLAVE_TEMA = "tema";
const btnModo = document.getElementById("btn-modo");

// localStorage puede estar bloqueado (modo privado): en ese caso se ignora sin romper la pagina
function leerTema() {
    try {
        return localStorage.getItem(CLAVE_TEMA);
    } catch (error) {
        return null;
    }
}

function guardarTema(valor) {
    try {
        localStorage.setItem(CLAVE_TEMA, valor);
    } catch (error) {
        // sin almacenamiento: el modo vale solo para esta pagina
    }
}

// Unico lugar donde se cambia el aspecto de la pagina
function aplicarTema(oscuro) {
    document.body.classList.toggle("modo-oscuro", oscuro);
    if (btnModo) {
        btnModo.textContent = oscuro ? "☀️" : "🌙";
        btnModo.setAttribute("aria-pressed", String(oscuro));
    }
}

// Al cargar: aplica lo que se eligio la ultima vez
aplicarTema(leerTema() === "oscuro");

// Al hacer clic: cambia, aplica y guarda
if (btnModo) {
    btnModo.addEventListener("click", function () {
        const oscuro = !document.body.classList.contains("modo-oscuro");
        aplicarTema(oscuro);
        guardarTema(oscuro ? "oscuro" : "claro");
    });
}