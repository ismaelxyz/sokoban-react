import React from 'react';
import { Cell as CellType } from '../types';
import { Box, Circle, Square } from 'lucide-react';

interface CellProps {
  type: CellType;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const cellClass = 'w-8 h-8 flex items-center justify-center';

  switch (type) {
    case 'wall':
      return <div className={`${cellClass} bg-gray-800`}></div>;
    case 'floor':
      return <div className={`${cellClass} bg-gray-200`}></div>;
    case 'player':
      return <div className={`${cellClass} bg-gray-200`}><Circle className="text-blue-500" /></div>;
    case 'box':
      return <div className={`${cellClass} bg-gray-200`}><Square className="text-brown-500" /></div>;
    case 'goal':
      return <div className={`${cellClass} bg-gray-200`}><Circle className="text-red-500" /></div>;
    case 'boxOnGoal':
      return <div className={`${cellClass} bg-gray-200`}><Box className="text-green-500" /></div>;
    case 'playerOnGoal':
      return <div className={`${cellClass} bg-gray-200`}><Circle className="text-purple-500" /></div>;
    default:
      return <div className={`${cellClass} bg-gray-200`}></div>;
  }
};

export default Cell;