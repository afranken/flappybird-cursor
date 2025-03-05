import React, { useEffect, useRef, useState } from 'react';
import { Bird, GameProps, Pipe } from '../types/game';
import '../styles/Game.css';

const GRAVITY = 0.15;
const JUMP_FORCE = -4;
const PIPE_SPEED = 2;
const PIPE_SPAWN_INTERVAL = 1500;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;

const initialBird: Bird = {
  x: 100,
  y: 300,
  velocity: 0,
  gravity: GRAVITY,
  jumpForce: JUMP_FORCE,
  size: 30,
};

const Game: React.FC<GameProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  
  // Game state refs
  const birdRef = useRef<Bird>({ ...initialBird });
  const pipesRef = useRef<Pipe[]>([]);
  const isPlayingRef = useRef(false);
  const gameOverRef = useRef(false);
  const lastPipeSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const spawnPipe = () => {
      const gapY = Math.random() * (height - PIPE_GAP - 100) + 50;
      const newPipe: Pipe = {
        x: width,
        y: gapY,
        width: PIPE_WIDTH,
        height: height - gapY - PIPE_GAP,
        passed: false,
      };
      pipesRef.current = [...pipesRef.current, newPipe];
    };

    const checkCollision = (bird: Bird, pipe: Pipe) => {
      const birdRight = bird.x + bird.size;
      const birdLeft = bird.x;
      const birdTop = bird.y;
      const birdBottom = bird.y + bird.size;

      const pipeRight = pipe.x + pipe.width;
      const pipeLeft = pipe.x;

      // Check horizontal collision
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check vertical collision with upper pipe
        if (birdTop < pipe.y) {
          return true;
        }
        // Check vertical collision with lower pipe
        if (birdBottom > pipe.y + PIPE_GAP) {
          return true;
        }
      }

      return false;
    };

    const gameLoop = (timestamp: number) => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, width, height);

      if (isPlayingRef.current && !gameOverRef.current) {
        // Update bird position
        birdRef.current = {
          ...birdRef.current,
          velocity: birdRef.current.velocity + birdRef.current.gravity,
          y: birdRef.current.y + birdRef.current.velocity,
        };

        // Spawn pipes
        if (timestamp - lastPipeSpawnRef.current > PIPE_SPAWN_INTERVAL) {
          spawnPipe();
          lastPipeSpawnRef.current = timestamp;
        }

        // Update pipes
        pipesRef.current = pipesRef.current
          .map(pipe => ({
            ...pipe,
            x: pipe.x - PIPE_SPEED,
          }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        // Check for collisions and scoring
        pipesRef.current.forEach(pipe => {
          if (!pipe.passed && pipe.x < birdRef.current.x) {
            setScore(prev => prev + 1);
            pipe.passed = true;
          }

          if (checkCollision(birdRef.current, pipe)) {
            gameOverRef.current = true;
          }
        });

        // Check if bird is out of bounds
        if (birdRef.current.y < 0 || birdRef.current.y + birdRef.current.size > height) {
          gameOverRef.current = true;
        }
      }

      // Draw bird
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(birdRef.current.x, birdRef.current.y, birdRef.current.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw pipes
      ctx.fillStyle = '#2ecc71';
      pipesRef.current.forEach(pipe => {
        // Upper pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        // Lower pipe
        ctx.fillRect(pipe.x, pipe.y + PIPE_GAP, pipe.width, height - pipe.y - PIPE_GAP);
      });

      // Draw score
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${score}`, 20, 40);

      if (gameOverRef.current) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', width / 2, height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Press Space to Restart', width / 2, height / 2 + 40);
      }

      if (!isPlayingRef.current && !gameOverRef.current) {
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press Space to Start', width / 2, height / 2);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        if (gameOverRef.current) {
          // Reset game
          birdRef.current = { ...initialBird };
          pipesRef.current = [];
          isPlayingRef.current = false;
          gameOverRef.current = false;
          setScore(0);
          lastPipeSpawnRef.current = 0;
        } else if (!isPlayingRef.current) {
          isPlayingRef.current = true;
          lastPipeSpawnRef.current = performance.now();
        } else {
          birdRef.current = {
            ...birdRef.current,
            velocity: birdRef.current.jumpForce,
          };
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, score]);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="game-canvas"
      />
    </div>
  );
};

export default Game; 