// GridSystem — builds and queries the 2D tile map
const GridSystem = {
  tiles: [],

  init(rows, cols) {
    this.tiles = [];
    for (let r = 0; r < rows; r++) {
      this.tiles[r] = [];
      for (let c = 0; c < cols; c++) {
        this.tiles[r][c] = { type: 'empty' };
      }
    }
  },

  getTile(x, y) {
    if (!this.tiles[y] || !this.tiles[y][x]) return null;
    const base = this.tiles[y][x];
    const room = GameState.rooms[`${x},${y}`];
    // Overlay stored room type onto the base tile
    return room ? Object.assign({}, base, { type: room.type }) : base;
  },

  isInBounds(x, y) {
    return x >= 0 && x < GameState.grid.cols &&
           y >= 0 && y < GameState.grid.rows;
  },
};
