export type Cell = 'wall' | 'floor' | 'player' | 'box' | 'goal' | 'boxOnGoal' | 'playerOnGoal';

export type Level = Cell[][];

export type Position = {
  row: number;
  col: number;
};

export type GameState = {
  level: Level;
  playerPosition: Position;
  boxPositions: Position[];
  goalPositions: Position[];
};