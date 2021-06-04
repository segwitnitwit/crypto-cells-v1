
let w;
let columns;
let rows;
let board;
let next;
let running = false;
let count = 0;
let colors = ["white","red", "green", "blue", "black", "yellow"];
let timeLastUpdated = Date.now();
const TIME_BETWEEN_RANDOMIZATIONS = 500;

function setup() {
  running = false;
  createCanvas(480, 480);
  w = 20;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  // init();
}

function draw() {
  // console.log('draw');
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j])) fill(colors[board[i][j]]);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }
  count += 1;
  // console.log('draw done', count);

}

// reset board when mouse is pressed
function mouseClicked() {
  // init();
  // running = !running;
  // console.log('mouse pressed!');
  let x = Math.floor(mouseX / w);
  let y = Math.floor(mouseY / w);
  if (!board[x][y]) {
    board[x][y] = 0;
  }
  board[x][y] = (board[x][y] + 1) % 6;
  // console.log(x,y);
  console.log(board[x][y]);
    // return false;
}

function keyPressed() {
  if (key === "c") {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        board[i][j] = 0;
        next[i][j] = 0;
      }
    }
    running = false;
    return;
  }
  if (key == "s") {
    running = !running;
    if (running) {
      console.log('init');
       init(); 
    }
  }
}

// Fill board randomly
function init() {
  // console.log('init');
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else if (!board[i][j]) {
        board[i][j] = 0;
      } 
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {
// console.log('generate');
  if(running && Date.now() - timeLastUpdated > TIME_BETWEEN_RANDOMIZATIONS) {
    timeLastUpdated = Date.now();
    // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // if (board[x][y] !== 0) {
            neighbors += board[x+i][y+j];
          // }
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      next[x][y] = neighbors % 6;

      // Rules of Life
      // if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      // else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      // else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      // else                                             next[x][y] = board[x][y]; // Stasis
    }
  }
  // console.log('gen done');
        // Swap!
  let temp = board;
  board = next;
  next = temp;
  } 
  // else {
    // console.log('not running');
  // }

  
}

