// Combat — handles turn-based fight between player and current room's enemy
const Combat = {
  playerAttack() {
    const { x, y } = GameState.player;
    const room = GameState.rooms[`${x},${y}`];
    if (!room || !room.enemy || room.enemy.hp <= 0) return;

    const enemy = room.enemy;

    // Player hits enemy
    const playerDmg = GameState.player.attack;
    enemy.hp = Math.max(0, enemy.hp - playerDmg);
    UI.addLog(`⚔ You hit the ${enemy.name} for ${playerDmg} dmg. (${enemy.hp}/${enemy.maxHp} HP left)`, 'combat');

    if (enemy.hp <= 0) {
      room.cleared = true;
      room.visited = true;
      UI.addLog(`☠ The ${enemy.name} is defeated!`, 'combat');
      if (room.type === 'boss') {
        GameState.status = 'win';
        UI.addLog('🏆 You have conquered the Dungeon Lord! Victory!', 'combat');
      }
      UI.render();
      return;
    }

    // Enemy retaliates
    const enemyDmg = enemy.attack;
    GameState.player.hp = Math.max(0, GameState.player.hp - enemyDmg);
    UI.addLog(`💥 The ${enemy.name} hits you for ${enemyDmg} dmg. (${GameState.player.hp}/${GameState.player.maxHp} HP)`, 'combat');

    if (GameState.player.hp <= 0) {
      GameState.status = 'game-over';
      UI.addLog('💀 You have been defeated!', 'combat');
    }

    UI.render();
  },

  hasLivingEnemy() {
    const { x, y } = GameState.player;
    const room = GameState.rooms[`${x},${y}`];
    return !!(room && room.enemy && room.enemy.hp > 0);
  },
};
