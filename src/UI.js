// UI — renders grid, stats, room panel, action panel, log
const UI = {
  TILE_ICONS: {
    empty: '',
    enemy: '👾',
    loot:  '💰',
    trap:  '🪤',
    npc:   '🧝',
    boss:  '💀',
  },
  PLAYER_ICON: '🧙',

  // DOM refs populated by init()
  gridContainer: null,
  statHp: null, statAttack: null, statPosition: null,
  statRooms: null, statInvCount: null, inventoryList: null,
  roomCoords: null, roomType: null, roomStatus: null, roomDesc: null,
  enemyInfo: null, enemyName: null, enemyHp: null, enemyAttack: null,
  npcInfo: null, npcName: null, npcDialogue: null,
  lootInfo: null, lootItemName: null,
  actionPanel: null,
  btnAttack: null, btnCollect: null, btnTalk: null, btnRestart: null,
  gameOverOverlay: null,
  winOverlay: null,
  logList: null,

  init() {
    this.gridContainer   = document.getElementById('grid-container');
    this.statHp          = document.getElementById('stat-hp');
    this.statAttack      = document.getElementById('stat-attack');
    this.statPosition    = document.getElementById('stat-position');
    this.statRooms       = document.getElementById('stat-rooms');
    this.statInvCount    = document.getElementById('stat-inv-count');
    this.inventoryList   = document.getElementById('inventory-list');
    this.roomCoords      = document.getElementById('room-coords');
    this.roomType        = document.getElementById('room-type');
    this.roomStatus      = document.getElementById('room-status');
    this.roomDesc        = document.getElementById('room-description');
    this.enemyInfo       = document.getElementById('enemy-info');
    this.enemyName       = document.getElementById('enemy-name');
    this.enemyHp         = document.getElementById('enemy-hp');
    this.enemyAttack     = document.getElementById('enemy-attack');
    this.npcInfo         = document.getElementById('npc-info');
    this.npcName         = document.getElementById('npc-name');
    this.npcDialogue     = document.getElementById('npc-dialogue');
    this.lootInfo        = document.getElementById('loot-info');
    this.lootItemName    = document.getElementById('loot-item-name');
    this.actionPanel     = document.getElementById('action-panel');
    this.btnAttack       = document.getElementById('btn-attack');
    this.btnCollect      = document.getElementById('btn-collect');
    this.btnTalk         = document.getElementById('btn-talk');
    this.btnRestart      = document.getElementById('btn-restart');
    this.gameOverOverlay = document.getElementById('game-over-overlay');
    this.winOverlay      = document.getElementById('win-overlay');
    this.logList         = document.getElementById('log-list');
  },

  // ── Grid ──────────────────────────────────────────────────────────────────
  renderGrid() {
    const { cols, rows } = GameState.grid;
    this.gridContainer.style.gridTemplateColumns = `repeat(${cols}, var(--cell-size))`;
    this.gridContainer.innerHTML = '';
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isPlayer = col === GameState.player.x && row === GameState.player.y;
        const tile = GridSystem.getTile(col, row);
        this.gridContainer.appendChild(this.buildCell(col, row, tile, isPlayer));
      }
    }
  },

  buildCell(col, row, tile, isPlayer) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = col;
    cell.dataset.y = row;

    if (isPlayer) {
      cell.classList.add('cell--player');
      cell.textContent = UI.PLAYER_ICON;
      return cell;
    }

    const room = GameState.rooms[`${col},${row}`];

    // Fog of war — hide unvisited tiles
    if (!room) {
      cell.classList.add('cell--fog');
      return cell;
    }

    const type = tile ? tile.type : 'empty';
    cell.classList.add(`cell--${type}`);
    if (room.cleared) cell.classList.add('cell--cleared');
    cell.textContent = UI.TILE_ICONS[type] || '';
    return cell;
  },

  // ── Stats sidebar ─────────────────────────────────────────────────────────
  renderStats() {
    const { hp, maxHp, attack, inventory, visitedRooms, x, y } = GameState.player;
    this.statHp.textContent       = `${hp} / ${maxHp}`;
    this.statHp.style.color       = hp <= maxHp * 0.3 ? '#e74c3c' : '';
    this.statAttack.textContent   = attack;
    this.statPosition.textContent = `(${x}, ${y})`;
    this.statRooms.textContent    = visitedRooms;
    this.statInvCount.textContent = inventory.length;

    this.inventoryList.innerHTML = '';
    if (inventory.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'Empty';
      this.inventoryList.appendChild(li);
    } else {
      inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        this.inventoryList.appendChild(li);
      });
    }
  },

  // ── Room panel ────────────────────────────────────────────────────────────
  renderRoom() {
    const { x, y } = GameState.player;
    const room = GameState.rooms[`${x},${y}`];

    if (!room) {
      this.roomCoords.textContent = `(${x}, ${y})`;
      this.roomType.textContent   = '—';
      this.roomStatus.textContent = '—';
      this.roomDesc.textContent   = '';
      this._hideRoomExtras();
      return;
    }

    this.roomCoords.textContent = `(${room.x}, ${room.y})`;
    this.roomType.textContent   = room.type;
    this.roomStatus.textContent = room.cleared ? 'cleared' : (room.visited ? 'visited' : 'new');
    this.roomDesc.textContent   = room.description || '';

    // Enemy sub-panel
    if (room.enemy) {
      this.enemyInfo.classList.remove('hidden');
      this.enemyName.textContent   = room.enemy.name;
      this.enemyHp.textContent     = `${room.enemy.hp} / ${room.enemy.maxHp}`;
      this.enemyAttack.textContent = room.enemy.attack;
    } else {
      this.enemyInfo.classList.add('hidden');
    }

    // NPC sub-panel
    if (room.npc) {
      this.npcInfo.classList.remove('hidden');
      this.npcName.textContent     = room.npc.name;
      this.npcDialogue.textContent = room.npc.talked ? room.npc.dialogue : '...';
    } else {
      this.npcInfo.classList.add('hidden');
    }

    // Loot sub-panel
    if (room.loot) {
      this.lootInfo.classList.remove('hidden');
      this.lootItemName.textContent = room.loot.collected ? 'Collected' : room.loot.item;
    } else {
      this.lootInfo.classList.add('hidden');
    }
  },

  _hideRoomExtras() {
    this.enemyInfo.classList.add('hidden');
    this.npcInfo.classList.add('hidden');
    this.lootInfo.classList.add('hidden');
  },

  // ── Action panel ──────────────────────────────────────────────────────────
  renderActions() {
    const { x, y } = GameState.player;
    const room  = GameState.rooms[`${x},${y}`];
    const alive = GameState.status === 'playing';

    this.btnAttack.classList.toggle('hidden',
      !(alive && room && room.enemy && room.enemy.hp > 0));
    this.btnCollect.classList.toggle('hidden',
      !(alive && room && room.loot && !room.loot.collected));
    this.btnTalk.classList.toggle('hidden',
      !(alive && room && room.npc));
    this.btnRestart.classList.remove('hidden');
  },

  // ── Game Over overlay ─────────────────────────────────────────────────────
  renderGameOver() {
    if (GameState.status === 'game-over') {
      this.gameOverOverlay.classList.remove('hidden');
    } else {
      this.gameOverOverlay.classList.add('hidden');
    }
  },

  // ── Win overlay ───────────────────────────────────────────────────────────
  renderWin() {
    if (GameState.status === 'win') {
      this.winOverlay.classList.remove('hidden');
    } else {
      this.winOverlay.classList.add('hidden');
    }
  },

  // ── Log ───────────────────────────────────────────────────────────────────
  renderLog() {
    this.logList.innerHTML = '';
    GameState.log.slice(0, 30).forEach((entry, i) => {
      const li = document.createElement('li');
      li.textContent = entry.text;
      li.className   = `log-${entry.category}`;
      if (i === 0) li.classList.add('log-latest');
      this.logList.appendChild(li);
    });
  },

  addLog(text, category = 'info') {
    GameState.log.unshift({ text, category });
    if (GameState.log.length > 60) GameState.log.pop();
    this.renderLog();
  },

  // ── Master render ─────────────────────────────────────────────────────────
  render() {
    this.renderGrid();
    this.renderStats();
    this.renderRoom();
    this.renderActions();
    this.renderGameOver();
    this.renderWin();
    this.renderLog();
  },
};
