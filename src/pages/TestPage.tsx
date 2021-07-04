import React from 'react';
import clsx from 'clsx';
import { useInterval } from '../hooks/useInterval';
import TextDisplay from '../components/TextDisplay';
import { formatSecondsToClockTime } from '../components/TestPage/test-page.helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  startTest,
  stopTest,
  submitWord,
  timerTick,
} from '../components/TestPage/test.reducer';

export interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = () => {
  const { words, selectedWordIndex, timeLeft, isStarted, wordCount, text } =
    useAppSelector(state => state.test);
  const dispatch = useAppDispatch();

  const { clearTimer } = useInterval(() => {
    if (!isStarted) {
      return;
    }
    if (timeLeft === 0) {
      clearTimer();
      dispatch(stopTest());
      return;
    }

    dispatch(timerTick());
  }, 1000);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isStarted) {
      dispatch(startTest());
    }
    const { value } = e.target;
    dispatch(submitWord(value));
  }

  return (
    <div className={clsx('min-h-screen', 'bg-gray-800 text-white')}>
      <div className={clsx('max-w-4xl mx-auto px-4')}>
        <h1 className={clsx('text-5xl font-medium', 'py-5 mb-5')}>
          Typing Test
        </h1>

        <TextDisplay text={words} selectedWordIndex={selectedWordIndex} />

        <div
          className={clsx('mt-5', 'flex flex-col-reverse md:flex-row gap-3')}
        >
          <input
            type="text"
            className={clsx(
              'px-4 py-3',
              'rounded',
              'flex-1',
              'text-black text-3xl',
            )}
            placeholder="start typing to start the test"
            onChange={handleTextChange}
            value={text}
            disabled={timeLeft === 0}
          />

          <div>
            <div
              className={clsx(
                'px-4 py-3',
                'bg-white text-black',
                'rounded',
                'text-3xl',
              )}
            >
              {formatSecondsToClockTime(timeLeft)}
            </div>
          </div>
        </div>

        {timeLeft === 0 && (
          <div className={clsx('mt-5 py-10')}>
            <h2 className="text-4xl my-5">Results</h2>
            <div
              className={clsx('grid grid-cols-2', 'items-center', 'text-3xl')}
            >
              <span>Words Per Minute (WPM)</span>
              <span className={clsx('text-9xl')}>{wordCount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
