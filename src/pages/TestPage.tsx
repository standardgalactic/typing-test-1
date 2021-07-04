import React from 'react';
import clsx from 'clsx';
import { useInterval } from '../hooks/useInterval';
import TextDisplay from '../components/TextDisplay';
import { formatSecondsToClockTime } from '../components/TestPage/test-page.helper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  startTest,
  stopTest,
  submitCorrectWord,
  submitWrongWord,
  textChange,
  timerTick,
} from '../components/TestPage/test.reducer';
import TypingField from '../components/TestPage/TypingField';

export interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = () => {
  const {
    words,
    selectedWordIndex,
    timeLeft,
    isStarted,
    wordCount,
    text,
    correctWordCount,
    wrongWordCount,
  } = useAppSelector(state => state.test);
  const dispatch = useAppDispatch();
  const accuracy = ((correctWordCount / wordCount) * 100).toFixed(2);

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
    const { value } = e.target;
    if (!value.trim()) {
      dispatch(textChange(value.trim()));
      return;
    }
    if (!isStarted) {
      dispatch(startTest());
    }
    if (value.endsWith(' ')) {
      if (value === words[selectedWordIndex].word.concat(' ')) {
        dispatch(submitCorrectWord());
      } else {
        dispatch(submitWrongWord());
      }
    } else {
      dispatch(textChange(value));
    }
  }

  return (
    <div className={clsx('min-h-screen', 'bg-gray-800 text-white')}>
      <div className={clsx('max-w-4xl mx-auto px-4')}>
        <h1 className={clsx('text-5xl font-medium', 'py-5 mb-5')}>
          Typing Test
        </h1>

        <TextDisplay
          words={words}
          selectedWordIndex={selectedWordIndex}
          wordsToShow={23}
          text={text}
        />

        <div
          className={clsx('mt-5', 'flex flex-col-reverse md:flex-row gap-3')}
        >
          <TypingField
            onChange={handleTextChange}
            value={text}
            disabled={timeLeft === 0}
            isTestRunning={isStarted && timeLeft > 0}
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
          <>
            <h2 className="text-4xl mt-5">Results</h2>
            <div
              className={clsx(
                'mt-3 py-2 px-4',
                'bg-gray-600 text-gray-100',
                'rounded',
              )}
            >
              <div
                className={clsx('grid grid-cols-2', 'items-center', 'text-3xl')}
              >
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
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
