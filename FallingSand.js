//Falling sand simulator

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}

let grid;
let w = 10;
let cols, rows;

function setup(){
    createCanvas(400,400);
    cols = width / w;
    rows = height / w;;
    grid = make2DArray(cols, rows);

    //set every square to 0
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            grid[i][j] = 0;
        }
    }
}

function draw() {
  background(0);
  
  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }
  
  // Create a 2D array for the next frame of animation
  let nextGrid = make2DArray(cols, rows);
  
  // Check every cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows ; j++) {
      // What is the state?
      let state = grid[i][j];
      
      // If it's a piece of sand!
      if (state > 0) {
        // What is below?
        let below = grid[i][j + 1];
        
        // Randomly fall left or right
        let dir = 1;
        if (random(1) < 0.5) {
          dir *= -1;
        }
        
        // Check below left or right
        let belowA = -1;
        let belowB = -1;
        if (withinCols(i + dir)) {
          belowA = grid[i + dir][j + 1];
        }
        if (withinCols(i - dir)) {
          belowB = grid[i - dir][j + 1];
        }
        
        
        // Can it fall below or left or right?
        if (below === 0) {
          nextGrid[i][j + 1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = state;
        // Stay put!
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}
