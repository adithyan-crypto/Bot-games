// UI — renders the grid to the DOM
const container = document.getElementById('grid-container');

function render(gridData) {
  container.style.gridTemplateColumns = `repeat(${state.grid.cols}, 48px)`;
  container.innerHTML = '';

  for (let row = 0; row < state.grid.rows; row++) {
    for (let col = 0; col < state.grid.cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const isPlayer = col === state.player.x && row === state.player.y;
      if (isPlayer) {
        cell.classList.add('player');
        cell.textContent = '🧙';
      } else {
        cell.textContent = '';
      }

      container.appendChild(cell);
    }
  }
}
