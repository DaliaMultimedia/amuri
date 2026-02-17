let glow = 0;
let burst = 0;
let inside = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(8, 8, 12);
  translate(width/2, height/2);

  // ---- DETECTAR TOQUE ----
  let d = dist(mouseX, mouseY, width/2, height/2);

  if (d < 200) {
    inside = true;
  } else {
    inside = false;
  }

  // ---- COMPORTAMIENTO DE LUZ ----
  if (inside) {
    glow = lerp(glow, 255, 0.08);
    burst = lerp(burst, 240, 0.06);
  } else {
    glow = lerp(glow, 0, 0.05);
    burst = lerp(burst, 0, 0.05);
  }

  // ===================
  // 🌑 PÉTALOS FILOSOS
  // ===================

  noFill();
  stroke(90, 90, 100);
  strokeWeight(2);

  for (let i = 0; i < 14; i++) { // más pétalos = más agresivo
    let ang = i * (360 / 14);

    beginShape();
    for (let t = 0; t <= 1; t += 0.05) {

      // crea puntas abruptas y cortes irregulares
      let r = lerp(30, 240, t) 
              + (sin(t * 12) * 25)   // filo
              + random(-6, 6);        // textura cristal

      let x = r * cos(ang);
      let y = r * sin(ang);

      vertex(x, y);
    }
    endShape();
  }

  // ---- BORDE CRISTALINO EXTERNO (filoso) ----
  beginShape();
  for (let i = 0; i < 360; i += 18) {
    let r = 200 + sin(i * 3) * 20 + random(-15, 15);
    vertex(r * cos(i), r * sin(i));
  }
  endShape(CLOSE);

  // ==============================
  // ✨ EXPLOSIÓN DE LUZ AL TOCAR
  // ==============================

  noStroke();

  // chispas de luz (más violentas)
  for (let i = 0; i < 70; i++) {
    let a = random(360);
    let r = random(10, burst);
    fill(255, glow);
    ellipse(r * cos(a), r * sin(a), 3, 3);
  }

  // núcleo luminoso
  fill(255, glow);
  ellipse(0, 0, 50 + burst/6, 50 + burst/6);

  // anillos de energía expansivos
  noFill();
  stroke(255, glow);
  strokeWeight(1);
  ellipse(0, 0, 100 + burst/2, 100 + burst/2);
}
