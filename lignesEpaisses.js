function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(220);
  let N = 0;
  let D = 0;
  let X = width;
let Y = height;
  while (N<Y){
    D=D+1;
    strokeWeight(D);
    N=N+D+1
    X=X-D-10               
    Y=Y-D-10
    rect(N, N, X - N, Y - N);

  }
}
