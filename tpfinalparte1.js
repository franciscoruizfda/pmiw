//TP FINAL PARTE 1
// MAXIMILIANO FUENTES Y FRANCISCO RUIZ
// VIDEO FRANCISCO: https://www.youtube.com/watch?v=wZTr1DRgi0E
// VIDEO MAXI: https://www.youtube.com/watch?v=_zVifvr7C-4
// DIAGRAMA: https://drive.google.com/file/d/19Hz1_O9EOIVh-JLBIgaRuPchLTog2SYd/view?usp=sharing
// TEMATICA: Poseidon quiere comprar empanadas en la estación de trenes en La Plata.

// Variables de Estado, medidas y sonido
let ancho = 640;
let alto = 480;
let estado = "inicio";
let clickSound;

// Variables para setear los preimage
let fondoInicio, fondoZeus, fondoDecision, fondoDuelo, fondoCulinario;
let fondoFinalAyuda, fondoFinalFisico, fondoFinalCulinario;
let fondoEmpanadasMalas, fondoDescubreMalas ;
let fondoReaccionaPaz ;

// Preload
function preload() {
  // Cargá tus imágenes reales aquí con loadImage()
  fondoInicio = loadImage("img/fondo_inicio.jpg");
  fondoZeus = loadImage("img/fondo_zeus.jpg");
  fondoDecision = loadImage("img/fondo_decision.jpg");
  fondoDuelo = loadImage("img/fondo_duelo.jpg");
  fondoDuelo2 = loadImage("img/fondo_duelo2.jpg");
  fondoCulinario = loadImage("img/fondo_culinario.jpg");
  fondoFinalAyuda = loadImage("img/final_ayuda.jpg");
  fondoFinalAyuda2 = loadImage("img/final_ayuda2.jpg");
  fondoFinalFisico = loadImage("img/final_fisico.jpg");
  fondoFinalCulinario = loadImage("img/final_culinario.jpg");
  fondoEmpanadasMalas = loadImage("img/empanadas_malas.jpg");
  fondoDescubreMalas = loadImage("img/descubre_malas.jpg");
  fondoReaccionaPaz = loadImage("img/reacciona_paz.jpg");
  fondoReaccionaPaz2 = loadImage("img/reacciona_paz2.jpg");
  clickSound = loadSound('sound/click.mp3');

  
}

function setup() {
  createCanvas(ancho, alto);
  
}

// Inicio la aventura grafica y la dibuja muchas veces
function draw() {
  background(0);
  print(estado);
  mostrarPantalla(estado);
}

// Toda esta función permite pasar de pantalla a pantalla entre todos los posibles escenarios y reiniciar cada vez que se llega a un final

// Todas tienen un "color" en el fondo ya que antes de poner las imagenes, testeamos que las pantallas sean recorribles con los botones, una vez
// que logramos hacer que todo funcione, comenzamos con el desarrollo de las imagenes.

