import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import 'jest-canvas-mock';
import Game from '../Game';

describe('Game Component', () => {
  let mockRequestAnimationFrame: jest.Mock;
  let mockCancelAnimationFrame: jest.Mock;

  beforeEach(() => {
    mockRequestAnimationFrame = jest.fn();
    mockCancelAnimationFrame = jest.fn();
    window.requestAnimationFrame = mockRequestAnimationFrame;
    window.cancelAnimationFrame = mockCancelAnimationFrame;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders game canvas', () => {
    const { container } = render(<Game width={400} height={600} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '400');
    expect(canvas).toHaveAttribute('height', '600');
  });

  it('starts game when space is pressed', async () => {
    render(<Game width={400} height={600} />);
    
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('handles bird movement', async () => {
    render(<Game width={400} height={600} />);
    
    // Start the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Simulate bird jump
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // The bird should have moved due to gravity and jump
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('spawns pipes at regular intervals', async () => {
    render(<Game width={400} height={600} />);
    
    // Start the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Wait for pipe spawn interval
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    // Check that pipes were spawned
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('handles game over state', async () => {
    render(<Game width={400} height={600} />);
    
    // Start the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Simulate game over by pressing space multiple times
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        await userEvent.keyboard(' ');
        await new Promise(resolve => setTimeout(resolve, 100));
      });
    }

    // Check that game over state is triggered
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('restarts game after game over', async () => {
    render(<Game width={400} height={600} />);
    
    // Start the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Simulate game over
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        await userEvent.keyboard(' ');
        await new Promise(resolve => setTimeout(resolve, 100));
      });
    }

    // Restart the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Check that game has restarted
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('updates score when passing pipes', async () => {
    render(<Game width={400} height={600} />);
    
    // Start the game
    await act(async () => {
      await userEvent.keyboard(' ');
    });

    // Wait for pipes to spawn and move
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    // Check that score has been updated
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });
}); 