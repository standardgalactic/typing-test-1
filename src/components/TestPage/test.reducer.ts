import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from '../../data/data1';

interface TestState {
  words: string[];
  selectedWordIndex: number;
  timeLeft: number;
  isStarted: boolean;
  wordCount: number;
  text: string;
}

const initialState: TestState = {
  words: data[0].split(' '),
  selectedWordIndex: 0,
  timeLeft: 60,
  isStarted: false,
  wordCount: 0,
  text: '',
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    startTest: draftState => {
      draftState.isStarted = true;
    },
    stopTest: draftState => {
      draftState.isStarted = false;
    },

    timerTick: draftState => {
      draftState.timeLeft -= 1;
    },

    submitWord: (draftState, action: PayloadAction<string>) => {
      const value = action.payload;
      const { words, selectedWordIndex } = draftState;
      if (
        Array.isArray(words) &&
        value === words[selectedWordIndex].concat(' ')
      ) {
        draftState.selectedWordIndex += 1;
        draftState.text = '';
        draftState.wordCount += 1;
      } else {
        draftState.text = value;
      }
    },
  },
});

export const { startTest, stopTest, timerTick, submitWord } = testSlice.actions;

export default testSlice.reducer;
