import React from 'react';
import clsx from 'clsx';

export interface TextDisplayProps {
  text: string[];
  selectedWordIndex: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  selectedWordIndex,
}) => {
  return (
    <div
      className={clsx(
        'bg-white text-black',
        'py-3 px-4',
        'rounded',
        'text-4xl',
        'flex flex-wrap gap-x-2',
      )}
    >
      {text.map((word, idx) => (
        <span
          key={word + Number(idx)}
          className={clsx(
            'mr-0 px-2 py-2',
            selectedWordIndex === idx && 'bg-gray-300 rounded',
          )}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default TextDisplay;
