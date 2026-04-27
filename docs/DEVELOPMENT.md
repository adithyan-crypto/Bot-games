# Development Guide

## Philosophy
- Build step by step.
- Always keep the game playable.
- Focus on logic first, UI later.

## Architecture Rules
- Separate clearly: GameState (data), Systems (logic), UI (rendering), AI (generation).
- Small functions, clear naming, no large files, avoid duplication.

## Development Order (Phases)

### Phase 1: Core Grid
- Create grid.
- Render grid.
- Place player.

### Phase 2: Movement
- Arrow key movement.
- Update player position.
- Prevent invalid moves.

### Phase 3: Basic Rooms
- Random room type (no AI yet).
- Trigger events.

### Phase 4: AI Integration
- Replace random text with AI-generated content.
- Use structured JSON output for rooms.

### Phase 5: Combat
- Turn-based combat.
- HP reduction.
- Win/lose logic.

### Phase 6: Inventory
- Collect items.
- Use items.

### Phase 7: UI Improvements
- Better grid visuals.
- Animations.
- Logs panel.

## AI Integration Rules
- Always request structured output.
- Validate AI response before using.
- Fallback to default room if AI fails.

## Testing
- Test after each step.
- Ensure movement works, rooms trigger, combat resolves, no crashes.

## Avoid
- Overusing AI early.
- Complex graphics initially.
- Mixing UI and logic.

## Pro Tip
- Start WITHOUT AI → then plug AI later to avoid debugging nightmares.