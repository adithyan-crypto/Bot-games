# Gameplay Guide

## Overview
This is a turn-based dungeon crawler game where players explore a grid-based world, encountering AI-generated rooms and challenges.

## Core Mechanics

### Movement
- Use arrow keys to move the player around the grid.
- Movement is restricted to valid tiles (no walls or obstacles).
- Each move triggers a new room event.

### Rooms
- Rooms are generated dynamically using AI.
- Each tile can only generate one unique room (no repeats for the same position).
- Visited rooms are stored to maintain consistency.

### Combat
- Turn-based system.
- Player and enemies have HP and attack values.
- Combat continues until one side's HP reaches zero.
- Win: Gain rewards; Lose: Game over.

### Inventory
- Collect items during exploration.
- Use items in combat or for special effects.

### AI Integration
- Rooms are generated with structured JSON output:
  ```json
  {
    "type": "enemy",
    "description": "...",
    "enemy": { "hp": 10, "attack": 2 }
  }
  ```
- Fallback to default rooms if AI fails.

## Win/Lose Conditions
- Win: Defeat all enemies or reach the end goal.
- Lose: Player HP reaches zero.

## Tips
- Explore carefully; not all rooms are safe.
- Manage inventory wisely.
- Use items strategically in combat.