# AI Dungeon Grid Game - Spec

## 🎯 Goal

Build a grid-based dungeon exploration game with AI-generated rooms and events.

---

## 🧩 Core Concept

* Infinite dungeon
* Each step = new room
* AI generates room content dynamically

---

## 🎮 Gameplay

### Player

* Moves on grid (up/down/left/right)
* Stats:

  * HP
  * attack
  * inventory

### Grid

* 2D grid (initially 10x10 visible)
* Player always centered OR moves freely

### Rooms

Each tile = room:

* empty
* enemy
* loot
* trap
* NPC
* special event

---

## 🤖 AI Features

* Generate:

  * room description
  * event text
  * NPC dialogue
* Input:

  * player state
  * previous rooms
* Output:

  * structured JSON

---

## ⚙️ Tech Stack

* HTML/CSS/JS (or React)
* Optional FastAPI backend
* OpenAI / local LLM

---

## 🧠 Architecture

### Modules

* GameState → player, map, stats
* GridSystem → map handling
* Player → movement & stats
* RoomGenerator → procedural + AI
* CombatSystem → fight logic
* InventorySystem → items
* UI → rendering grid + info panel

---

## 🔄 Game Loop

Turn-based:

1. Player moves
2. Room triggers
3. Event/combat resolves
4. Update state

---

## 🧪 Room Types

| Type  | Description     |
| ----- | --------------- |
| Empty | nothing         |
| Enemy | triggers combat |
| Loot  | gives item      |
| Trap  | damages player  |
| NPC   | interaction     |
| Boss  | rare            |

---

## ⚔️ Combat (MVP)

* Turn-based
* Player vs enemy
* Simple damage formula

---

## 🎒 Inventory

* items
* healing
* buffs (later)

---

## 🖥 UI

### Main Screen

* Grid view
* Player position

### Side Panel

* HP
* inventory
* logs

### Bottom Panel

* actions / messages

---

## 🎯 Success Criteria

* Player can move
* Rooms generate dynamically
* AI generates descriptions
* Combat works
* Game is playable loop

---

## 🚀 Future Enhancements

* Fog of war
* Path memory
* Skill system
* Multiplayer dungeon
* AI-driven enemies
