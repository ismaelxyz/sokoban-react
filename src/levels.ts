import { Level } from './types';

export const levels: Level[] = [
  [
    ['wall', 'wall', 'wall', 'wall', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'box', 'floor', 'wall'],
    ['wall', 'floor', 'player', 'floor', 'wall'],
    ['wall', 'floor', 'goal', 'floor', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall'],
  ],
  [
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'box', 'box', 'player', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'goal', 'goal', 'floor', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ],
  [
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'box', 'box', 'box', 'floor', 'wall'],
    ['wall', 'floor', 'player', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'goal', 'goal', 'goal', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ],
];