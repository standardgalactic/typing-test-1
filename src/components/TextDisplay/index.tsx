import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { WordData } from '../TestPage/test.reducer';

export interface TextDisplayProps {
  words: WordData[];
  selectedWordIndex: number;
  wordsToShow: number;
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  words: allWords,
  selectedWordIndex: mainSelectedWordIndex,
  wordsToShow,
  text,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (mainSelectedWordIndex >= startIndex + wordsToShow) {
      setStartIndex(startIndex + wordsToShow);
    }
  }, [mainSelectedWordIndex, wordsToShow, startIndex]);

  const selectedWordIndex = mainSelectedWordIndex - startIndex;
  const words = allWords.slice(startIndex, startIndex + wordsToShow);

  return (
    <div
      className={clsx(
        'bg-gray-200 dark:bg-white text-black',
        'py-3 px-4',
        'rounded select-none',
        'text-4xl',
        'flex flex-wrap gap-x-2',
      )}
    >
      {words.map((wordData, idx) => {
        const shouldHighlight =
          selectedWordIndex === idx && wordData.word.startsWith(text);
        const draftWrongHighlight =
          selectedWordIndex === idx && !wordData.word.startsWith(text);
        const isAttemptedCorrectly = wordData.status === 'CORRECT';
        const isAttemptedWrongly = wordData.status === 'WRONG';

        return (
          <span
            key={wordData.word + Number(idx)}
            className={clsx(
              'px-2 py-2',

              shouldHighlight && 'bg-gray-400 dark:bg-gray-300 rounded',
              draftWrongHighlight && 'bg-red-500 rounded',

              isAttemptedCorrectly && 'text-green-500',
              isAttemptedWrongly && 'text-red-500',
            )}
          >
            {wordData.word}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;
