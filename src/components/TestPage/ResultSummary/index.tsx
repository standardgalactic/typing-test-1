import React from 'react';
import clsx from 'clsx';
import { useAppSelector } from '../../../redux/hooks';

export interface ResultSummaryProps {}

const ResultSummary: React.FC<ResultSummaryProps> = () => {
  const { correctWordCount, wrongWordCount, wordCount } = useAppSelector(
    state => state.test,
  );
  const accuracy = ((correctWordCount / wordCount) * 100).toFixed(2);

  return (
    <div>
      <h2 className="text-4xl mt-5">Results</h2>
      <div
        className={clsx(
          'mt-3 py-2 px-4',
          'bg-gray-600 text-gray-100',
          'rounded',
        )}
      >
        <div className={clsx('grid grid-cols-2', 'items-center', 'text-3xl')}>
          <span>Typing Speed</span>
          <span>
            <span className={clsx('text-8xl')}>{wordCount || 88}</span>
            <span className={clsx('text-5xl')}> WPM</span>
          </span>

          <span>Accuracy</span>
          <span className={clsx('text-5xl')}>{accuracy}%</span>

          <span>Wrong words count</span>
          <span className={clsx('text-5xl')}>{wrongWordCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
