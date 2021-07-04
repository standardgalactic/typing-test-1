import React, { useState } from 'react';
import clsx from 'clsx';
import { data } from '../data/data1';
import { useInterval } from '../hooks/useInterval';
import TextDisplay from '../components/TextDisplay';
import { formatSecondsToClockTime } from '../components/TestPage/test-page.helper';

export interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = () => {
  const [text] = useState(data[0].split(' '));
  const [wordPosition, setWordPosition] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setStarted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [textField, setTextField] = useState('');

  const { clearTimer } = useInterval(() => {
    if (!isStarted) {
      return;
    }
    if (timeLeft === 0) {
      clearTimer();
      setStarted(false);
      return;
    }

    setTimeLeft(timeLeft - 1);
  }, 1000);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isStarted) {
      setStarted(true);
    }
    const { value } = e.target;

    if (value === text[wordPosition].concat(' ')) {
      setWordPosition(wordPosition + 1);
      setTextField('');
      setWordCount(wordCount + 1);
    } else {
      setTextField(value);
    }
  }

  return (
    <div className={clsx('min-h-screen', 'bg-gray-800 text-white')}>
      <div className={clsx('max-w-4xl mx-auto px-4')}>
        <h1 className={clsx('text-5xl font-medium', 'py-5 mb-5')}>
          Typing Test
        </h1>

        <TextDisplay text={text} selectedWordIndex={wordPosition} />

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
            value={textField}
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
