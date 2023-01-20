import React from 'react';

// import styles from './progressBar.module.scss';

interface IProps {
  max: number;
  value: number;
  onChange: (progress: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const ProgressBar: React.FC<IProps> = ({
  max,
  value,
  onChange,
  onMouseDown,
  onMouseUp,
}) => {
  const percentNum = (value / max || 0) * 100;
  const percent = `${percentNum}%`;

  return (
    <div className="progressbar-wrapper">
      <div className="progressbar-item" style={{ width: percent }}>
        <input
          onChange={e => onChange(parseInt(e.target.value, 10))}
          onTouchStart={onMouseDown}
          onTouchEnd={onMouseUp}
          type="range"
          min="0"
          max="100"
          step="1"
          value={percentNum}
          className="progressbar-controller"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
