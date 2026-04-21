// RoomGenerator — creates room data once per tile; revisits reuse cached data
// Room schema: { x, y, type, description, visited, cleared?, enemy?, loot?, npc? }
const RoomGenerator = {
  BOSS_TILE: { x: 9, y: 9 },

  TYPE_POOL: [
    'empty', 'empty', 'empty', 'empty', 'empty',
    'enemy', 'enemy',
    'loot',
    'trap',
    'npc',
  ],

  DESCRIPTIONS: {
    empty: [
      'The room is cold and silent.',
      'Dust floats in the stale air.',
      'Nothing but bare stone walls.',
      'An empty chamber. Echoes follow your footsteps.',
    ],
    enemy: [
      'A creature lurks in the shadows!',
      'Yellow eyes gleam from the darkness.',
      'You hear a low growl nearby.',
      'Something moves — and it is not friendly.',
    ],
    loot: [
      'You spot a glittering chest.',
      'A leather pouch lies on the floor.',
      'Coins are scattered across the stone.',
      'An ornate box rests on a pedestal.',
    ],
    trap: [
      'The floor feels unstable — beware!',
      'You notice pressure plates etched into the stone.',
      'A faint hiss warns of hidden danger.',
      'Scratch marks on the floor hint at past victims.',
    ],
    npc: [
      'A cloaked figure stands in the corner.',
      'An old merchant eyes you cautiously.',
      'A wounded traveller slumps against the wall.',
      'A robed scholar pores over an ancient map.',
    ],
    boss: [
      'A colossal shadow fills the chamber. The Dungeon Lord awakens.',
      'The air turns ice-cold. An ancient evil stirs on its throne.',
      'Bones crunch beneath your feet. The final guardian rises.',
    ],
  },

  ENEMY_NAMES: [
    'Goblin', 'Skeleton', 'Cave Troll', 'Shadow Bat',
    'Cursed Knight', 'Slime', 'Bone Archer', 'Dark Sprite',
  ],

  LOOT_ITEMS: [
    'Health Potion', 'Health Potion', 'Health Potion',
    'Iron Sword', 'Magic Scroll',
    'Shield Fragment', 'Gold Coins', 'Torch', 'Leather Boots',
  ],

  // Effects applied when an item is collected
  LOOT_EFFECTS: {
    'Health Potion':   { hp: 10 },
    'Iron Sword':      { attack: 2 },
    'Magic Scroll':    { hp: 5, attack: 1 },
    'Shield Fragment': { maxHp: 5, hp: 5 },
    'Gold Coins':      {},
    'Torch':           {},
    'Leather Boots':   {},
  },

  NPC_DATA: [
    { name: 'Old Hermit',    dialogue: '"The deeper you go, the darker it gets. Take heed, traveller."' },
    { name: 'Wandering Merchant', dialogue: '"I have nothing left to sell. They took everything."' },
    { name: 'Injured Scout', dialogue: '"Turn back — there is a beast ahead that cannot be reasoned with."' },
    { name: 'Dungeon Sage',  dialogue: '"Every curse in this place was once a wish. Remember that."' },
    { name: 'Lost Pilgrim',  dialogue: '"I came seeking treasure. Now I seek only the exit."' },
  ],

  // Public: return existing room or generate+store a new one
  getOrCreate(x, y) {
    const key = `${x},${y}`;
    if (GameState.rooms[key]) return GameState.rooms[key];
    const b = RoomGenerator.BOSS_TILE;
    const room = (x === b.x && y === b.y)
      ? RoomGenerator._generateBossRoom(x, y)
      : RoomGenerator._generate(x, y);
    GameState.rooms[key] = room;
    return room;
  },

  isFirstVisit(x, y) {
    return !GameState.rooms[`${x},${y}`];
  },

  // ── AI-ready async stub ──────────────────────────────────────────────────
  // When real AI integration is added, replace this with an API call.
  // Expected return: { type, description, enemy?, loot?, npc? }
  async generateWithAI(x, y) {
    // Stub: always falls back to local generator
    return null;
  },

  async getOrCreateAsync(x, y) {
    const key = `${x},${y}`;
    if (GameState.rooms[key]) return GameState.rooms[key];
    let room;
    try {
      const aiData = await RoomGenerator.generateWithAI(x, y);
      room = aiData ? RoomGenerator._fromAI(x, y, aiData) : RoomGenerator._generate(x, y);
    } catch (_) {
      room = RoomGenerator._generate(x, y);
    }
    GameState.rooms[key] = room;
    return room;
  },

  // Build a room from validated AI JSON
  _fromAI(x, y, data) {
    const allowed = ['empty', 'enemy', 'loot', 'trap', 'npc'];
    const type = allowed.includes(data.type) ? data.type : 'empty';
    const description = typeof data.description === 'string' && data.description.trim()
      ? data.description.trim()
      : RoomGenerator._pickDesc(type);
    const room = { x, y, type, description, visited: false, cleared: false };
    if (type === 'enemy' && data.enemy) {
      room.enemy = {
        name:   String(data.enemy.name   || 'Unknown'),
        hp:     Number(data.enemy.hp)    || 6,
        maxHp:  Number(data.enemy.hp)    || 6,
        attack: Number(data.enemy.attack)|| 2,
      };
    } else if (type === 'enemy') {
      room.enemy = RoomGenerator._generateEnemy();
    }
    if (type === 'loot')  room.loot = data.loot  || RoomGenerator._generateLoot();
    if (type === 'npc')   room.npc  = data.npc   || RoomGenerator._generateNPC();
    if (type === 'trap')  room.trap = { triggered: false };
    return room;
  },

  // ── Private generators ───────────────────────────────────────────────────
  _generate(x, y) {
    const pool = RoomGenerator.TYPE_POOL;
    const type = pool[Math.floor(Math.random() * pool.length)];
    const description = RoomGenerator._pickDesc(type);
    const room = { x, y, type, description, visited: false, cleared: false };
    if (type === 'enemy') room.enemy = RoomGenerator._generateEnemy();
    if (type === 'loot')  room.loot  = RoomGenerator._generateLoot();
    if (type === 'npc')   room.npc   = RoomGenerator._generateNPC();
    if (type === 'trap')  room.trap  = { triggered: false };
    return room;
  },

  _pickDesc(type) {
    const pool = RoomGenerator.DESCRIPTIONS[type] || RoomGenerator.DESCRIPTIONS.empty;
    return pool[Math.floor(Math.random() * pool.length)];
  },

  _generateEnemy() {
    const names  = RoomGenerator.ENEMY_NAMES;
    const name   = names[Math.floor(Math.random() * names.length)];
    const hp     = 4 + Math.floor(Math.random() * 9);   // 4–12
    const attack = 1 + Math.floor(Math.random() * 4);   // 1–4
    return { name, hp, maxHp: hp, attack };
  },

  _generateBossRoom(x, y) {
    const descs = RoomGenerator.DESCRIPTIONS.boss;
    const description = descs[Math.floor(Math.random() * descs.length)];
    return {
      x, y,
      type: 'boss',
      description,
      visited: false,
      cleared: false,
      enemy: { name: 'Dungeon Lord', hp: 30, maxHp: 30, attack: 6 },
    };
  },

  _generateLoot() {
    const items = RoomGenerator.LOOT_ITEMS;
    return { item: items[Math.floor(Math.random() * items.length)], collected: false };
  },

  _generateNPC() {
    const pool = RoomGenerator.NPC_DATA;
    const data = pool[Math.floor(Math.random() * pool.length)];
    return { name: data.name, dialogue: data.dialogue, talked: false };
  },
};
