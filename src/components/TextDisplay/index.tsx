import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface TextDisplayProps {
  words: string[];
  selectedWordIndex: number;
  wordsToShow: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  words: allWords,
  selectedWordIndex: mainSelectedWordIndex,
  wordsToShow,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (mainSelectedWordIndex >= startIndex + wordsToShow) {
      setStartIndex(startIndex + wordsToShow);
    }
  }, [mainSelectedWordIndex]);

  const selectedWordIndex = mainSelectedWordIndex - startIndex;
  const words = allWords.slice(startIndex, startIndex + wordsToShow);

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
      {words.map((word, idx) => (
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
