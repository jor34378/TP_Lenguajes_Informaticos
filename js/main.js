//Noticias - Ema 
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