import React from 'react';
import Cell from './Cell';
import { Level } from '../types';

interface BoardProps {
  level: Level;
}

const Board: React.FC<BoardProps> = ({ level }) => {
  return (
    <div className="inline-block border-2 border-gray-800">
      {level.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, cellIndex) => (
            <Cell key={`${rowIndex}-${cellIndex}`} type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;