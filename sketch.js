let font;
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

function preload() {
  font = loadFont('assets/28900602631.ttf');
}

function setup() {
  createCanvas(800, 600);
  background(255);
  noLoop();
}

function draw() {
  background(255);
  
  push();
  translate(width/2 + offsetX, height/2 + offsetY);
  scale(zoom);
  translate(-width/2, -height/2);
  
  // Dessiner le mot principal 
  dessinerMotFractal('RÉPÉTITION', width/2 - 280, height/2, 80, 2);
  
  pop();
  
  // Instructions
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT);
  text('Molette: zoom | Flèches: déplacer | R: reset', 10, 20);
  text('Zoom: ' + nf(zoom, 1, 1) + 'x (zoomez pour voir les détails !)', 10, 40);
}

function dessinerMotFractal(mot, x, y, taille, profondeur) {
  if (profondeur <= 0) {
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    
    let espacement = taille * 0.87;
    for (let i = 0; i < mot.length; i++) {
      textSize(taille);
      text(mot[i], x + (i * espacement), y);
    }
    return;
  }
  
  let espacement = taille * 0.87;
  
  // Pour chaque lettre du mot principal
  for (let i = 0; i < mot.length; i++) {
    let lettre = mot[i];
    let posX = x + (i * espacement);
    
    // Obtenir les points du contour de cette lettre
    let points = font.textToPoints(lettre, posX, y, taille, { 
      sampleFactor: 0.2
    });
    
    // Taille des mini-mots
    let miniTaille = taille * 0.08;
    
    // Sur chaque point du contour, dessiner une mini-version du mot complet
    for (let j = 0; j < points.length; j++) {
      let p = points[j];
      
      // Calculer la position de départ pour centrer le mini-mot
      let miniLargeur = mot.length * miniTaille * 0.87;
      let miniX = p.x - miniLargeur / 2;
      
      // Récursion : dessiner le mot entier en miniature
      dessinerMotFractal(mot, miniX, p.y, miniTaille, profondeur - 1);
    }
  }
}

function mouseWheel(event) {
  let zoomFactor = event.delta > 0 ? 0.9 : 1.1;
  zoom *= zoomFactor;
  zoom = constrain(zoom, 0.5, 100);
  redraw();
  return false;
}

