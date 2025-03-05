import { Bird, Pipe } from '../game';

describe('Game Types', () => {
  describe('Bird', () => {
    it('should have all required properties', () => {
      const bird: Bird = {
        x: 100,
        y: 300,
        velocity: 0,
        gravity: 0.15,
        jumpForce: -4,
        size: 30,
      };

      expect(bird).toHaveProperty('x', 100);
      expect(bird).toHaveProperty('y', 300);
      expect(bird).toHaveProperty('velocity', 0);
      expect(bird).toHaveProperty('gravity', 0.15);
      expect(bird).toHaveProperty('jumpForce', -4);
      expect(bird).toHaveProperty('size', 30);
    });
  });

  describe('Pipe', () => {
    it('should have all required properties', () => {
      const pipe: Pipe = {
        x: 400,
        y: 200,
        width: 60,
        height: 400,
        passed: false,
      };

      expect(pipe).toHaveProperty('x', 400);
      expect(pipe).toHaveProperty('y', 200);
      expect(pipe).toHaveProperty('width', 60);
      expect(pipe).toHaveProperty('height', 400);
      expect(pipe).toHaveProperty('passed', false);
    });
  });
}); 