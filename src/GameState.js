// GameState — single source of truth for all game data
const GameState = {
  // Canonical starting values used by reset()
  INITIAL_PLAYER: { x: 5, y: 5, hp: 20, maxHp: 20, attack: 5 },

  player: {
    x: 5,
    y: 5,
    hp: 20,
    maxHp: 20,
    attack: 5,
    inventory: [],
    visitedRooms: 0,
  },
  grid: {
    cols: 10,
    rows: 10,
  },
  rooms:  {},    // keyed by "x,y"
  log:    [],
  status: 'playing', // 'playing' | 'game-over' | 'win'

  reset() {
    const ip = GameState.INITIAL_PLAYER;
    GameState.player = {
      x: ip.x, y: ip.y,
      hp: ip.hp, maxHp: ip.maxHp,
      attack: ip.attack,
      inventory: [],
      visitedRooms: 0,
    };
    GameState.rooms  = {};
    GameState.log    = [];
    GameState.status = 'playing';
  },
};
