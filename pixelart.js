// Sélection des éléments du DOM
const pixelCanvas = document.getElementById('pixelCanvas');
const colorPicker = document.getElementById('colorPicker');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');
const gridSizeInput = document.getElementById('gridSize');
const generateGridButton = document.getElementById('generateGridButton');

let isMouseDown = false;  // Variable pour suivre si la souris est enfoncée

// Fonction pour créer la grille de pixels
function createGrid(size) {
    // Vider la grille si elle existe déjà
    pixelCanvas.innerHTML = '';

    // Ajuster la taille des pixels en fonction de la taille de la grille
    let pixelSize;
    if (size <= 20) {
        pixelSize = 25;  // Taille plus grande pour les petites grilles
    } else if (size <= 50) {
        pixelSize = 15;  // Taille moyenne pour les grilles moyennes
    } else {
        pixelSize = 10;  // Taille plus petite pour les grandes grilles
    }

    // Ajuster la taille de la grille avec un défilement si nécessaire
    pixelCanvas.style.gridTemplateColumns = `repeat(${size}, ${pixelSize}px)`;
    pixelCanvas.style.gridTemplateRows = `repeat(${size}, ${pixelSize}px)`;

    // Créer la grille de `size` x `size`
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = `${pixelSize}px`;
        pixel.style.height = `${pixelSize}px`;

        // Ajouter des événements pour colorier le pixel
        pixel.addEventListener('mousedown', function() {
            isMouseDown = true;
            pixel.style.backgroundColor = colorPicker.value; // Appliquer la couleur directement
        });

        pixel.addEventListener('mouseenter', function() {
            if (isMouseDown) {
                pixel.style.backgroundColor = colorPicker.value;  // Colorier si la souris est enfoncée
            }
        });

        // Ajouter le pixel au canvas
        pixelCanvas.appendChild(pixel);
    }
}

// Fonction pour réinitialiser toute la grille
function resetGrid() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white'; // Réinitialiser chaque pixel à blanc
    });
}

// Fonction pour enregistrer la grille en PDF
function saveAsPDF() {
    html2canvas(pixelCanvas).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('pixel-art.pdf');
    });
}

// Ajout d'événements pour gérer le clic et le relâchement de la souris
document.body.addEventListener('mouseup', function() {
    isMouseDown = false;
});

// Ajouter des événements aux boutons
resetButton.addEventListener('click', resetGrid);

// Ajouter un événement au bouton de génération de grille
generateGridButton.addEventListener('click', function() {
    const gridSize = parseInt(gridSizeInput.value);
    if (gridSize >= 2 && gridSize <= 100) {
        createGrid(gridSize);
    } else {
        alert("Veuillez entrer une taille de grille entre 2 et 100.");
    }
});

saveButton.addEventListener('click', saveAsPDF);

// Initialiser la grille de 16x16 pixels au démarrage
createGrid(16);