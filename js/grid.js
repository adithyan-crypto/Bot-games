// GridSystem — builds and manages the 2D grid data
function createGrid(rows, cols) {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      grid[row][col] = { type: 'empty' };
    }
  }
  return grid;
}

function isValidPosition(x, y) {
  return x >= 0 && x < state.grid.cols && y >= 0 && y < state.grid.rows;
}
