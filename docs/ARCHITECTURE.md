# Architecture Overview

## High-Level Structure
The game follows a modular architecture to separate concerns and maintain clean, extensible code.

## Components

### GameState
- **Purpose**: Holds all game data (player position, HP, inventory, visited rooms, etc.).
- **Files**: `GameState.js`
- **Responsibilities**:
  - Store current state.
  - Provide methods to update state.
  - Ensure data integrity.

### Systems
- **Purpose**: Handle game logic (movement, combat, room generation).
- **Files**: `GridSystem.js`, `Combat.js`, `RoomGenerator.js`, `Player.js`
- **Responsibilities**:
  - Process user input.
  - Calculate outcomes.
  - Update GameState accordingly.

### UI
- **Purpose**: Render the game (grid, stats, panels, logs).
- **Files**: `UI.js`, `ui.js`, `style.css`
- **Responsibilities**:
  - Display current GameState.
  - Handle user interactions.
  - Update visuals on state changes.

### AI
- **Purpose**: Generate dynamic content (rooms, descriptions).
- **Integration**: Uses external AI service for structured JSON output.
- **Responsibilities**:
  - Request room data.
  - Parse and validate responses.
  - Fallback to defaults on failure.

## Data Flow
1. User input → Systems process → Update GameState.
2. UI reads GameState → Render updates.
3. AI generates content → Systems integrate into GameState.

## File Organization
- `src/`: Core logic files.
- `js/`: Additional JS files.
- `css/`: Stylesheets.
- `docs/`: Documentation.

## Best Practices
- Keep functions small and focused.
- Avoid tight coupling between components.
- Use clear naming conventions.
- Test each component independently.