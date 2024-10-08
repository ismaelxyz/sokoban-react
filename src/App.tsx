import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import LevelSelector from './components/LevelSelector';
import useSokoban from './hooks/useSokoban';
import { levels } from './levels';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

function App() {
  const { gameState, move, checkWin, resetLevel, changeLevel, currentLevel } = useSokoban(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (checkWin()) {
      setIsWin(true);
    }
  }, [gameState, checkWin]);

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!isWin) {
      move(direction);
    }
  };

  const handleReset = () => {
    resetLevel();
    setIsWin(false);
  };

  const handleLevelChange = (level: number) => {
    changeLevel(level);
    setIsWin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Sokoban Clone</h1>
      <LevelSelector
        levels={levels.length}
        currentLevel={currentLevel}
        onLevelSelect={handleLevelChange}
      />
      <Board level={gameState.level} />
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleMove('up')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowUp />
        </button>
        <button
          onClick={() => handleMove('down')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowDown />
        </button>
        <button
          onClick={() => handleMove('left')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => handleMove('right')}
          className="p-2 bg-blue-500 text-white rounded"
        >
          <ArrowRight />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-red-500 text-white rounded"
        >
          <RotateCcw />
        </button>
      </div>
      {isWin && (
        <div className="mt-4 text-2xl font-bold text-green-600">
          Congratulations! You solved the level!
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Use arrow keys or buttons to move. Push boxes to goals to win!
      </div>
    </div>
  );
}

export default App;