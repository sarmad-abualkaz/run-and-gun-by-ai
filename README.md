# Space Runner

A retro-style run-and-gun platformer game inspired by classic titles like Contra. Built with Phaser 3, TypeScript, and Vite, **using purely vibe coding to write this code -- no human wrote this**.

## Game Features

- Fluid platforming mechanics with double jump ability
- Run-and-gun gameplay with horizontal projectiles
- Dash ability for quick movement
- Multiple platforms for vertical exploration
- Direction indicator showing which way you're facing
- Health and ammo management system
- Pause functionality with menu options

## Technical Stack

- Phaser 3.88.2 - Game framework
- TypeScript - Type-safe JavaScript
- Vite - Build tool and development server

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd game-for-friedai
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Controls

- **Arrow Keys**: Move left/right
- **Up Arrow**: Jump (press twice for double jump)
- **Shift**: Dash in the current direction
- **Spacebar**: Shoot
- **ESC**: Pause game

## Game Architecture

The game is built using a scene-based architecture:
- `MainMenuScene`: Handles the main menu interface
- `GameScene`: Contains the main gameplay logic
- `PreloadScene`: Manages asset loading

Key game objects:
- `Player`: Handles player movement, shooting, and stats
- `Bullet`: Manages projectile behavior and physics

## Development

The project uses TypeScript for type safety and better development experience. The development server provides hot reload functionality for quick iteration.

To preview the production build locally:
```bash
npm run preview
```