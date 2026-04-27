# AI Dungeon Game - Instructions

## 🧠 Development Philosophy

* Build step by step
* Always keep game playable
* Focus on logic first, UI later

---

## 🧱 Architecture Rules

Separate clearly:

* GameState (data)
* Systems (logic)
* UI (rendering)
* AI (generation)

---

## 📦 Coding Style

* Small functions
* Clear naming
* No large files
* Avoid duplication

---

## 🔄 Development Order

### Phase 1: Core Grid

* Create grid
* Render grid
* Place player

---

### Phase 2: Movement

* Arrow key movement
* Update player position
* Prevent invalid moves

---

### Phase 3: Basic Rooms

* Random room type (no AI yet)
* Trigger events

---

### Phase 4: AI Integration

* Replace random text with AI-generated content
* Use structured JSON output:

```
{
  "type": "enemy",
  "description": "...",
  "enemy": { "hp": 10, "attack": 2 }
}
```

---

### Phase 5: Combat

* Turn-based
* HP reduction
* win/lose

---

### Phase 6: Inventory

* collect items
* use items

---

### Phase 7: UI Improvements

* better grid visuals
* animations
* logs panel

---

## 🤖 AI Integration Rules

* Always request structured output
* Validate AI response before using
* Fallback to default room if AI fails

---

## 🎮 Gameplay Rules

* Each move = new room trigger
* No repeated room generation for same tile
* Store visited rooms

---

## 🧪 Testing

Test after each step:

* movement works
* rooms trigger
* combat resolves
* no crashes

---

## ❌ Avoid

* Overusing AI early
* Complex graphics initially
* Mixing UI and logic

---

## 🎯 Goal

A playable dungeon game with:

* AI-generated content
* clean architecture
* extensibility

---

## 💡 Copilot Prompt Pattern

Use:
"Follow docs/spec.md and instruction.md. Implement [feature]. Modify only necessary files."

---

## 🔥 Pro Tip

Start WITHOUT AI → then plug AI later
This avoids debugging nightmares
