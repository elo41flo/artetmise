document.addEventListener('DOMContentLoaded', () => {
    // Basculer le mode sombre/clair
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    // Basculer la classe 'dark-mode' sur le body
    document.body.classList.toggle('dark-mode');

    // Vérifier si la classe 'dark-mode' est appliquée
    if (document.body.classList.contains('dark-mode')) {
        // Enregistrer "dark" dans le localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        // Sinon, enregistrer "light"
        localStorage.setItem('theme', 'light');
    }
});

// Au chargement de la page, appliquer le thème stocké dans le localStorage
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        // Si le thème stocké est "dark", ajouter la classe 'dark-mode'
        document.body.classList.add('dark-mode');
    }
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
