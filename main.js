// main.js — entry point; initialises all systems and wires UI events
(function () {

  function seedStart() {
    const startRoom = RoomGenerator.getOrCreate(GameState.player.x, GameState.player.y);
    startRoom.visited = true;
    GameState.player.visitedRooms = 1;
    // Pre-generate boss room so its tile is visible on the grid from the start
    RoomGenerator.getOrCreate(9, 9);
    UI.addLog('You enter the dungeon…', 'info');
    UI.addLog('[' + startRoom.type.toUpperCase() + '] ' + startRoom.description, 'info');
    UI.addLog('⚠ A dark power stirs at (9,9). Find and defeat the Dungeon Lord to win.', 'info');
    return startRoom;
  }

  function startGame() {
    GridSystem.init(GameState.grid.rows, GameState.grid.cols);
    UI.init();
    seedStart();
    UI.render();
  }

  // ── Attack ──────────────────────────────────────────────────────────────────
  document.getElementById('btn-attack').addEventListener('click', function () {
    if (GameState.status !== 'playing') return;
    Combat.playerAttack(); // renders internally
  });

  // ── Collect loot ────────────────────────────────────────────────────────────
  document.getElementById('btn-collect').addEventListener('click', function () {
    if (GameState.status !== 'playing') return;
    const key  = GameState.player.x + ',' + GameState.player.y;
    const room = GameState.rooms[key];
    if (!room || !room.loot || room.loot.collected) return;

    const item   = room.loot.item;
    const effect = RoomGenerator.LOOT_EFFECTS[item] || {};
    const p      = GameState.player;

    room.loot.collected = true;
    room.cleared = true;
    p.inventory.push(item);

    // Apply stat effects
    const parts = [];
    if (effect.maxHp)  { p.maxHp  += effect.maxHp;  parts.push(`+${effect.maxHp} max HP`); }
    if (effect.hp)     { p.hp = Math.min(p.maxHp, p.hp + effect.hp); parts.push(`+${effect.hp} HP`); }
    if (effect.attack) { p.attack += effect.attack;  parts.push(`+${effect.attack} ATK`); }

    const bonus = parts.length ? ' (' + parts.join(', ') + ')' : '';
    UI.addLog('💰 You collected: ' + item + bonus, 'loot');
    UI.render();
  });

  // ── Talk to NPC ─────────────────────────────────────────────────────────────
  document.getElementById('btn-talk').addEventListener('click', function () {
    if (GameState.status !== 'playing') return;
    const key  = GameState.player.x + ',' + GameState.player.y;
    const room = GameState.rooms[key];
    if (!room || !room.npc) return;
    room.npc.talked = true;
    UI.addLog('💬 ' + room.npc.name + ': "' + room.npc.dialogue + '"', 'npc');
    UI.render();
  });

  // ── Restart (both buttons) ───────────────────────────────────────────────────
  function handleRestart() {
    GameState.reset();
    GridSystem.init(GameState.grid.rows, GameState.grid.cols);
    seedStart();
    UI.render();
  }

  document.getElementById('btn-restart').addEventListener('click', handleRestart);
  document.getElementById('btn-restart-overlay').addEventListener('click', handleRestart);
  document.getElementById('btn-restart-win').addEventListener('click', handleRestart);

  // ── Keyboard movement ────────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key in Player.KEY_MAP) {
      e.preventDefault();
      Player.move(e.key);
      return;
    }

    // Enter triggers the first visible action button (Attack > Collect > Talk)
    if (e.key === 'Enter') {
      e.preventDefault();
      const active = ['btn-attack', 'btn-collect', 'btn-talk'].find(function (id) {
        const btn = document.getElementById(id);
        return btn && !btn.classList.contains('hidden');
      });
      if (active) document.getElementById(active).click();
    }
  });

  // ── Help toggle ──────────────────────────────────────────────────────────────
  document.getElementById('btn-help').addEventListener('click', function () {
    const body = document.getElementById('help-body');
    const open = !body.classList.contains('hidden');
    body.classList.toggle('hidden', open);
    this.textContent = open ? '? Help' : '✕ Close Help';
  });

  // ── Boot ─────────────────────────────────────────────────────────────────────
  startGame();

}());
