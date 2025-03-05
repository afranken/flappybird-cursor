export interface GameState {
  isPlaying: boolean;
  score: number;
  gameOver: boolean;
}

export interface Bird {
  x: number;
  y: number;
  velocity: number;
  gravity: number;
  jumpForce: number;
  size: number;
}

export interface Pipe {
  x: number;
  y: number;
  width: number;
  height: number;
  passed: boolean;
}

export interface GameProps {
  width: number;
  height: number;
} 