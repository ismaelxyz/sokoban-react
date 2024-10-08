import { useState, useEffect, useCallback } from 'react';
import { GameState, Position, Level } from '../types';
import { levels } from '../levels';

const initializeLevel = (levelIndex: number): GameState => {
  const level = levels[levelIndex];
  const playerPosition: Position = { row: 0, col: 0 };
  const boxPositions: Position[] = [];
  const goalPositions: Position[] = [];

  level.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'player' || cell === 'playerOnGoal') {
        playerPosition.row = rowIndex;
        playerPosition.col = colIndex;
      }
      if (cell === 'box' || cell === 'boxOnGoal') {
        boxPositions.push({ row: rowIndex, col: colIndex });
      }
      if (cell === 'goal' || cell === 'boxOnGoal' || cell === 'playerOnGoal') {
        goalPositions.push({ row: rowIndex, col: colIndex });
      }
    });
  });

  return { level, playerPosition, boxPositions, goalPositions };
};

const useSokoban = (initialLevel: number) => {
  const [gameState, setGameState] = useState<GameState>(() => initializeLevel(initialLevel));
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setGameState((prevState) => {
      const { level, playerPosition, boxPositions, goalPositions } = prevState;
      const newPlayerPosition = { ...playerPosition };
      let dx = 0;
      let dy = 0;

      switch (direction) {
        case 'up':
          dy = -1;
          break;
        case 'down':
          dy = 1;
          break;
        case 'left':
          dx = -1;
          break;
        case 'right':
          dx = 1;
          break;
      }

      const newRow = playerPosition.row + dy;
      const newCol = playerPosition.col + dx;

      if (newRow < 0 || newRow >= level.length || newCol < 0 || newCol >= level[0].length) {
        return prevState;
      }

      const nextCell = level[newRow][newCol];

      if (nextCell === 'wall') {
        return prevState;
      }

      if (nextCell === 'box' || nextCell === 'boxOnGoal') {
        const behindBoxRow = newRow + dy;
        const behindBoxCol = newCol + dx;

        if (
          behindBoxRow < 0 ||
          behindBoxRow >= level.length ||
          behindBoxCol < 0 ||
          behindBoxCol >= level[0].length ||
          ['wall', 'box', 'boxOnGoal'].includes(level[behindBoxRow][behindBoxCol])
        ) {
          return prevState;
        }

        const newBoxPositions = boxPositions.map((box) =>
          box.row === newRow && box.col === newCol
            ? { row: behindBoxRow, col: behindBoxCol }
            : box
        );

        newPlayerPosition.row = newRow;
        newPlayerPosition.col = newCol;

        const newLevel = level.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (rowIndex === playerPosition.row && colIndex === playerPosition.col) {
              return goalPositions.some(
                (goal) => goal.row === rowIndex && goal.col === colIndex
              )
                ? 'goal'
                : 'floor';
            }
            if (rowIndex === newRow && colIndex === newCol) {
              return goalPositions.some(
                (goal) => goal.row === rowIndex && goal.col === colIndex
              )
                ? 'playerOnGoal'
                : 'player';
            }
            if (rowIndex === behindBoxRow && colIndex === behindBoxCol) {
              return goalPositions.some(
                (goal) => goal.row === rowIndex && goal.col === colIndex
              )
                ? 'boxOnGoal'
                : 'box';
            }
            return cell;
          })
        );

        return {
          level: newLevel,
          playerPosition: newPlayerPosition,
          boxPositions: newBoxPositions,
          goalPositions,
        };
      }

      newPlayerPosition.row = newRow;
      newPlayerPosition.col = newCol;

      const newLevel = level.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === playerPosition.row && colIndex === playerPosition.col) {
            return goalPositions.some(
              (goal) => goal.row === rowIndex && goal.col === colIndex
            )
              ? 'goal'
              : 'floor';
          }
          if (rowIndex === newRow && colIndex === newCol) {
            return goalPositions.some(
              (goal) => goal.row === rowIndex && goal.col === colIndex
            )
              ? 'playerOnGoal'
              : 'player';
          }
          return cell;
        })
      );

      return {
        level: newLevel,
        playerPosition: newPlayerPosition,
        boxPositions,
        goalPositions,
      };
    });
  }, []);

  const checkWin = useCallback(() => {
    return gameState.boxPositions.every((box) =>
      gameState.goalPositions.some(
        (goal) => goal.row === box.row && goal.col === box.col
      )
    );
  }, [gameState]);

  const resetLevel = useCallback(() => {
    setGameState(initializeLevel(currentLevel));
  }, [currentLevel]);

  const changeLevel = useCallback((newLevel: number) => {
    setCurrentLevel(newLevel);
    setGameState(initializeLevel(newLevel));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          move('up');
          break;
        case 'ArrowDown':
          move('down');
          break;
        case 'ArrowLeft':
          move('left');
          break;
        case 'ArrowRight':
          move('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [move]);

  return {
    gameState,
    move,
    checkWin,
    resetLevel,
    changeLevel,
    currentLevel,
  };
};

export default useSokoban;