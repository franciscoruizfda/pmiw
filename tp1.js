// TP1 PMIW FRANCISCO RUIZ
// PASAR TP3 IPMI A P5JS
// VIDEO: https://youtu.be/-k39VCDsEuQ


// variables

const W = 800, H = 400;
const LEFT_W = 400, RIGHT_W = 400;
let n = 10;                 
let dir = -1;               
let firstRight = true;      
const dotFactor = 0.5;      
let showBoard = true;
let invertMap = false;
let cA, cB;                 
let img;

//pre-carga la imagen

function preload() {
  img = loadImage("data/F_42.png");
}

// Definir colores y crear el canvas
function setup() {
  const c = createCanvas(W, H);
  pixelDensity(1);
  noLoop();

  cA = color(0);   
  cB = color(255); 

}

function draw() {
  background(255);

  // Esto sirve para que la imagen se muestre a la izquierda
  if (img) {
    const sq = min(img.width, img.height);
    const sx = (img.width - sq) / 2;
    const sy = (img.height - sq) / 2;
    image(img, 0, 0, LEFT_W, H, sx, sy, sq, sq);
  } else {
    noStroke(); fill(240); rect(0, 0, LEFT_W, H);
  }

  // Cuadricula y circulo con color invertido
  if (!showBoard) {
    noStroke(); fill(255); rect(LEFT_W, 0, RIGHT_W, H);
    return;
  }

  const cell = RIGHT_W / n;
  noStroke();
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const rx = LEFT_W + x * cell;
      const ry = y * cell;
      const parity0 = ((x + y) % 2) === 0;

      const squareUsesA = parity0 ? !invertMap : invertMap;
      fill(squareUsesA ? cA : cB);
      rect(rx, ry, cell, cell);

      // circulo con el color opuesto al cuadrado
      fill(squareUsesA ? cB : cA);
      const d = cell * dotFactor;
      ellipse(rx + cell / 2, ry + cell / 2, d, d);
    }
  }
}

// Interacciones con teclas/mouse
function keyPressed() {
  const k = key.toLowerCase();
  if (k === 't') {              
    [cA, cB] = randomTwoDistinctColors();
  } else if (k === 'h') {        
    showBoard = !showBoard;
  } else if (k === 'y') {        
    invertMap = !invertMap;
  } else if (k === 'r') {        
    resetState();
  } else {
    return false;
  }
  redraw();
  return false;
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    if (firstRight && n === 10) {
      n = 5;
      dir = -1;
      firstRight = false;
    } else {
      n += dir;
      if (n <= 3) { n = 3; dir = +1; }
      if (n >= 10) { n = 10; dir = -1; }
    }
    redraw();
    return false; 
  }
}

// funciones que usan las interacciones para funcionar
function randomTwoDistinctColors() {
  let a = randColor(), b = randColor();
  while (colorDistance(a, b) < 60) b = randColor();
  return [a, b];
}

function randColor() {
  return color(random(255), random(255), random(255));
}

function colorDistance(c1, c2) {
  const r = red(c1) - red(c2);
  const g = green(c1) - green(c2);
  const b = blue(c1) - blue(c2);
  return Math.sqrt(r * r + g * g + b * b);
}

function resetState() {
  n = 10; dir = -1; firstRight = true;
  cA = color(0); cB = color(255);
  showBoard = true; invertMap = false;
  redraw();
}
