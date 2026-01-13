let X;
let nx = 200, ny = 150;
let mx = 20, my = 16;
let currentIteration = 0;
let nit = 400;
let cellSize;

function setup() {
  createCanvas(800, 600);
  cellSize = min(width / nx, height / ny);
  X = createEmptyGrid(ny, nx);
  initializeRandomPatch();
  
}

function draw() {
  background(255);
  if (currentIteration < nit) {
    X = caStep(X);
    currentIteration++;
  }
  displayMaze();
  fill(0);
  noStroke();
}

function createEmptyGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = false;
    }
  }
  return grid;
}

function initializeRandomPatch() {
  let startY = floor(ny / 2 - my / 2);
  let startX = floor(nx / 2 - mx / 2);
  
  for (let i = 0; i < my; i++) {
    for (let j = 0; j < mx; j++) {
      X[startY + i][startX + j] = random() > 0.75;
    }
  }
}

function caStep(grid) {
  let newGrid = createEmptyGrid(ny, nx);
  
  for (let i = 0; i < ny; i++) {
    for (let j = 0; j < nx; j++) {
      let neighbors = countNeighbors(grid, i, j);
      if (neighbors === 3 || (grid[i][j] && neighbors > 0 && neighbors < 6)) {
        newGrid[i][j] = true;
      } else {
        newGrid[i][j] = false;
      }
    }
  }
  
  return newGrid;
}

function countNeighbors(grid, row, col) {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue; 
      let ni = (row + di + ny) % ny;
      let nj = (col + dj + nx) % nx;
      if (grid[ni][nj]) count++;
    }
  }
  
  return count;
}

function displayMaze() {
  noStroke();
  for (let i = 0; i < ny; i++) {
    for (let j = 0; j < nx; j++) {
      if (X[i][j]) {
        fill(0); 
      } else {
        fill(255);
      }
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}
