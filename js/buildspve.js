// Función para cargar todas las builds desde el JSON
function loadBuilds() {
    fetch('/html/builds/pve/buildspve.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(builds => {
            // Mostrar todas las builds al cargar la página
            displayBuilds(builds);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para mostrar las builds en la página
function displayBuilds(buildsToDisplay) {
    const buildsGrid = document.getElementById("builds-grid");
    buildsGrid.innerHTML = ''; // Limpiar el grid antes de mostrar las nuevas builds

    buildsToDisplay.forEach(build => {
        const buildCard = document.createElement('div');
        buildCard.classList.add('build-card');

        // Solo agregar el nombre en la caja
        buildCard.innerHTML = `
            <h3>${build.name}</h3>
        `;

        // Redirigir al hacer clic
        buildCard.addEventListener('click', () => {
            window.location.href = `/html/builds/pve/detallejugadorpve.html?name=${encodeURIComponent(build.name)}`;
        });

        buildsGrid.appendChild(buildCard);
    });
}

// Función de filtrado por rol
function filterByRole(role) {
    fetch('/html/builds/pve/buildspve.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(builds => {
            // Verificar que builds es un array
            if (!Array.isArray(builds)) {
                throw new Error('El archivo JSON no contiene un array válido.');
            }
            // Filtrar las builds por rol
            const filteredBuilds = builds.filter(build => build.role === role);
            displayBuilds(filteredBuilds);
        })
        .catch(error => console.error('Error al filtrar por rol:', error));
}

// Función de búsqueda por nombre
function searchByName() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();

    fetch('/html/builds/pve/buildspve.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(builds => {
            // Verificar que builds es un array
            if (!Array.isArray(builds)) {
                throw new Error('El archivo JSON no contiene un array válido.');
            }
            // Filtrar las builds por nombre
            const filteredBuilds = builds.filter(build => build.name.toLowerCase().includes(searchInput));
            displayBuilds(filteredBuilds);
        })
        .catch(error => console.error('Error al buscar por nombre:', error));
}

// Llamar a la función para cargar todas las builds al cargar la página
window.addEventListener('DOMContentLoaded', loadBuilds);