function mostrarPantalla(estadoActual) {
  switch (estadoActual) {
    case "inicio":
      pantallaConImagen(
        "Poseidón llega a la terminal de La Plata\nbuscando empanadas",
        fondoInicio,
        color(100, 150, 255)
      );
      mostrarBoton("Continuar", width / 2 - 60, 400, () => cambiarEstado("zeus"));
      break;

     case "zeus":
      pantallaConImagen(
        "Zeus atiende el puesto\nde empanadas",
        fondoZeus,
        color(200, 150, 100)
      );
      mostrarBoton("Continuar", width / 2 - 60, 400, () => cambiarEstado("decision1"));
      break;

    case "decision1":
      pantallaConImagen(
        "Zeus le exige a poseidon ganarse \nlas empanadas",
        fondoDecision,
        color(150, 100, 200)
      );
      mostrarBotonesDistribuidos([
  { etiqueta: "Paz / Ayuda mutua", accion: () => cambiarEstado("ofrecerAyuda") },
  { etiqueta: "Duelo", accion: () => cambiarEstado("decisionDuelo") },
  { etiqueta: "Empanadas malas", accion: () => cambiarEstado("empanadasMalas") }
], 400);
      break;

    case "ofrecerAyuda":
      pantallaConImagen(
        "Poseidón ofrece ayudar a Zeus con el puesto",
        fondoFinalAyuda,
        color(120, 200, 150)
      );
      mostrarBoton("Aceptar ayuda mutua", width / 2 - 90, 400, () => cambiarEstado("finalAyuda"));
      break;

    case "finalAyuda":
      pantallaConImagen(
        "FINAL: Alianza de empanadas entre Poseidón y Zeus",
        fondoFinalAyuda2,
        color(100, 255, 180)
      );
      botonReiniciar();
      break;

    case "decisionDuelo":
      pantallaConImagen(
        "¿Qué tipo de duelo quieren hacer?",
        fondoDuelo,
        color(255, 150, 150)
      );
      mostrarBoton("Duelo físico", 120, 400, () => cambiarEstado("dueloFisico"));
      mostrarBoton("Duelo culinario", 380, 400, () => cambiarEstado("dueloCulinario"));
      break;

    case "dueloFisico":
      pantallaConImagen(
        "Se enfrentan en un duelo de poder",
        fondoDuelo2,
        color(255, 100, 100)
      );
      mostrarBoton("Resultado duelo físico", width / 2 - 80, 400, () => cambiarEstado("finalFisico"));
      break;

    case "dueloCulinario":
      pantallaConImagen(
        "Compiten con sus mejores recetas de empanadas",
        fondoCulinario,
        color(255, 180, 100)
      );
      mostrarBoton("Votos del público", width / 2 - 80, 400, () => cambiarEstado("finalCulinario"));
      break;

    case "finalFisico":
      pantallaConImagen(
        "FINAL: Poseidón gana el duelo físico",
        fondoFinalFisico,
        color(255, 50, 50)
      );
      botonReiniciar();
      break;

    case "finalCulinario":
      pantallaConImagen(
        "FINAL: Poseidón gana la competencia culinaria",
        fondoFinalCulinario,
        color(255, 200, 50)
      );
      botonReiniciar();
      break;

    case "empanadasMalas":
      pantallaConImagen(
        "Zeus le entrega empanadas en mal estado",
        fondoEmpanadasMalas,
        color(180, 180, 80)
      );
      mostrarBoton("Continuar", width / 2 - 60, 400, () => cambiarEstado("descubreMalEstado"));
      break;

    case "descubreMalEstado":
      pantallaConImagen(
        "Poseidón descubre que están en mal estado",
        fondoDescubreMalas,
        color(180, 150, 60)
      );
      mostrarBoton("Proponer duelo", 100, 400, () => cambiarEstado("reaccionaDuelo"));
      mostrarBoton("Preferir paz y no comerlas", 360, 400, () => cambiarEstado("reaccionaPaz"));
      break;

    case "reaccionaDuelo":
      pantallaConImagen(
        "Poseidón se enoja y propone un duelo",
        fondoDuelo,
        color(220, 80, 80)
      );
      mostrarBoton("Ir al duelo físico", 120, 400, () => cambiarEstado("dueloFisico"));
      mostrarBoton("Ir al duelo culinario", 380, 400, () => cambiarEstado("dueloCulinario"));
      break;

    case "reaccionaPaz":
      pantallaConImagen(
        "Poseidón prefiere la paz y se va",
        fondoReaccionaPaz,
        color(100, 100, 100)
      );
      mostrarBoton("Continuar", width / 2 - 60, 400, () => cambiarEstado("finalPaz"));
      break;

    case "finalPaz":
      pantallaConImagen(
        "FINAL: Poseidón deja las empanadas y parte en paz",
        fondoReaccionaPaz2,
        color(150, 150, 150)
      );
      botonReiniciar();
      break;

    case "finalAlucinacion":
      pantallaConImagen(
        "FINAL MÁGICO: Poseidón alucina y cree que está en el Olimpo",
        fondoAlucinacion,
        color(120, 60, 200)
      );
      botonReiniciar();
      break;
  }
}

// Esta función la usamos para probar sin imagenes, que en caso de que no las hayamos hecho y puesto en la carpeta "img", se genere un color.
function pantallaConImagen(texto, imagenFondo, colorFondo) {
  if (imagenFondo) {
    image(imagenFondo, 0, 0, width, height);
  } else {
    background(colorFondo);
  }
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text(texto, 110 , 250 , 400, 200);
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
}

// Toda esta función (Contando el let yaClick = false de abajo, hacen funcionar a los botones y que el click solo cuente cuando se presiona y no cuando se suelta
function mostrarBoton(etiqueta, x, y, accion, anchoPersonalizado = null) {
  textSize(14);
  textAlign(LEFT, CENTER);
  let padding = 20;
  let ancho = anchoPersonalizado || textWidth(etiqueta) + padding;

  fill(255);
  stroke(0);
  rect(x, y, ancho, 40, 10);

  fill(0);
  noStroke();
  text(etiqueta, x + padding / 2, y + 20);

  if (
  mouseIsPressed &&
  !yaClick &&
  mouseX > x && mouseX < x + ancho &&
  mouseY > y && mouseY < y + 40
) {
  accion();
  yaClick = true;
}

}

 let yaClick = false;

function mouseReleased() {
  yaClick = false;
}


// Esta función la hicimos para que todos los botones tengan simetria entre si y no esten descentrados
function mostrarBotonesDistribuidos(opciones, y) {
  let totalAncho = 0;
  let padding = 20;

  textSize(14);
  for (let i = 0; i < opciones.length; i++) {
    let texto = opciones[i].etiqueta;
    opciones[i].ancho = textWidth(texto) + padding;
    totalAncho += opciones[i].ancho;
  }

  let espacioEntre = 20;
  totalAncho += espacioEntre * (opciones.length - 1);
  let x = (width - totalAncho) / 2;

  for (let i = 0; i < opciones.length; i++) {
    let boton = opciones[i];
    mostrarBoton(boton.etiqueta, x, y, boton.accion, boton.ancho);
    x += boton.ancho + espacioEntre;
  }
}


// Y esta función hace aparecer un botón de reinicio en cada uno de los posibles finales.
function botonReiniciar() {
  mostrarBoton("Reiniciar", width / 2 - 60, 400, () => cambiarEstado("inicio"));
}

// Esta función reproduce sonido cada vez que se presiona click en la web
function mousePressed() {
  if (clickSound && clickSound.isLoaded()) {
    clickSound.play();
  }
}
