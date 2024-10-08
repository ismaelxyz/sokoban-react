import React from 'react';

interface LevelSelectorProps {
  levels: number;
  currentLevel: number;
  onLevelSelect: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ levels, currentLevel, onLevelSelect }) => {
  return (
    <div className="mb-4">
      <label htmlFor="level-select" className="mr-2">Select Level:</label>
      <select
        id="level-select"
        value={currentLevel}
        onChange={(e) => onLevelSelect(Number(e.target.value))}
        className="px-2 py-1 border rounded"
      >
        {Array.from({ length: levels }, (_, i) => (
          <option key={i} value={i}>
            Level {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LevelSelector;