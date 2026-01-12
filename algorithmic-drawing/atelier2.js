function setup() {
  createCanvas(400, 400);
  strokeWeight(2);
}

function draw() {
  background(255);

  let spacing = 20; 
  let long = 10;     

  for (let x = spacing/2; x < width; x += spacing) {
    for (let y = spacing/2; y < height; y += spacing) {
      // faire pointer les traits vers la souris
      let angle = atan2(mouseY - y, mouseX - x);
      //calcul la longueur du trait
      let d = dist(x, y, mouseX, mouseY);
      let lenMod = map(d, 0, width/2, long*2, long*0.2, true);
      let c = map(d, 0, width/2, 0, 200, true); 
      stroke(c);
      push();
      translate(x, y);
      rotate(angle);
      line(0, 0, lenMod, 0);
      pop();
    }
  }
}
