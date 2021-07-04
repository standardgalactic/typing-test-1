import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { WordData } from '../TestPage/test.reducer';

export interface TextDisplayProps {
  words: WordData[];
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
      {words.map((wordData, idx) => (
        <span
          key={wordData.word + Number(idx)}
          className={clsx(
            'mr-0 px-2 py-2',
            selectedWordIndex === idx && 'bg-gray-300 rounded',
            wordData.status === 'CORRECT' && 'text-green-500',
            wordData.status === 'WRONG' && 'text-red-500',
          )}
        >
          {wordData.word}
        </span>
      ))}
    </div>
  );
};

export default TextDisplay;
