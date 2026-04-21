# AI Dungeon Grid Game

A browser-based dungeon exploration game built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no install, no server required.

Explore a 10×10 grid, fight enemies, collect loot, talk to NPCs, survive traps, and defeat the **Dungeon Lord** to win.

---

## 🚀 How to Run

1. **Clone or download** this repository.
2. Open **`index.html`** in any modern browser (Chrome, Firefox, Edge, Safari).
3. That's it — the game starts immediately.

```bash
# Clone
git clone https://github.com/your-username/Dungeon_Grid_Game.git
cd Dungeon_Grid_Game

# Then just open index.html in your browser
# On Windows:
start index.html

# On macOS:
open index.html

# On Linux:
xdg-open index.html
```

> No Node.js, no npm, no build step needed.

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| Arrow Up / Down / Left / Right | Move player |
| **⚔ Attack** button | Attack enemy in current room |
| **💰 Collect** button | Pick up loot in current room |
| **💬 Talk** button | Talk to NPC in current room |

---

## 🗺 Room Types

| Icon | Type | What happens |
|------|------|--------------|
| _(blank)_ | Empty | Safe to pass |
| 👾 | Enemy | Click **⚔ Attack** to fight |
| 💰 | Loot | Click **💰 Collect** to pick up an item |
| 🪤 | Trap | Automatically deals **3 damage** on entry |
| 🧝 | NPC | Click **💬 Talk** to hear their dialogue |
| 💀 | Boss | Tile **(9,9)** — defeat the Dungeon Lord to **win** |

---

## ⚔ Combat

- Each click of **⚔ Attack** deals your current **Attack** stat as damage.
- The enemy retaliates immediately each round.
- You **cannot move** while a living enemy is in the room.
- Defeating the boss triggers the **Victory** screen.
- Reaching **0 HP** triggers the **Game Over** screen.

---

## 🎒 Items & Effects

| Item | Effect |
|------|--------|
| Health Potion | +10 HP (up to max) |
| Iron Sword | +2 Attack |
| Magic Scroll | +5 HP, +1 Attack |
| Shield Fragment | +5 Max HP, +5 HP |
| Gold Coins | Inventory only |
| Torch | Inventory only |
| Leather Boots | Inventory only |

---

## 🧙 Player Stats

| Stat | Starting Value |
|------|---------------|
| HP | 20 / 20 |
| Attack | 5 |
| Inventory | Empty |

---

## 🏆 Win & Lose Conditions

- **Win:** Navigate to tile **(9,9)** and defeat the **Dungeon Lord** (30 HP, 6 Attack).
- **Lose:** Your HP reaches **0**. Click **↺ Restart** to try again.

**Tips:**
- Collect 2–3 Health Potions before the boss fight.
- Find an Iron Sword to boost your attack.
- Avoid traps 🪤 to preserve HP.

---

## 🗂 Project Structure

```
Dungeon_Grid_Game/
├── index.html            # Main HTML layout
├── style.css             # All styles
├── main.js               # Entry point — boots the game, wires all events
├── src/
│   ├── GameState.js      # Single source of truth (player, rooms, status)
│   ├── GridSystem.js     # 10×10 tile map, bounds checking
│   ├── RoomGenerator.js  # Procedural room creation, AI-ready async stub
│   ├── Combat.js         # Turn-based fight logic
│   ├── Player.js         # Movement, trap triggers, game-over guard
│   └── UI.js             # All rendering (grid, stats, panels, log)
└── spec.md               # Game design specification
```

---

## 🛠 Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript**
- No frameworks, no bundler, no dependencies

---

## 🤖 AI Integration (Stub Ready)

`RoomGenerator.js` includes an async stub for AI-generated room content. Replace it with an OpenAI or local LLM call:

```js
async generateWithAI(x, y) {
  return null; // replace with real API call
}
```

Expected AI response shape:
```json
{
  "type": "enemy",
  "description": "A cursed knight blocks the passage.",
  "enemy": { "name": "Cursed Knight", "hp": 10, "attack": 3 }
}
```

---

## 📄 License

MIT

## 🚀 Quick Start

```bash
# Just open the file — no install needed
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```
