// Player — handles movement and room-entry effects
const Player = {
  KEY_MAP: {
    ArrowUp:    { dx:  0, dy: -1, label: 'north' },
    ArrowDown:  { dx:  0, dy:  1, label: 'south' },
    ArrowLeft:  { dx: -1, dy:  0, label: 'west'  },
    ArrowRight: { dx:  1, dy:  0, label: 'east'  },
  },

  move(key) {
    if (GameState.status !== 'playing') return; // blocks on game-over AND win

    const dir = Player.KEY_MAP[key];
    if (!dir) return;

    const { x, y } = GameState.player;
    const nx = x + dir.dx;
    const ny = y + dir.dy;

    if (!GridSystem.isInBounds(nx, ny)) {
      UI.addLog('🚫 You cannot go that way.', 'info');
      return;
    }

    if (Combat.hasLivingEnemy()) {
      UI.addLog('⚔ Defeat the enemy before moving!', 'combat');
      return;
    }

    const firstVisit = RoomGenerator.isFirstVisit(nx, ny);
    const room = RoomGenerator.getOrCreate(nx, ny);

    GameState.player.x = nx;
    GameState.player.y = ny;

    if (firstVisit) {
      GameState.player.visitedRooms += 1;
      room.visited = true;
      UI.addLog(`🚶 You move ${dir.label}.`, 'move');
      UI.addLog(`[${room.type.toUpperCase()}] ${room.description}`, 'info');
    } else {
      UI.addLog(`🚶 You move ${dir.label}. [${room.type.toUpperCase()}] ${room.description} (revisited)`, 'move');
    }

    // Trap: trigger once on entry
    if (room.type === 'trap' && room.trap && !room.trap.triggered) {
      const dmg = 3;
      room.trap.triggered = true;
      room.cleared = true;
      GameState.player.hp = Math.max(0, GameState.player.hp - dmg);
      UI.addLog(`🪤 A trap fires! You take ${dmg} damage. (${GameState.player.hp}/${GameState.player.maxHp} HP)`, 'trap');
      if (GameState.player.hp <= 0) {
        GameState.status = 'game-over';
        UI.addLog('💀 You have been defeated!', 'combat');
      }
    }

    UI.render();
  },
};
