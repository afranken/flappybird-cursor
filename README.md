# Flappy Bird Clone

A simple Flappy Bird clone built with React, TypeScript, and HTML5 Canvas.

## Features

- Classic Flappy Bird gameplay
- Score tracking
- Responsive controls
- Game over and restart functionality

## How to Play

1. Press Space to start the game
2. Press Space to make the bird jump
3. Avoid the pipes
4. Try to get the highest score possible!

## Development

To run the game locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment to GitHub Pages

1. Add the following to your `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/flappybird-cursor/',
  // ... other config
})
```

2. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

3. Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy to GitHub Pages:
```bash
npm run deploy
```

5. Go to your repository settings and enable GitHub Pages from the `gh-pages` branch.

## Technologies Used

- React
- TypeScript
- Vite
- HTML5 Canvas
- CSS3
