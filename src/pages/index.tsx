import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
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
import ResultSummary from '../components/TestPage/ResultSummary';
import { withBasicLayout } from '../components/BasicLayout';

export interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = () => {
  const { words, selectedWordIndex, timeLeft, isStarted, text } =
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
    <>
      <Head>
        <title key="title">Typing Test | Test your typing skills</title>
        <meta
          key="description"
          name="description"
          content="Test your typing skills"
        />
      </Head>

      <TextDisplay
        words={words}
        selectedWordIndex={selectedWordIndex}
        wordsToShow={23}
        text={text}
      />

      <div className={clsx('mt-5', 'flex flex-col-reverse md:flex-row gap-3')}>
        <TypingField
          onChange={handleTextChange}
          value={text}
          disabled={timeLeft === 0}
          isTestRunning={isStarted && timeLeft > 0}
        />

        <div
          className={clsx(
            'px-4',
            'bg-gray-200 dark:bg-white text-black dark:text-black',
            'rounded',
            'text-3xl',
            'flex items-center',
          )}
        >
          {formatSecondsToClockTime(timeLeft)}
        </div>
      </div>

      {timeLeft === 0 && <ResultSummary />}
    </>
  );
};

export default withBasicLayout(TestPage);
