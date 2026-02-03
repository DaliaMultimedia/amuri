let glow = 0;
let burst = 0;
let inside = false;

let radiusBase;   // escala dinámica según pantalla

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.body);

  setScale(); // calcula tamaño según pantalla
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setScale();
}

// 📌 Función clave: adapta la flor al tamaño de pantalla
function setScale() {
  radiusBase = min(width, height) * 0.28; 
}

function draw() {
  background(8, 8, 12);
  translate(width/2, height/2);

  // ---- DETECTAR TOQUE (ahora adaptativo) ----
  let d = dist(mouseX - width/2, mouseY - height/2, 0, 0);

  inside = (d < radiusBase * 0.8);

  // ---- LUZ ----
  if (inside) {
    glow = lerp(glow, 255, 0.08);
    burst = lerp(burst, radiusBase, 0.06);
  } else {
    glow = lerp(glow, 0, 0.05);
    burst = lerp(burst, 0, 0.05);
  }

  // ==============================
  // 🌑 PÉTALOS (ahora escalan con la pantalla)
  // ==============================

  noFill();
  stroke(90, 90, 100);
  strokeWeight(2);

  for (let i = 0; i < 14; i++) {
    let ang = i * (360 / 14);

    beginShape();
    for (let t = 0; t <= 1; t += 0.05) {

      let r = lerp(radiusBase * 0.15, radiusBase, t) 
              + (sin(t * 12) * radiusBase * 0.1)
              + random(-6, 6);

      let x = r * cos(ang);
      let y = r * sin(ang);

      vertex(x, y);
    }
    endShape();
  }

  // ---- BORDE CRISTALINO ----
  beginShape();
  for (let i = 0; i < 360; i += 18) {
    let r = radiusBase * 0.9 + sin(i * 3) * radiusBase * 0.08 + random(-15, 15);
    vertex(r * cos(i), r * sin(i));
  }
  endShape(CLOSE);

  // ==============================
  // ✨ EXPLOSIÓN DE LUZ
  // ==============================

  noStroke();

  for (let i = 0; i < 70; i++) {
    let a = random(360);
    let r = random(10, burst);
    fill(255, glow);
    ellipse(r * cos(a), r * sin(a), 3, 3);
  }

  fill(255, glow);
  ellipse(0, 0, radiusBase * 0.25 + burst/6, radiusBase * 0.25 + burst/6);

  noFill();
  stroke(255, glow);
  strokeWeight(1);
  ellipse(0, 0, radiusBase * 0.5 + burst/2, radiusBase * 0.5 + burst/2);
}
