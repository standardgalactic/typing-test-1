import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from '../../data/data1';

type WordResultStatus = 'NOT_ATTEMPTED' | 'CORRECT' | 'WRONG';

export type WordData = {
  status: WordResultStatus;
  word: string;
};

interface TestState {
  words: WordData[];
  selectedWordIndex: number;
  timeLeft: number;
  isStarted: boolean;
  wordCount: number;
  text: string;
}

const initialState: TestState = {
  words: data[0].split(' ').map(word => ({ word, status: 'NOT_ATTEMPTED' })),
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
    textChange: (draftState, action: PayloadAction<string>) => {
      draftState.text = action.payload;
    },

    submitCorrectWord: draftState => {
      const { selectedWordIndex } = draftState;
      draftState.words[selectedWordIndex].status = 'CORRECT';
      draftState.selectedWordIndex += 1;
      draftState.text = '';
      draftState.wordCount += 1;
    },
    submitWrongWord: draftState => {
      const { selectedWordIndex } = draftState;
      draftState.words[selectedWordIndex].status = 'WRONG';
      draftState.selectedWordIndex += 1;
      draftState.text = '';
      draftState.wordCount += 1;
    },
  },
});

export const {
  startTest,
  stopTest,
  timerTick,
  submitCorrectWord,
  submitWrongWord,
  textChange,
} = testSlice.actions;

export default testSlice.reducer;
