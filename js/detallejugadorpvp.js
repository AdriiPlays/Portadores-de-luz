// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const playerName = params.get('name');

// Seleccionar elementos del DOM
const playerNameElement = document.getElementById('player-name');
const iframeContainer = document.getElementById('player-iframe-container');

// Cargar los datos del JSON
fetch('/html/builds/pvp/buildspvp.json')
    .then(response => response.json())
    .then(players => {
        // Buscar el jugador en el JSON
        const player = players.find(player => player.name === playerName);

        if (player) {
            // Mostrar el nombre del jugador
            playerNameElement.textContent = player.name;

            // Crear el iframe
            const iframe = document.createElement('iframe');
            iframe.src = player.iframeURL;
            iframe.width = '100%';
            iframe.height = '500px';
            iframe.setAttribute('frameborder', '0');
            iframe.style.border = '2px solid var(--main-accent)';

            // Añadir el iframe al contenedor
            iframeContainer.appendChild(iframe);
        } else {
            console.error('Jugador no encontrado:', playerName);
        }
    })
    .catch(error => console.error('Error al cargar los jugadores:', error));
