document.addEventListener('DOMContentLoaded', () => {
    // Basculer le mode sombre/clair
    document.getElementById('toggle-dark-mode').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Gestion de l'affichage du menu
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menu.style.display = isExpanded ? 'none' : 'block';
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });
});
